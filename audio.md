# Audio in FAR Systems

Two places in this app record the microphone, keep the take, and play it back. Both do it in the browser. Neither uploads the file to a server.

| Place | What the person does | Where the audio lives after stop |
| --- | --- | --- |
| Reflection Room | Speaks a reflection, listens, then submits | A blob URL held in the room until they leave |
| Create Product, Step 2 | Speaks a reflection description and sends it | A blob URL stored on the product draft as `reflectionAudio` |

A blob URL looks like `blob:http://localhost:5173/…`. It points at audio that exists only in this browser tab. Refreshing the page drops it. Closing the room revokes it.

## How a take is made

The browser API is `MediaRecorder`, fed by `getUserMedia({ audio: true })`.

1. The person clicks the microphone. The browser asks for permission.
2. If they allow it, the page receives a `MediaStream` (the live mic).
3. `MediaRecorder` reads that stream and emits chunks of audio (`Blob` pieces) through `ondataavailable`.
4. Those chunks sit in an array until recording stops.
5. On stop, the chunks are joined into one `Blob` (`audio/webm`, Opus when the browser supports it).
6. `URL.createObjectURL(blob)` turns that blob into an address an `<audio>` element can play.

Nothing is written to disk and nothing is sent to `VITE_API_BASE_URL`. “Saved” means the blob exists in memory and the page can play it.

```text
microphone
  → getUserMedia
  → MediaRecorder
  → Blob chunks
  → one Blob
  → blob URL
  → <audio controls> or audio.play()
```

## Reflection Room

The room is `src/pages/Consumer/ReflectionRoom/ReflectionRoom.tsx`. Consumer and employee both open it. Founder product creation can open the same room in product-creation mode.

The session phase is `idle`, `recording`, `paused`, `recorded`, or `submitted`.

| Control | What it does to the audio |
| --- | --- |
| Microphone, while idle | Starts a new take |
| Microphone, while recording | Pauses the recorder. The timer stops. No file yet |
| Microphone, while paused | Resumes the same recorder |
| Stop | Ends the recorder, builds the blob, shows the player |
| Replay | Plays the take from the start. If the mic is still open, Stop runs first so the file exists, then playback starts |
| Re-record | Throws away the blob URL and starts a new take |
| Submit | Continues the journey. It does not upload the audio |

### State that holds the take

```tsx
const [audioUrl, setAudioUrl] = useState<string | null>(null);
const mediaRef = useRef<MediaRecorder | null>(null);
const streamRef = useRef<MediaStream | null>(null);
const chunksRef = useRef<Blob[]>([]);
const audioUrlRef = useRef<string | null>(null);
const playerRef = useRef<HTMLAudioElement | null>(null);
const playWhenReady = useRef(false);
```

`audioUrl` is what React renders. `audioUrlRef` is the same address for code that runs outside a render, including cleanup. `chunksRef` is the pieces still arriving from the recorder. `playerRef` is the visible `<audio>` element.

### Start

`startRecording` asks for the microphone, drops any previous take, and starts a recorder. The phase becomes `recording` only after permission is granted, so the timer does not run on a denied mic.

```tsx
stream = await navigator.mediaDevices.getUserMedia({ audio: true });

const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
  ? "audio/webm;codecs=opus"
  : MediaRecorder.isTypeSupported("audio/webm")
    ? "audio/webm"
    : "";

const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);

recorder.ondataavailable = (event) => {
  if (event.data.size > 0) chunksRef.current.push(event.data);
};

recorder.onstop = () => {
  const blob = new Blob(chunksRef.current, {
    type: recorder.mimeType || "audio/webm",
  });
  if (blob.size > 0) rememberAudio(URL.createObjectURL(blob));
  releaseStream();
  mediaRef.current = null;
  setPhase("recorded");
};

recorder.start();
setPhase("recording");
```

`rememberAudio` replaces the previous blob URL and revokes the old one, so a second take does not leak the first blob.

```tsx
const rememberAudio = (url: string) => {
  if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  audioUrlRef.current = url;
  setAudioUrl(url);
};
```

If a recorder is already running when a new take starts, its `onstop` and `ondataavailable` are cleared before `stop()`. Otherwise the old recorder would finish a moment later and overwrite the new take.

### Pause and resume

Pause does not create a file. `MediaRecorder.pause()` keeps the same stream and the same chunk list. Resume continues that take. If pause is not available, the recorder is stopped instead, which does create the file.

```tsx
if (phase === "recording" && recorder.state === "recording") {
  recorder.pause();
  setPhase("paused");
  return;
}
if (recorder.state === "paused") {
  recorder.resume();
  setPhase("recording");
}
```

### Stop, then the file exists

Stop calls `recorder.stop()`. The browser then fires `ondataavailable` with the last chunk and `onstop`. `onstop` builds the blob, stores the URL, turns the microphone tracks off, and sets the phase to `recorded`.

Until that moment there is nothing to play. Replay during recording sets `playWhenReady` and then stops, so playback starts as soon as the URL arrives.

```tsx
const replayAnswer = () => {
  if (phase === "recording" || phase === "paused") {
    playWhenReady.current = true;
    stopRecording();
    return;
  }
  const player = playerRef.current;
  if (!audioUrl || !player) return;
  player.currentTime = 0;
  void player.play();
};
```

```tsx
useEffect(() => {
  if (!playWhenReady.current || !audioUrl) return;
  playWhenReady.current = false;
  const player = playerRef.current;
  if (!player) return;
  player.currentTime = 0;
  void player.play();
}, [audioUrl]);
```

### The player

The player is shown only after a take has been stopped. The same element is what Replay uses, so the toolbar and the on-screen controls play one file.

```tsx
{audioUrl && phase === "recorded" && (
  <audio ref={playerRef} controls src={audioUrl} />
)}
```

`controls` is the browser play button, scrubber, and volume. The person can hear the answer before Submit, Save & Continue, or Re-record.

### Leaving the room

On unmount the recorder is stopped without running `onstop`, the mic tracks are stopped, the blob URL is revoked, and playback is paused. The take is gone.

```tsx
useEffect(() => {
  return () => {
    const recorder = mediaRef.current;
    if (recorder) {
      recorder.onstop = null;
      recorder.ondataavailable = null;
      if (recorder.state !== "inactive") recorder.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    playerRef.current?.pause();
  };
}, []);
```

Submit does not change this. It checks that a take exists (`hasAudio`), shows a toast, and leaves the room. The blob is not attached to the journey and is not stored for later.

```tsx
const hasAudio =
  Boolean(audioUrl) ||
  phase === "recorded" ||
  phase === "paused" ||
  (phase === "recording" && seconds > 0);
```

## Create Product, Step 2

The founder voice popup is `src/pages/Founder/CreateProduct/VoiceToTextModal.tsx`. It uses the same record-then-blob path, and it also runs speech recognition so the spoken words can fill the text box. Recognition is optional. The recording still exists if recognition is unavailable.

On stop, the popup shows `<audio controls src={audioUrl} />` under the microphone, labeled Playback. Send passes that URL out.

```tsx
const applyVoiceText = (text: string, audioUrl?: string) => {
  setVoicePromptOpen(false);
  if (step === 2) {
    setDraft({
      reflectionDescription: text || draft.reflectionDescription,
      reflectionAudio: audioUrl || draft.reflectionAudio,
    });
  }
};
```

Step 2 then renders that same URL under Reflection Description:

```tsx
{draft.reflectionAudio ? (
  <audio controls src={draft.reflectionAudio} />
) : null}
```

`reflectionAudio` is a field on the in-memory product draft. It lasts while the wizard stays open in this tab. It is not a file on the server. Steps 1 and 5 of the wizard can record in the same popup, but only Step 2 keeps the audio on the draft. The other steps keep the transcript.

## What is not happening

- No `POST` of the audio.
- No storage of the blob in Redux, `localStorage`, or IndexedDB.
- No playback after a refresh.
- Speech-to-text in the founder popup does not replace the recording. It only fills the text field beside it.

To keep a reflection after the person leaves, the stop handler would upload the `Blob` (for example as `FormData` with the webm file) and the player would use the URL the server returns instead of `URL.createObjectURL`.

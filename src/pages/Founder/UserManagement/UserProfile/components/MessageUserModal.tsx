import { useEffect, useState } from "react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import ModalShell from "../../components/ModalShell";
import { fieldControlClass, fieldLabelClass } from "../styles";

const MessageUserModal = ({
  open,
  recipient,
  onClose,
  onSend,
}: {
  open: boolean;
  recipient: string;
  onClose: () => void;
  onSend: (subject: string, body: string) => void;
}) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setSubject("");
    setBody("");
    setError("");
  }, [open]);

  const send = () => {
    if (!body.trim()) {
      setError("Message cannot be empty");
      return;
    }
    onSend(subject.trim() || "Message from FAR Founder Console", body.trim());
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Message User"
      description={`Send a direct message to ${recipient}.`}
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="border-0 font-medium normal-case tracking-normal"
            title="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="md"
            className="rounded-lg px-6 font-medium"
            title="Send Message"
            onClick={send}
          />
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Subject</Label>
          <Input
            variant="soft"
            autoFocus
            placeholder="Optional subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={fieldControlClass}
          />
        </div>
        <div className="space-y-2">
          <Label className={fieldLabelClass}>Message</Label>
          <Textarea
            variant="soft"
            placeholder="Write your message..."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setError("");
            }}
            className="min-h-32 rounded-md! border-[#222]! bg-black! px-3! py-2.5! text-sm text-white"
          />
          {error && <p className="text-xs text-[#ef4444]">{error}</p>}
        </div>
      </div>
    </ModalShell>
  );
};

export default MessageUserModal;

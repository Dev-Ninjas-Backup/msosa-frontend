import ProfileSidebarCard from "./ProfileSidebarCard";
import PersonalInformation from "./PersonalInformation";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PlatformAccess from "./PlatformAccess";

type MyProfileTabProps = {
  onEdit: () => void;
  onChangePassword: () => void;
  onUpload: () => void;
};

const MyProfileTab = ({
  onEdit,
  onChangePassword,
  onUpload,
}: MyProfileTabProps) => (
  <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-5 items-start">
    <ProfileSidebarCard onEdit={onEdit} onChangePassword={onChangePassword} />
    <div className="space-y-5 min-w-0">
      <PersonalInformation />
      <ProfilePhotoSection onUpload={onUpload} />
      <PlatformAccess />
    </div>
  </div>
);

export default MyProfileTab;

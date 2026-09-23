import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { cn } from "@/lib/utils";
import { getInitials, type ManagedUser } from "../data";

const ManagedUserAvatar = ({
  user,
  className,
}: {
  user: Pick<ManagedUser, "name" | "avatar">;
  className?: string;
}) => (
  <Avatar className={cn("size-9 border border-white/10", className)}>
    {user.avatar && (
      <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
    )}
    <AvatarFallback className="bg-white/10 text-xs font-semibold text-[#eab308]">
      {getInitials(user.name)}
    </AvatarFallback>
  </Avatar>
);

export default ManagedUserAvatar;

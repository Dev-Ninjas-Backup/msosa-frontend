import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import { Textarea } from "@/ui/Textarea";

const Profile = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-4 max-w-4xl">
      <AnimatedContainer delay={0.05}>
        <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80"
            alt="Sarah Jenkins"
            className="size-20 sm:size-24 rounded-2xl object-cover border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-playfair text-2xl text-primary-text">Sarah Jenkins</h2>
            <p className="mt-1 text-sm text-secondary-text">
              Premium Member · Member since January 2024
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-blue">Profile Completion</span>
                <span className="text-primary-brand">85%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-brand-gradient" />
              </div>
              <p className="mt-1.5 text-xs text-muted-blue">2 actions remaining</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6 space-y-4">
          <div>
            <h3 className="font-playfair text-xl text-primary-text">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-secondary-text">
              Manage your personal details and contact information
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>First Name</Label>
              <Input variant="soft" defaultValue="Sarah" />
            </div>
            <div className="space-y-1.5">
              <Label>Last Name</Label>
              <Input variant="soft" defaultValue="Jenkins" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Display Name</Label>
              <Input variant="soft" defaultValue="Sarah Jenkins" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Email</Label>
              <Input variant="soft" type="email" defaultValue="sarah@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone Number</Label>
              <Input variant="soft" defaultValue="+1 (555) 234-5678" />
            </div>
            <div className="space-y-1.5">
              <Label>Time Zone</Label>
              <Input variant="soft" defaultValue="UTC-5 Eastern Time" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Bio</Label>
              <Textarea
                defaultValue="Reflective practitioner focused on relationship clarity and long-term growth."
                className="min-h-[100px] bg-black/30 border-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default Profile;

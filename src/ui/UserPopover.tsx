import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";

const UserPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default UserPopover;

import React from "react";

//components
import Logo from "../firstSignUpComponents/Logo";
import { Input } from "../ui/input";
import { AvatarDropdown } from "../IntroComponents/AvatarDropdown";
import ThemeDropdown from "../IntroComponents/ThemeDropdown";
import NotificationsDropdown from "../IntroComponents/NotificationsDropdown";

//icon
import { Search } from "lucide-react";



const BoardNav = () => {
  return (
    <nav className="flex justify-between items-center py-1 px-10 border-b-[1px]">
      <div className="flex items-center">
        <Logo className={"!w-[90px] !h-[30px] !mb-0"}/>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-[200px]">
          <Input type="text" placeholder="Search board..." className="pl-10" />
          <Search className="absolute top-3 left-3" size={15} />
        </div>
        <NotificationsDropdown/>
        <ThemeDropdown/>
        <AvatarDropdown/>
      </div>
    </nav>
  );
};

export default BoardNav;
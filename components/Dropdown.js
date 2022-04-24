import React from "react";
import Link from "next/link";
import { NotificationIcon, SettingsIcon, LogoutIcon } from "./Icons";
import { useRouter } from "next/router";
import { auth } from "../firebase";

const Dropdown = () => {
  const router = useRouter();
  const LinkItem = ({ icon, text, action }) => (
    <button
      onClick={action}
      className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-1"
    >
      {icon}
      {text}
    </button>
  );

  const logOut = () => {
    auth.signOut();
    router.replace("/login");
  };
  return (
    <div>
      {/* <div className="relative cursor-pointer text-sm focus:outline-none group w-full"> */}
      <LinkItem icon={<LogoutIcon />} text="Logout" action={logOut} />
      {/* <div className="flex items-center justify-between px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div> */}
      <div className="absolute z-10 right-8 flex-col rounded-md items-start hidden w-32 pb-1 bg-white shadow-lg group-hover:flex">
        {/* <LinkItem icon={<NotificationIcon />} text="Notifications" action={() => console.log('notifications')} />
        <LinkItem icon={<SettingsIcon />} text="Settings" action={() => console.log('settings')} /> */}
      </div>
    </div>
  );
};

export default Dropdown;

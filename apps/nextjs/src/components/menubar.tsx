import React from "react";
import { UserButton } from "@clerk/nextjs";

const MenuBar: React.FC = () => {
  return (
    <div className="sticky top-0 flex h-20 w-screen items-center justify-end bg-gray-500 px-10">
      <div className="flex">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "3rem",
                height: "3rem",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MenuBar;

import React from "react";
import MenuBar from "./menubar";
import { useAuth } from "@clerk/nextjs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <>
        <div className="flex h-screen flex-col">
          <MenuBar />
          {children}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex h-screen flex-col">{children}</div>
      </>
    );
  }

  // Return null if the user is not signed in
  return null;
};

export default Layout;

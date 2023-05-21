import React from "react";
import MenuBar from "./menubar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <MenuBar />
        {children}
      </div>
      {/* Additional layout components or elements */}
    </>
  );
};

export default Layout;

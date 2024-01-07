import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const LandingPageHeaderMenu = () => {
  const { isSignedIn } = useAuth();

  return (
    <menu>
      {isSignedIn ? (
        <li>
          <Link href="/app">Link to the App</Link>
        </li>
      ) : (
        <>
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign Up</Link>
          </li>
        </>
      )}
    </menu>
  );
};

export const AppHeaderMenu = () => (
  <menu>
    <li><SignOutButton /></li>
  </menu>
);

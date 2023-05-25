import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { StatesList } from "../../utils/constants";

// This file is the index of the /app page

const App: NextPage = () => {
  // Check if user is authenticated
  //// if no, redirect to landing page
  //// if yes, check if onboarded
  const router = useRouter();
  // const [clerkUser, setClerkUser] = useState({});
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // isSignedIn ? setClerkUser(user) : router.push("/");
    if (!isSignedIn) router.push("/");
  }, [isSignedIn]);

  // check if profile exists
  let userProfile;
  const clerkUserId: string = user?.id ?? "";
  if (clerkUserId) {
    userProfile = trpc.profile.getById.useQuery(clerkUserId);
    console.log("userProfile", userProfile);
  }

  // create user profile
  if (!userProfile?.data) {
    // show onboarding

    interface profile {
      clerk_user_id: string;
      self_skill_rating: number;
      community_skill_rating?: number;
      bio?: string;
      age?: number;
      city: string;
      state: StatesList;
      setup_skip_count?: number;
      has_user_profile?: boolean;
    }
    const profileInput: profile = {
      clerk_user_id: clerkUserId,
      self_skill_rating: 3.0,
      bio: "This is my bio",
      age: 36,
      city: "Seattle",
      state: StatesList.WASHINGTON,
      has_user_profile: true,
    };
    const createProfile = trpc.profile.create.useMutation();
    createProfile.mutate(profileInput);

    createProfile.error
      ? console.log("mutate error", createProfile.error)
      : console.log("success!");
  }

  return <></>;
};

export default App;

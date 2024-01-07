import type { NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import ProfileSetup from "../../components/ProfileSetup";
import { Profiles } from "@pickle-app/db";
import { AppHeaderMenu } from "../../components/HeaderMenu";

const App: NextPage = () => {
  const [userProfile, setUserProfile] = useState<Profiles>();
  const { user } = useUser();
  console.log("user", user);

  // check if profile exists
  const { data: profile } = trpc.profile.getById.useQuery(user?.id);
  console.log("profile", profile);

  // // if no user profile set, show onboarding
  if (!profile) {
    console.log("no user profile", profile);
    // setUserProfile(profile);
    // return <ProfileSetup clerkUserId={user?.id} setProfile={setProfile} />;
  }

  const setProfile = (profile: Profiles) => {
    console.log("setting profile in state", profile);
    setUserProfile(profile);
  };

  return (
    <>
      <AppHeaderMenu />
      <p>This is the app.</p>
      {/* {!userProfile && (
        <ProfileSetup clerkUserId={user?.id} setProfile={setProfile} />
      )} */}
    </>
  );
};

export default App;

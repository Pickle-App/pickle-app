import { trpc } from "../utils/trpc";
import { StatesList, profileType } from "../utils/constants";
import { Profiles } from "@pickle-app/db";
import { useState } from "react";

interface ProfileSetupProps {
  clerkUserId: string | undefined;
  setProfile: (profile: Profiles) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({
  clerkUserId,
  setProfile,
}) => {
  // create user profile
  const [skip, setSkip] = useState(false);
  const createProfile = trpc.profile.create.useMutation({
    onSuccess(data) {
      console.log("success!");
      setProfile(data);
    },
    onError(error) {
      console.log("create profile failed", error);
    },
  });

  const profileInput: profileType = {
    clerk_user_id: clerkUserId,
    self_skill_rating: 3.5,
    bio: "Levi's bio",
    age: 36,
    city: "Seattle",
    state: StatesList.WASHINGTON,
    has_user_profile: true,
  };

  const handleProfileSubmit = () => {
    createProfile.mutate(profileInput);
  };

  return <button onClick={handleProfileSubmit}>Click me!</button>;
};

export default ProfileSetup;

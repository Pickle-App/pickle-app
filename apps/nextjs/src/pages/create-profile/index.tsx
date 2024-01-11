import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { StatesList } from "../../utils/constants";
import { trpc } from "../../utils/trpc";

type FormValues = {
  self_skill_rating: number;
  bio: string;
  age: number;
  city: string;
  state: StatesList;
};

const CreateProfile: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    self_skill_rating: 0,
    bio: "",
    age: 0,
    city: "",
    state: StatesList.ALABAMA,
  });

  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const userId = user?.id ?? "";

  const { isSuccess, data: profile } = trpc.profile.getById.useQuery(userId, {
    enabled: !!isSignedIn,
  });

  if (isSuccess && profile) {
    router.push("/app");
  }

  const createProfile = trpc.profile.create.useMutation();
  const states = Object.keys(StatesList);

  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === "self_skill_rating" || name === "age") {
      value = parseFloat(value);
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    createProfile.mutate({
      clerk_user_id: userId,
      self_skill_rating: formValues["self_skill_rating"],
      bio: formValues["bio"],
      age: formValues["age"],
      city: formValues["city"],
      state: formValues["state"],
    });

    if (createProfile.isSuccess) {
      router.push("/app");
    }
    if (createProfile.isError) {
      console.log("There was an error trying to create profile.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="self_skill_rating"
          placeholder="Rating"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <select name="state" onChange={handleChange}>
          <option value="">State</option>
          {states.map((state, index) => {
            return (
              <option key={index} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CreateProfile;

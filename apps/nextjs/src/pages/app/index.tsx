import { useState, useEffect } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Head from "next/head";

enum StatesList {
  ALABAMA = "ALABAMA",
  ALASKA = "ALASKA",
  ARIZONA = "ARIZONA",
  ARKANSAS = "ARKANSAS",
  CALIFORNIA = "CALIFORNIA",
  COLORADO = "COLORADO",
  CONNECTICUT = "CONNECTICUT",
  DELAWARE = "DELAWARE",
  FLORIDA = "FLORIDA",
  GEORGIA = "GEORGIA",
  HAWAII = "HAWAII",
  IDAHO = "IDAHO",
  ILLINOIS = "ILLINOIS",
  INDIANA = "INDIANA",
  IOWA = "IOWA",
  KANSAS = "KANSAS",
  KENTUCKY = "KENTUCKY",
  LOUISIANA = "LOUISIANA",
  MAINE = "MAINE",
  MARYLAND = "MARYLAND",
  MASSACHUSETTS = "MASSACHUSETTS",
  MICHIGAN = "MICHIGAN",
  MINNESOTA = "MINNESOTA",
  MISSISSIPPI = "MISSISSIPPI",
  MISSOURI = "MISSOURI",
  MONTANA = "MONTANA",
  NEBRASKA = "NEBRASKA",
  NEVADA = "NEVADA",
  NEW_HAMPSHIRE = "NEW_HAMPSHIRE",
  NEW_JERSEY = "NEW_JERSEY",
  NEW_MEXICO = "NEW_MEXICO",
  NEW_YORK = "NEW_YORK",
  NORTH_CAROLINA = "NORTH_CAROLINA",
  NORTH_DAKOTA = "NORTH_DAKOTA",
  OHIO = "OHIO",
  OKLAHOMA = "OKLAHOMA",
  OREGON = "OREGON",
  PENNSYLVANIA = "PENNSYLVANIA",
  RHODE_ISLAND = "RHODE_ISLAND",
  SOUTH_CAROLINA = "SOUTH_CAROLINA",
  SOUTH_DAKOTA = "SOUTH_DAKOTA",
  TENNESSEE = "TENNESSEE",
  TEXAS = "TEXAS",
  UTAH = "UTAH",
  VERMONT = "VERMONT",
  VIRGINIA = "VIRGINIA",
  WASHINGTON = "WASHINGTON",
  WEST_VIRGINIA = "WEST_VIRGINIA",
  WISCONSIN = "WISCONSIN",
  WYOMING = "WYOMING",
}

interface Profile {
  clerk_user_id: string;
  self_skill_rating: number;
  community_skill_rating?: number;
  bio?: string;
  age?: number;
  city: string;
  state: StatesList;
  setup_skip_count?: number;
}

const Home: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const clerkUserId: string = user?.id ?? "";

  const { mutate } = trpc.profile.create.useMutation({
    onSuccess: () => {
      setProfileCreated(true);
      console.log("success");
    },
    onError: () => {
      setProfileCreated(true);
      console.log("failure");
    },
  });

  const [profileCreated, setProfileCreated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const profileInput: Profile = {
      clerk_user_id: clerkUserId,
      self_skill_rating: 3.0,
      bio: "This is Landon's bio",
      age: 36,
      city: "Seattle",
      state: StatesList.WASHINGTON,
    };
    mutate(profileInput);
    setProfileCreated(true);
  }, [isMounted]);

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to The Palisades" />
        <link rel="icon" href="/pickle-icon.png" />
      </Head>
      <main className="h-full flex-grow flex-col items-center overflow-hidden bg-gradient-to-b from-[#6220c0] to-[#15162c] text-white">
        <div className="flex h-full flex-col items-center justify-between gap-12 px-8 py-16">
          <div className="h-full w-full">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              Welcome to <br />
              <span className="text-7xl sm:text-9xl">The</span>{" "}
              <span className="text-7xl text-[hsl(280,100%,70%)] sm:text-9xl">
                Palisades
              </span>
            </h1>
            {!!isSignedIn && (
              <div className="flex h-5/6 flex-col items-center justify-between py-20">
                <AuthShowcase />
                <SignOutButton />
              </div>
            )}
            {!isSignedIn && (
              <div className="flex h-5/6 w-full flex-col items-center justify-end py-16">
                <button className="flex w-full max-w-[450px] items-center justify-center gap-4 border border-white py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]">
                  <Link
                    href="/sign-in"
                    className="text-center text-2xl text-white"
                  >
                    {" "}
                    Sign In
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  const { user } = useUser();
  const clerkUserId = user?.id;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <>
        <p className="text-center text-2xl text-white">
          {secretMessage && (
            <span>
              {" "}
              {secretMessage + " " + user?.firstName}
              <br />
            </span>
          )}
        </p>
        <div className="flex items-center justify-center">{clerkUserId}</div>
      </>
    </div>
  );
};

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="flex w-full max-w-[450px] items-center justify-center gap-4 border border-white py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]"
    >
      <p className="text-center text-2xl text-white">Sign out</p>
    </button>
  );
};

export default Home;

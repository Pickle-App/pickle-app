import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@pickle-app/api";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Home: NextPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { data: pickleUserProfile } = trpc.get.byId.useQuery(2); //2 is just an example here to cause it to fail
  const clerkUserId = user?.id;
  const pickleProfileClerkId = pickleUserProfile?.clerk_user_id;

  //Use this to fetch all profiles
  // const { data: allUserProfiles } = trpc.get.all.useQuery();

  //If there is Clerk Id in out database, make an entry
  if (!pickleProfileClerkId) {
    //Write to database
    console.log(clerkUserId);
    console.log(pickleProfileClerkId);
  }
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

export default Home;

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

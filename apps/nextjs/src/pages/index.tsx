import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

//Need to detect if user is signed in and redirect based on that
const useIsSignedInFunc = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  if (isSignedIn) {
    router.push("/app");
  }
};

const Home: NextPage = () => {
  useIsSignedInFunc();

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to Palisade" />
        <link rel="icon" href="/pickle-icon.png" />
      </Head>
      <main className="flex-grow flex-col items-center overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="flex h-full flex-col items-center justify-between gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome to{" "}
            <span className="text-[hsl(280,100%,70%)]">Palisade</span>
          </h1>
          <div>
            <div className="my-10 flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                <Link href="/sign-in">Sign In</Link>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                <Link href="/sign-up">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

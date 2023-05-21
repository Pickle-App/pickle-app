import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

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

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Desktop is being definer here as viewport size of 769 and above
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      //Cleanup after coponent mounte - remove the ebent listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to Palisade" />
        <link rel="icon" href="/pickle-icon.png" />
      </Head>
      <main className="flex-grow flex-col items-center overflow-hidden bg-gradient-to-b from-[#6220c0] to-[#15162c] text-white">
        <div className="flex h-full flex-col items-center justify-between gap-12 px-8 py-16">
          <div className="w-full">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              Welcome to <br />
              <span className="text-7xl sm:text-9xl">The</span>{" "}
              <span className="text-7xl text-[hsl(280,100%,70%)] sm:text-9xl">
                Palisades
              </span>
            </h1>
          </div>
          {!!isDesktop && (
            <div className="flex h-full w-full items-center justify-center">
              {/* Desktop View */}
              <div className="flex w-full max-w-[1000px] justify-around">
                <Link href="/sign-in">
                  <div className="flex items-center justify-center gap-4 border border-white px-32 py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]">
                    <p className="text-center text-2xl text-white">Sign In</p>
                  </div>
                </Link>
                <Link href="/sign-up">
                  <div className="flex items-center justify-center gap-4 border border-white px-32 py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]">
                    <p className="text-center text-2xl text-white">Sign Up</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {!isDesktop && (
            <div className="flex h-full w-full max-w-[450px] flex-col justify-between py-10">
              {/* Mobile View */}
              <div></div>
              <div className="flex flex-col justify-around">
                <Link href="/sign-in">
                  <div className="mb-8 flex w-full items-center justify-center gap-4 border border-white py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]">
                    <p className="text-center text-2xl text-white">Sign In</p>
                  </div>
                </Link>
                <Link href="/sign-up">
                  <div className="flex w-full items-center justify-center gap-4 border border-white py-6 transition-all duration-300 hover:bg-[hsl(280,100%,70%)]">
                    <p className="text-center text-2xl text-white">Sign Up</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { trpc } from "../../utils/trpc";
import { AppHeaderMenu } from "../../components/HeaderMenu";
import { useRouter } from "next/router";

const App: NextPage = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const userId = user?.id ?? "";

  const { isSuccess, data: profile } = trpc.profile.getById.useQuery(userId, {
    enabled: isSignedIn,
  });

  if (isSuccess && !profile) {
    router.push("/create-profile");
  }

  return (
    <>
      <AppHeaderMenu />
      <p>This is the app.</p>
    </>
  );
};

export default App;

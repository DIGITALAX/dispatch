import useConnect from "@/components/Common/Connect/hooks/useConnect";
import Connect from "@/components/Common/Connect/modules/Connect";
import Gallery from "@/components/Common/Gallery/Gallery";
import { RootState } from "@/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { handleConnect, handleLensSignIn, connected, openAccountModal } =
    useConnect();
  const profile = useSelector(
    (state: RootState) => state.app.lensProfileReducer.profile
  );
  const authStatus = useSelector(
    (state: RootState) => state.app.authStatusReducer.value
  );
  const lookAround = useSelector(
    (state: RootState) => state.app.lookAroundReducer.value
  );
  return (
    <div className="relative w-full h-full flex flex-col bg-black items-center justify-center">
      <Head>
        <title>Chromadin Dispatcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{
          height:
            typeof window !== "undefined" && window.innerWidth > 768
              ? "calc(100vh - 10.5rem)"
              : "calc(100vh - 12.5rem)",
        }}
      >
        <Gallery />
        <div className="relative font-arcade w-full justify-center items-center h-fit text-white text-2xl flex text-center flex-col">
          <div
            className="absolute items-center justify-center flex -top-2 opacity-70"
            id="dispatcherBack"
          >
            chromadin dispatcher
          </div>
          <div
            className="absolute items-center justify-center flex -top-1"
            id="dispatcherBack"
          >
            chromadin dispatcher
          </div>
          <div className="relative items-center justify-center flex">
            chromadin dispatcher
          </div>
        </div>
        <div className="relative w-full h-fit justify-center items-center">
          <Connect
            handleConnect={handleConnect}
            handleLensSignIn={handleLensSignIn}
            connected={connected}
            authStatus={authStatus}
            profile={profile}
            router={router}
            openAccountModal={openAccountModal}
          />
        </div>
        {lookAround && (
          <div className="relative w-fit h-fit text-ama font-earl text-center flex items-center justify center break-words flex flex-col gap-2">
            <div className="relative w-fit h-fit items-center justify-center flex">
              You haven’t made it as a creator in the beta yet.
            </div>
            <a
              href="https://www.digitalax.xyz"
              target="_blank"
              rel="noreferrer"
              className="relative w-fit h-fit items-center justify-center flex underline"
            >
              Let’s change that?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

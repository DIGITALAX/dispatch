import { FunctionComponent } from "react";
import { ConnectProps } from "../types/connect.types";
import Auth from "./Auth";

const Connect: FunctionComponent<ConnectProps> = ({
  handleConnect,
  connected,
  handleLensSignIn,
  authStatus,
  profile,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full py-8 lg:py-3 px-3 flex flex-col sm:flex-row lg:flex-col items-center gap-4">
      <Auth
        connected={connected}
        handleConnect={handleConnect}
        handleLensSignIn={handleLensSignIn}
        authStatus={authStatus}
        profile={profile}
      />
    </div>
  );
};

export default Connect;

import { FunctionComponent } from "react";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import Image from "next/image";
import { ProfileProps } from "../types/connect.types";

const Profile: FunctionComponent<ProfileProps> = ({
  profile,
  openAccountModal,
}): JSX.Element => {
  const picture = createProfilePicture(profile);
  return (
    <div
      className="relative w-40 h-10 font-earl text-white border-white border rounded-tl-lg rounded-br-lg flex flex-row px-2 gap-4 items-center justify-center bg-black cursor-pointer"
      onClick={openAccountModal}
    >
      <div className="relative w-6 h-6 rounded-full" id="crt">
        {picture !== "" && (
          <Image
            src={picture}
            fill
            alt="pfp"
            className="rounded-full flex"
            draggable={false}
          />
        )}
      </div>
      <div className="relative w-fit h-fit text-sm sm:text-xs lg:text-sm text-pesa">
        @
        {profile?.handle?.split(".lens")[0].length > 10
          ? profile?.handle?.split(".lens")[0].slice(0, 10) + "..."
          : profile?.handle?.split(".lens")[0] || ""}
      </div>
    </div>
  );
};

export default Profile;

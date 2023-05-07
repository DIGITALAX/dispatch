import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { setFollowerOnly } from "@/redux/reducers/followerOnlySlice";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { AiOutlineLoading } from "react-icons/ai";
import { FollowerOnlyProps } from "../types/modals.types";

const FollowerOnly: FunctionComponent<FollowerOnlyProps> = ({
  profile,
  followProfile,
  followLoading,
  approved,
  approveCurrency,
}): JSX.Element => {
  const dispatch = useDispatch();
  const profileImage = createProfilePicture(profile);
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div
        className="relative w-full md:w-[22rem] h-fit col-start-1 place-self-center rounded-lg p-px bg-offBlack flex flex-col border border-white"
        id="modal"
      >
        <div
          className="relative w-full h-fit justify-end pr-3 pt-3 cursor-pointer flex"
          onClick={() =>
            dispatch(
              setFollowerOnly({
                actionOpen: false,
                actionId: "",
                actionFollowerId: "",
                actionIndex: undefined,
              })
            )
          }
        >
          <ImCross color="white" size={15} />
        </div>
        <div className="relative w-full h-fit flex flex-col p-3 items-center justify-center gap-3">
          <div className="relative w-full h-fit flex items-center text-center text-white font-earl justify-center">
            Only followers can Collect
          </div>
          <div className="relative w-1/2 h-40 flex py-3">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmYHETqQKeSQTFVegUemCfrZqSE3HyNxFwqVnx3Qbho86t`}
              layout="fill"
              objectFit="cover"
              className="relative w-fit h-fit flex rounded-md"
              draggable={false}
            />
          </div>
          <div className="relative w-full h-fit flex flex-row items-center justify-center gap-2">
            <div
              className="relative w-6 h-6 rounded-full flex items-center justify-center border border-white"
              id="crt"
            >
              {profileImage !== "" && (
                <Image
                  src={profileImage}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full w-full h-full flex"
                  draggable={false}
                />
              )}
            </div>
            <div className="relative w-fit h-full text-white font-arcade flex items-center justify-center">
              @{profile?.handle?.split(".lens")[0]}
            </div>
          </div>
          {profile?.followModule?.type === "RevertFollowModule" ? (
            <div className="relative w-3/4 text-white font-arcade text-center flex items-center">
              User is not accepting new followers ATM
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col gap-3">
              {profile?.followModule?.type === "FeeFollowModule" && (
                <div className="relative w-full h-fit flex flex-row font-earl text-white text-sm items-center justify-center gap-2">
                  <div className="relative w-fit h-fit flex items-center justify-center">
                    {(profile?.followModule as any)?.amount?.value}
                  </div>
                  <div className="relative w-fit h-fit flex items-center justify-center">
                    {(profile?.followModule as any)?.amount?.asset?.symbol}
                  </div>
                </div>
              )}
              <div
                className={`relative w-28 h-10 rounded-md grid grid-flow-col auto-cols-auto text-white font-earl text-xs place-self-center text-center bg-moda cursor-pointer hover:opacity-70 active:scale-95 row-start-2`}
              >
                <div
                  className={`relative w-fit h-fit col-start-1 place-self-center text-center ${
                    followLoading && "animate-spin"
                  }`}
                  onClick={
                    profile?.followModule?.type === "FeeFollowModule" &&
                    !approved
                      ? () => approveCurrency()
                      : () => followProfile()
                  }
                >
                  {followLoading ? (
                    <AiOutlineLoading color="white" size={10} />
                  ) : profile?.followModule?.type === "FeeFollowModule" &&
                    !approved ? (
                    "Approve"
                  ) : (
                    "Follow Profile"
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowerOnly;

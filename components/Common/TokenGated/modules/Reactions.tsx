import { FunctionComponent } from "react";
import {
  BsSuitHeartFill,
  BsSuitHeart,
  BsCollection,
  BsFillCollectionFill,
} from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import {
  AiOutlineLoading,
  AiOutlineMinusCircle,
  AiOutlineRetweet,
} from "react-icons/ai";
import { ReactionProps } from "../types/allPosts.types";
import handleHidePost from "@/lib/helpers/handleHidePost";
import { setFollowerOnly } from "@/redux/reducers/followerOnlySlice";
import { setPurchase } from "@/redux/reducers/purchaseSlice";
import { setReactionState } from "@/redux/reducers/reactionStateSlice";

const Reactions: FunctionComponent<ReactionProps> = ({
  textColor,
  commentColor,
  mirrorColor,
  heartColor,
  collectColor,
  dispatch,
  publication,
  hasMirrored,
  hasReacted,
  followerOnly,
  address,
  collectPost,
  mirrorPost,
  reactPost,
  commentPost,
  index,
  mirrorLoading,
  reactLoading,
  collectLoading,
  hasCollected,
  reactAmount,
  collectAmount,
  mirrorAmount,
  commentAmount,
}): JSX.Element => {
  return (
    <div
      className={`relative w-fit h-fit col-start-1 justify-self-center grid grid-flow-col auto-cols-auto gap-4`}
    >
      <div className="relative w-fit h-fit col-start-1 row-start-1 grid grid-flow-col auto-cols-auto gap-2 place-self-center">
        <div
          className={`relative w-fit h-fit col-start-1 place-self-center cursor-pointer hover:opacity-70 active:scale-95 ${
            reactLoading && "animate-spin"
          }`}
          onClick={() => !reactLoading && reactPost(publication?.id)}
        >
          {reactLoading ? (
            <AiOutlineLoading size={15} color={heartColor} />
          ) : reactAmount > 0 && hasReacted ? (
            <BsSuitHeartFill size={15} color={heartColor} />
          ) : (
            <BsSuitHeart color={heartColor} size={15} />
          )}
        </div>
        <div
          className={`relative w-fit h-fit col-start-2 text-${textColor} font-dosis text-xs place-self-center`}
          onClick={() =>
            dispatch(
              setReactionState({
                actionOpen: true,
                actionType: "heart",
                actionValue: publication?.id,
                actionResponseReact: hasReacted,
              })
            )
          }
        >
          {reactAmount}
        </div>
      </div>
      <div
        className={`relative w-fit h-fit row-start-1 col-start-2 grid grid-flow-col auto-cols-auto gap-2 place-self-center`}
      >
        <div
          className={`relative w-fit h-fit col-start-1 place-self-center cursor-pointer hover:opacity-70 active:scale-95 ${
            followerOnly && "opacity-50"
          }`}
          onClick={() => commentPost(publication?.id)}
        >
          <FaRegCommentDots color={commentColor} size={15} />
        </div>
        <div
          className={`relative w-fit h-fit col-start-2 text-${textColor} font-dosis text-xs place-self-center`}
          onClick={() =>
            dispatch(
              setReactionState({
                actionOpen: true,
                actionType: "comment",
                actionValue: publication?.id,
              })
            )
          }
        >
          {commentAmount}
        </div>
      </div>
      <div
        className={`relative w-fit h-fit row-start-2 col-start-1 grid grid-flow-col auto-cols-auto gap-2 place-self-center`}
      >
        <div
          className={`relative w-fit h-fit col-start-1 place-self-center cursor-pointer hover:opacity-70 active:scale-95 ${
            followerOnly && "opacity-50"
          } ${mirrorLoading && "animate-spin"}`}
          onClick={() => !mirrorLoading && mirrorPost(publication.id)}
        >
          {mirrorLoading ? (
            <AiOutlineLoading size={15} color={mirrorColor} />
          ) : (
            <AiOutlineRetweet
              color={mirrorAmount > 0 && hasMirrored ? "red" : mirrorColor}
              size={15}
            />
          )}
        </div>
        <div
          className={`relative w-fit h-fit col-start-2 text-${textColor} font-dosis text-xs place-self-center`}
          onClick={() =>
            dispatch(
              setReactionState({
                actionOpen: true,
                actionType: "mirror",
                actionValue: publication?.id,
                actionResponseMirror: hasMirrored,
                actionFollower: followerOnly,
              })
            )
          }
        >
          {mirrorAmount}
        </div>
      </div>
      {(publication?.collectModule?.__typename !== "RevertCollectModuleSettings"
        ? true
        : false) && (
        <div
          className={`relative w-fit h-fit row-start-2 col-start-2 grid grid-flow-col auto-cols-auto gap-2 place-self-center`}
        >
          <div
            className={`relative w-fit h-fit col-start-1 place-self-center cursor-pointer hover:opacity-70 active:scale-95 ${
              collectLoading && "animate-spin"
            }`}
            onClick={
              publication?.collectModule?.type === "RevertCollectModule" ||
              collectLoading
                ? () => {}
                : (publication?.collectModule as any)?.followerOnly &&
                  !publication?.profile?.isFollowedByMe
                ? () =>
                    dispatch(
                      setFollowerOnly({
                        actionOpen: true,
                        actionFollowerId: publication?.profile?.id,
                        actionId: publication?.id,
                        actionIndex: index,
                      })
                    )
                : publication?.collectModule?.type !== "FreeCollectModule"
                ? () =>
                    dispatch(
                      setPurchase({
                        actionOpen: true,
                        actionId: publication?.id,
                        actionIndex: index,
                      })
                    )
                : () => collectPost(publication?.id)
            }
          >
            {collectLoading ? (
              <AiOutlineLoading size={15} color={collectColor} />
            ) : hasCollected ? (
              <BsFillCollectionFill size={15} color={collectColor} />
            ) : (
              <BsCollection size={15} color={collectColor} />
            )}
          </div>
          <div
            onClick={() =>
              dispatch(
                setReactionState({
                  actionOpen: true,
                  actionType: "collect",
                  actionValue: publication?.id,
                })
              )
            }
            className={`relative w-fit h-fit col-start-2 text-${textColor} font-dosis text-xs place-self-center`}
          >
            {collectAmount}
          </div>
        </div>
      )}
      {(publication?.profile?.ownedBy === address ? true : false) && (
        <div
          className={`relative w-fit h-fit row-start-3 col-start-1 col-span-2 grid grid-flow-col auto-cols-auto gap-2 place-self-center cursor-pointer active:scale-95`}
          onClick={() => handleHidePost(publication.id as string, dispatch)}
        >
          <AiOutlineMinusCircle color={textColor} size={15} />
        </div>
      )}
    </div>
  );
};

export default Reactions;
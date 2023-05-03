import { FunctionComponent } from "react";
import FillIn from "../../Inputs/modules/FillIn";
import ImageUpload from "../../Inputs/modules/ImageUpload";
import ButtonAdd from "../../Inputs/modules/ButtonAdd";
import { BsRewindFill } from "react-icons/bs";
import { AddCollectionProps } from "../types/collections.types";
import { setCollectionSwitcher } from "@/redux/reducers/collectionSwitcherSlice";
import CollectionPreview from "./CollectionPreview";
import CollectionPrices from "./CollectionPrices";

const AddCollection: FunctionComponent<AddCollectionProps> = ({
  imageLoading,
  uploadImage,
  addCollection,
  addCollectionLoading,
  dispatch,
  handleCollectionTitle,
  handleCollectionDescription,
  setImageLoading,
  handleCollectionPrices,
  handleCollectionAmount,
  collectionDetails,
  setPrice,
  price,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-full flex flex-col justify-start items-start text-white gap-4"
    >
      <div
        className="relative w-fit h-fit items-center justify-start font-economicaB text-sm flex flex-row gap-2 opacity-70 cursor-pointer active:scale-95"
        onClick={() => dispatch(setCollectionSwitcher("collections"))}
      >
        <div className="relative w-fit h-fit ">
          <BsRewindFill color="white" size={15} />
        </div>
        <div className="relative w-fit h-fit justify-start items-center flex">
          return
        </div>
      </div>
      <div className="relative w-fit h-fit items-start justify-start font-economicaB text-xl">
        ADD COLLECTION
      </div>
      <div className="relative w-full h-full flex flex-col md:flex-row gap-4 mid:gap-10">
        <div className="relative w-full mid:w-1/2 h-fit flex gap-5 flex-col md:order-1 order-2">
          <div className="relative flex flex-col gap-2 w-full h-fit">
            <div className="relative w-fit h-fit font-economica text-lg">
              Collection Name
            </div>
            <FillIn
              textArea={false}
              changeFunction={(e) => handleCollectionTitle(e)}
              type={"string"}
              width="full"
              defaultValue={collectionDetails?.title}
            />
          </div>
          <div className="relative flex flex-col gap-2 w-full h-fit">
            <div className="relative w-fit h-fit font-economica text-lg">
              Collection Description
            </div>
            <FillIn
              textArea={true}
              changeFunction={(e) => handleCollectionDescription(e)}
              width="full"
              defaultValue={collectionDetails?.description}
            />
          </div>
          <div className="relative flex flex-col new:flex-row w-full h-full items-start justify-start gap-5 new:gap-10 new:pb-0 pb-5">
            <div className="relative w-full md:w-fit mid:w-full h-full flex flex-col gap-5">
              <div className="relative flex flex-col gap-2 w-fit mid:w-full h-fit">
                <div className="relative w-fit h-fit font-economica text-lg">
                  Collection Art
                </div>
                <ImageUpload
                  image={collectionDetails.image}
                  imageLoading={imageLoading}
                  uploadImage={uploadImage}
                  loaderGeneral={addCollectionLoading}
                  setImageLoading={setImageLoading}
                  type="collection"
                />
              </div>
              <div className="relative w-full h-fit flex flex-col gap-2">
                <div className="relative w-fit h-fit font-economica text-lg">
                  Collection Amount
                </div>
                <FillIn
                  textArea={false}
                  changeFunction={(e) => handleCollectionAmount(e)}
                  type={"number"}
                  width={"full"}
                  defaultValue={String(collectionDetails?.amount)}
                />
              </div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-2 font-economica justify-start">
              <div className="relative w-fit h-fit text-lg">
                Collection Prices
              </div>
              <div className="opacity-70 w-fit word-break text-xxs">
                (Set Prices for the Tokens You want to Accept On Payment)
              </div>
              <CollectionPrices
                collectionDetails={collectionDetails}
                handleCollectionPrices={handleCollectionPrices}
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-2 w-fit h-fit justify-start items-center">
            <ButtonAdd
              text={"Mint Collection"}
              width={"28"}
              functionAdd={addCollection}
              loader={addCollectionLoading}
            />
          </div>
        </div>
        <div className="relative w-full h-full flex md:order-2 order-1">
          <CollectionPreview
            collectionDetails={collectionDetails}
            setPrice={setPrice}
            price={price}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
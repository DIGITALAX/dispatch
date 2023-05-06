import { createSlice } from "@reduxjs/toolkit";

export interface CollectionDetailsState {
  title: string;
  description: string;
  image: string;
  amount: number;
  acceptedTokens: string[];
  tokenPrices: number[];
  disabled: boolean;
  fileType: string;
  type: string;
  id: number;
}

const initialCollectionDetailsState: CollectionDetailsState = {
  title: "Collection Title",
  description: "Collection Description :)",
  image: "",
  amount: 1,
  acceptedTokens: [],
  tokenPrices: [],
  disabled: false,
  fileType: "",
  type: "add",
  id: 0,
};

export const collectionDetailsSlice = createSlice({
  name: "collectionDetails",
  initialState: initialCollectionDetailsState,
  reducers: {
    setCollectionDetails: (
      state: CollectionDetailsState,
      {
        payload: {
          actionTitle,
          actionDescription,
          actionImage,
          actionAmount,
          actionAcceptedTokens,
          actionTokenPrices,
          actionDisabled,
          actionFileType,
          actionType,
          actionId,
        },
      }
    ) => {
      state.title = actionTitle;
      state.description = actionDescription;
      state.image = actionImage;
      state.amount = actionAmount;
      state.acceptedTokens = actionAcceptedTokens;
      state.tokenPrices = actionTokenPrices;
      state.disabled = actionDisabled;
      state.fileType = actionFileType;
      state.type = actionType;
      state.id = actionId;
    },
  },
});

export const { setCollectionDetails } = collectionDetailsSlice.actions;

export default collectionDetailsSlice.reducer;

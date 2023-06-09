import { UploadedMedia } from "@/components/Common/TokenGated/types/allPosts.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostGateImagesState {
  value: UploadedMedia[];
}

const initialPostGateImagesState: PostGateImagesState = {
  value: [],
};

export const postGateImagesSlice = createSlice({
  name: "postGateImages",
  initialState: initialPostGateImagesState,
  reducers: {
    setPostGateImages: (state: PostGateImagesState, action: PayloadAction<UploadedMedia[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setPostGateImages } = postGateImagesSlice.actions;

export default postGateImagesSlice.reducer;

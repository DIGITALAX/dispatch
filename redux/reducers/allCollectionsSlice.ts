import { Collection } from "@/components/Common/Collections/types/collections.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AllCollectionsState {
  value: Collection[];
}

const initialAllCollectionsState: AllCollectionsState = {
  value: [],
};

export const allCollectionsSlice = createSlice({
  name: "allCollections",
  initialState: initialAllCollectionsState,
  reducers: {
    setAllCollectionsRedux: (
      state: AllCollectionsState,
      action: PayloadAction<any[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setAllCollectionsRedux } = allCollectionsSlice.actions;

export default allCollectionsSlice.reducer;

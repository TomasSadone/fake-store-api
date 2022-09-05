import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Categories } from "../../../types";

export interface CounterState {
  value: Categories;
}

const initialState: CounterState = {
  value: [],
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Categories>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = navbarSlice.actions;

export default navbarSlice.reducer;

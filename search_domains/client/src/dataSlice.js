import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name:null,
    domains:null
  }
};

export const dataSlice = createSlice({
  name: "setData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data.domains = action.payload;
    },
    setName: (state, action) => {
      state.data.name = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setData, setName } = dataSlice.actions;

export default dataSlice.reducer;

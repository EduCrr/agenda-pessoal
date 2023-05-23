import { createSlice } from "@reduxjs/toolkit";
export const Slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
    token: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setLogOut: (state) => {
      return (state = { name: "", token: "", id: "" });
    },
  },
});

export const { setId, setName, setToken, setLogOut } = Slice.actions;

export default Slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { API } from "../api/API";

interface InitialState {
  darkMode: boolean;
  imageLogin: string;
  showImageLogin: boolean;
  fileImageLogin: string;
  hasAccount: boolean;
  isAuth: boolean;

  imageProfile: string;
  currentUser: {
    id?: number;
    username: string;
    email: string;
    avatar?: string;
    role: "USER" | "ADMIN";
    banned: boolean;
  };
  isAdmin: boolean;
}

const initialState: InitialState = {
  darkMode: true,
  imageLogin: "",
  showImageLogin: false,
  fileImageLogin: "",
  hasAccount: true,
  isAuth: JSON.parse(localStorage.getItem("auth")!),
  imageProfile: "",
  currentUser: {
    id: 0,
    username: "",
    email: "",
    avatar: "",
    role: "USER",
    banned: false,
  },
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")!),
};

const configSlice = createSlice({
  name: "sliceName",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      return state;
    },
    setImageLogin: (state, { payload }: PayloadAction<string>) => {
      state.imageLogin = payload;
      return state;
    },
    showImagelogin: (state, { payload }: PayloadAction<boolean>) => {
      state.showImageLogin = payload;
      return state;
    },
    setFileImageLogin: (state, { payload }: PayloadAction<string>) => {
      state.fileImageLogin = payload;
      return state;
    },
    setHasAccount: (state, { payload }: PayloadAction<boolean>) => {
      state.hasAccount = payload;
      return state;
    },
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
      return state;
    },
    setImageprofileURL: (state, { payload }: PayloadAction<string>) => {
      state.imageProfile = payload;
      return state;
    },
    setCurrentUser: (
      state,
      { payload }: PayloadAction<InitialState["currentUser"]>
    ) => {
      state.currentUser = payload;
      return state;
    },

  },
});

export const {
  setDarkMode,
  setFileImageLogin,
  setImageLogin,
  showImagelogin,
  setHasAccount,
  setIsAuth,
  setImageprofileURL,
  setCurrentUser,
} = configSlice.actions;

export default configSlice.reducer;

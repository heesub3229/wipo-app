import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  dateBirth: null,
  name: null,
  loginType: null,
  userSid: null,
  profileColor: null,
  friendsLength: null,
  friend: [],
  file: { sid: null, filename: null, filepath: null, create_at: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.email = null;
      state.dateBirth = null;
      state.name = null;
      state.loginType = null;
      state.userSid = null;
      state.profileColor = null;
      state.friendsLength = null;
      state.friend = [];
      state.file = {
        sid: null,
        filename: null,
        filepath: null,
        create_at: null,
      };
    },
    saveUserInfo: (state, action) => {
      const { user, friend } = action.payload;
      const {
        email,
        dateBirth,
        name,
        profileColor,
        sid,
        logintype,
        friendsLength,
        file,
      } = user;
      state.userSid = sid;
      state.dateBirth = dateBirth;
      state.email = email;
      state.name = name;
      state.loginType = logintype;
      state.friendsLength = friendsLength;
      state.profileColor = profileColor;
      state.friend = friend;
      if (file) {
        state.file.sid = file.sid;
        state.file.filename = file.filename;
        state.file.filepath = file.filepath;
        state.file.create_at = file.create_at;
      }
    },
    changeUserInfo: (state, action) => {
      const { dateBirth, file, friendsLength, profileColor } = action.payload;
      state.dateBirth = dateBirth;
      if (file) {
        state.file.sid = file.sid;
        state.file.filename = file.filename;
        state.file.filepath = file.filepath;
        state.file.create_at = file.create_at;
      }
      state.friendsLength = friendsLength;
      state.profileColor = profileColor;
    },
    pushFriend: (state, action) => {
      const {
        sid,
        email,
        name,
        password,
        logintype,
        dateBirth,
        isPrivacy,
        create_at,
        profileColor,
        friendsLength,
        file,
      } = action.payload;
      const findData = state.friend.find((item) => item.sid === sid);
      if (findData) {
        findData.email = email;
        findData.name = name;
        findData.password = password;
        findData.logintype = logintype;
        findData.dateBirth = dateBirth;
        findData.isPrivacy = isPrivacy;
        findData.create_at = create_at;
        findData.profileColor = profileColor;
        findData.friendsLength = friendsLength;
        findData.file = file;
      } else {
        state.friend.push({
          sid,
          email,
          name,
          password,
          logintype,
          dateBirth,
          isPrivacy,
          create_at,
          profileColor,
          friendsLength,
          file,
        });
      }
    },
  },
});

export const { clearAuth, saveUserInfo, pushFriend, changeUserInfo } =
  authSlice.actions;
export default authSlice.reducer;

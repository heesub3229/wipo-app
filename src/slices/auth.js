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
  favList: { page: { totalCount: 0, current: 1 }, data: [] },
  defaultDay: 1,
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
      state.friend
        ? state.friend.splice(0, state.friend.length)
        : (state.friend = []);
      state.file = {
        sid: null,
        filename: null,
        filepath: null,
        create_at: null,
      };
      state.favList.page.totalCount = 0;
      state.favList.page.current = 1;
      state.favList.data
        ? state.favList.data.splice(0, state.favList.data.length)
        : (state.favList.data = []);
    },
    saveUserInfo: (state, action) => {
      const { user, friend, favList, iamount, eamount } = action.payload;
      const {
        email,
        dateBirth,
        name,
        profileColor,
        sid,
        logintype,
        friendsLength,
        file,
        defaultDay,
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
      state.favList.data = favList.map((item) => ({ ...item, favFlag: "Y" }));
      state.favList.page.totalCount = favList.length;
      state.favList.page.current = 1;
      state.defaultDay = defaultDay ? defaultDay : 1;
    },
    changeUserInfo: (state, action) => {
      const { dateBirth, file, friendsLength, profileColor, defaultDay } =
        action.payload;
      state.dateBirth = dateBirth;
      if (file) {
        state.file.sid = file.sid;
        state.file.filename = file.filename;
        state.file.filepath = file.filepath;
        state.file.create_at = file.create_at;
      }
      state.friendsLength = friendsLength;
      state.profileColor = profileColor;
      state.defaultDay = defaultDay ? defaultDay : 1;
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
    pushFavList: (state, action) => {
      const {
        addressName,
        favFlag,
        placeName,
        region_1depth_name,
        region_2depth_name,
        region_3depth_name,
        x,
        y,
        type,
      } = action.payload;
      if (favFlag === "Y") {
        state.favList.data.push({
          sid: null,
          type: type,
          x: x,
          y: y,
          addressName: addressName,
          favFlag: favFlag,
          placeName: placeName,
          region_1depth_name: region_1depth_name,
          region_2depth_name: region_2depth_name,
          region_3depth_name: region_3depth_name,
          create_at: null,
        });
      } else {
        const findIndex = state.favList.data.findIndex(
          (item) => item.x === x && item.y === y
        );
        if (findIndex !== -1) {
          const findData = state.favList.data[findIndex];
          if (findData.sid) {
            findData.favFlag = "N";
          } else {
            state.favList.data.splice(findIndex, 1);
          }
        }
      }
      state.favList.page.current = 1;
      state.favList.page.totalCount = state.favList.data.length;
    },
    changeFavPage: (state, action) => {
      const page = action.payload;
      state.favList.page.current = page;
    },
    sucFavList: (state, action) => {
      const data = action.payload;
      if (Array.isArray(data)) {
        state.favList.data = state.favList.data.filter((obj) => {
          const filterObj = data.find(
            (item) => item.x === obj.x && item.y === obj.y
          );
          if (filterObj) {
            obj.sid = filterObj.sid;
            return true; // 유지
          }
          return obj.favFlag !== "N";
        });
      }
    },
  },
});

export const {
  clearAuth,
  saveUserInfo,
  pushFriend,
  changeUserInfo,
  pushFavList,
  changeFavPage,
  sucFavList,
} = authSlice.actions;
export default authSlice.reducer;

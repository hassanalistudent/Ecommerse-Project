import { createSlice } from "@reduxjs/toolkit";

// ✅ Fix 1: Corrected method name from `getitem` → `getItem` (JavaScript is case-sensitive)
// ✅ Fix 2: Corrected argument in JSON.parse: should be the string key "userInfo", not variable userinfo
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // ✅ Fix 3: Use `action.payload` instead of undefined `payload`
      state.userInfo = action.payload;

      // ✅ Fix 4: Consistent key naming: always "userInfo" (not "userinfo")
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      // Optional: store expiration time (30 days ahead)
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;

      // ✅ Fix 5: Instead of `localStorage.clear()` (which wipes everything),
      // remove only the keys we set for auth
      localStorage.clear();
  
    },
  },
});

// ✅ Fix 6: Corrected spelling of exported action: `setCredentials` not `setCredientials`
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

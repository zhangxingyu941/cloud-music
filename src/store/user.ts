import { defineStore } from "pinia";

export const userInfo = defineStore("userInfo", {
  state: () => {
    return {
      isLoginShow: false,
      user: {
        name: "",
        avatarUrl: "",
      },
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["user"],
      },
      { key: "isLoginShow", storage: sessionStorage, paths: ["isLoginShow"] },
    ],
  },
});

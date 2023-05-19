import { atom } from "recoil";
import { GlobalSession } from "@/types/global-session";

export const globalState = atom<GlobalSession>({
  key: "globalSessionState",
  default: { currentTab: "home" },
});

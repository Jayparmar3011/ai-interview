import { create } from "zustand";

type InterviewState = {
  started: boolean;
  tabSwitches: number;
  network: boolean;
  camera: boolean;

  startInterview: () => void;
  addTabSwitch: () => void;
  setNetwork: (v: boolean) => void;
  setCamera: (v: boolean) => void;
};

export const useInterviewStore = create<InterviewState>((set) => ({
  started: false,
  tabSwitches: 0,
  network: true,
  camera: false,

  startInterview: () => set({ started: true }),
  addTabSwitch: () => set((s) => ({ tabSwitches: s.tabSwitches + 1 })),
  setNetwork: (v) => set({ network: v }),
  setCamera: (v) => set({ camera: v }),
}));

import { create } from 'zustand';

interface Store {
  settings: { isLink: boolean; isFile: boolean }[];

  addSettings: () => void;
  setIsLink: (index: number) => void;
  setIsFile: (index: number) => void;
}

const useQuestionSettingStore = create<Store>((set) => ({
  settings: [{ isLink: false, isFile: false }],

  addSettings: () => {
    set((prev) => ({
      settings: [...prev.settings, { isLink: false, isFile: false }],
    }));
  },

  setIsLink: (index) =>
    set((store) => ({
      settings: store.settings.map((setting, i) =>
        i === index ? { ...setting, isLink: !setting.isLink } : setting,
      ),
    })),

  setIsFile: (index) =>
    set((store) => ({
      settings: store.settings.map((setting, i) =>
        i === index ? { ...setting, isFile: !setting.isFile } : setting,
      ),
    })),
}));

export default useQuestionSettingStore;

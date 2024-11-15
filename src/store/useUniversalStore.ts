import { create } from "zustand";

export type csvDataObjectType = {
  value: string;
  publishedDate: string;
  portal: string;
  author: string;
  headline: string;
  urlLink: string;
  sentiment: string;
};

type csvDataType = {
  totalArticles: number | null;
  negative: number | null;
  neutral: number | null;
  positive: number | null;
  todayDate: Date | null;
  MonthlyDate: Date | null;
  rangeFromDate: Date | null;
  rangeToDate: Date | null;
  csvDataMap: Map<string, csvDataObjectType>;
  csvDataFor2Days: Map<string, csvDataObjectType>;
  write: (
    obj: Partial<csvDataType> | ((obj: csvDataType) => csvDataType)
  ) => void;
};

const useUniversalStore = create<csvDataType>((set) => {
  return {
    totalArticles: null,
    negative: null,
    neutral: null,
    positive: null,
    todayDate: new Date(),
    MonthlyDate: null,
    rangeFromDate: null,
    rangeToDate: null,
    csvDataFor2Days: new Map<string, csvDataObjectType>(),
    csvDataMap: new Map<string, csvDataObjectType>(),
    write: (obj) => {
      if (typeof obj === "function") {
        set((state) => obj(state));
      } else {
        set(obj);
      }
    },
  };
});

export default useUniversalStore;

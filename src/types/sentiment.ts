export interface SentimentData {
  total: number;
  negative: number;
  neutral: number;
  positive: number;
  change: {
    total: number;
    negative: number;
    neutral: number;
    positive: number;
  };
}

export interface PortalData {
  name: string;
  negative: number;
  neutral: number;
  positive: number;
}

export interface PieData {
  name: string;
  value: number;
}

type ThemeType = {
  color: {
    primary: string;
    positive: string;
    negative: string;
  };
  border: {
    normal: string;
    thick: string;
  };
  animation: {
    fast: number;
    normal: number;
    slow: number;
  };
  cards: string[];
};

export default ThemeType;

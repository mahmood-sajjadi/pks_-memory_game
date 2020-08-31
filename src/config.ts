class Config {
  static get startedDelay(): number {
    return Number(process.env.REACT_APP_START_DELAY) || 0;
  }

  static get displayReset(): number {
    return Number(process.env.REACT_APP_DISPLAY_RESET) || 0;
  }

  static get cardsCount(): number {
    return Number(process.env.REACT_APP_CARDS_COUNT) || 0;
  }
}

export default Config;

export function choosePriceAndSymbol(prices, currency) {
  const filteredPrice = prices.find((c) => c.currency.label === currency);
  const { symbol } = filteredPrice.currency;
  const { amount } = filteredPrice;

  return `${symbol}${amount}`;
}

export function choosenPrice(prices, currency) {
  const filteredPrice = prices.find((c) => c.currency.label === currency);
  const { amount } = filteredPrice;

  return amount;
}

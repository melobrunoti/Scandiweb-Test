export function choosePrice(prices, currency) {
  const filteredPrice = prices.find((c) => c.currency.label === currency);
  const { symbol } = filteredPrice.currency;
  const { amount } = filteredPrice;

  return `${symbol}${amount}`;
}

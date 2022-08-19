import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreProvider from '../Context/StoreProvider';
import userEvent from '@testing-library/user-event';

import App from '../App';

const setup = async () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};
describe('Currency tests', () => {
  test('should be able to change the products currencies', async () => {
    setup();
    const openCurrencies = screen.getByAltText(/open currencies/i);
    userEvent.click(openCurrencies);

    const gpb = await screen.findByTestId(/currency-1/i);
    userEvent.click(gpb);

    const gbpSymbol = screen.queryAllByText('£', { exact: false });
    expect(gbpSymbol[2]).toBeInTheDocument();
  });
});

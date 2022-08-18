import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import StoreProvider from '../Context/StoreProvider';
import App from '../App';

describe('Test main page', () => {
  test('should be able to navigate between categories', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    const titleAll = screen.getByRole('heading', {
      level: 1,
      name: /all/i,
    });
    expect(titleAll).toBeInTheDocument();

    const tech = await screen.findByRole('link', { name: /tech/i });

    expect(tech).toBeInTheDocument();
    userEvent.click(tech);
    const titleTech = screen.getByRole('heading', {
      level: 1,
      name: /tech/i,
    });
    expect(titleTech).toBeInTheDocument();
    userEvent.click(titleAll);
  });

  test('should render products cards', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    const card = await screen.findByTestId('product-0');
    expect(card).toBeInTheDocument();
  });

  test('should go to detailed page', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );

    const buy = await screen.findAllByTestId('buy-button');
    expect(buy[0]).toBeInTheDocument();
    userEvent.click(buy[0]);
    const addToCart = screen.getByText(/add to cart/i);
    expect(addToCart).toBeInTheDocument();
  });
});

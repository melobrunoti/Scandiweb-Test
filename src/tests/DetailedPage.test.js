import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import StoreProvider from '../Context/StoreProvider';

import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Add to cart flux', () => {
  test('should be able to add a product to cart', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );
    const buy = await screen.findAllByTestId('buy-button');
    expect(buy[0]).toBeInTheDocument();
    userEvent.click(buy[0]);

    const sneakers = await screen.findByText(/Nike x Stussy/i);
    expect(sneakers).toBeInTheDocument();

    const addToCart = screen.getByText(/add to cart/i);
    expect(addToCart).toBeDisabled();

    const attribute = await screen.findByText(/40/i);
    userEvent.click(attribute);
    expect(attribute).toHaveClass('attribute-selected');
    expect(addToCart).toBeEnabled();
    userEvent.click(addToCart);
    const cartLength = screen.getByTestId('cartLength');
    expect(cartLength).toHaveTextContent(1);
    userEvent.click(addToCart);
    expect(cartLength).toHaveTextContent(2);
  });

  test('cart items should be in the cart page', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );
    const cart = screen.getByAltText('cart-icon');
    userEvent.click(cart);
    const viewBag = screen.getByText(/view bag/i);
    userEvent.click(viewBag);

    const orderButton = screen.getByText(/order/i);
    expect(orderButton).toBeInTheDocument();

    const sneaks = await screen.findAllByText(/Nike x Stussy/i);
    expect(sneaks[1]).toBeInTheDocument();

    const quantity = screen.getAllByText(/2/i);
    expect(quantity[1]).toBeInTheDocument();

    const total = screen.getAllByText(/289.38/i);
    expect(total[1]).toBeInTheDocument();

    const tax = screen.getByText(/60.77/i);
    expect(tax).toBeInTheDocument();
  });
});

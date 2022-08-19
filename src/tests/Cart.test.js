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
describe('Mini cart tests', () => {
  test('should be able to increase quantity to product in the cart', async () => {
    setup();
    const buy = await screen.findAllByTestId('buy-button');
    userEvent.click(buy[0]);
    const addToCart = screen.getByText(/add to cart/i);
    const attribute = await screen.findByText(/40/i);
    userEvent.click(attribute);
    userEvent.click(addToCart);
    const cart = screen.getByAltText(/cart-icon/i);
    userEvent.click(cart);
    const addQuantity = screen.getByText('+');
    userEvent.click(addQuantity);

    const quantity = screen.getAllByText('2');
    expect(quantity[1]).toBeInTheDocument();
  });

  test('should be to change product image', async () => {
    setup();

    const nextImg = screen.getByAltText(/next img/i);
    userEvent.click(nextImg);

    const imgSrc =
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087';
    const atualImg = await screen.findAllByAltText(/Nike Air Huarache Le/i);
    expect(atualImg[0]).toBeInTheDocument();
    expect(atualImg[0].src).toContain(imgSrc);
  });

  test('should be to able to remove products from the cart', async () => {
    setup();

    const decrease = screen.getByText('-');
    userEvent.click(decrease);

    const quantity = screen.getAllByText('1');
    expect(quantity[1]).toBeInTheDocument();

    userEvent.click(decrease);
    expect(quantity[1]).not.toBeInTheDocument();
  });
});

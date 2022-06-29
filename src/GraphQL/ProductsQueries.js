import { gql } from '@apollo/client';

export const loadAllProducts = gql`
  query {
    category(input: { title: "all" }) {
      products {
        id
        name
        inStock
        category
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

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

export const loadTechProducts = gql`
  query {
    category(input: { title: "tech" }) {
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

export const loadClothesProducts = gql`
  query {
    category(input: { title: "clothes" }) {
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

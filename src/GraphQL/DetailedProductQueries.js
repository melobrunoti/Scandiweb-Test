import { gql } from '@apollo/client';

export function loadDetailedProduct(id) {
  const result = gql`
      query {
        product(id: "${id}") {
          id
          name
          inStock
          category
          gallery
          description
          brand
          attributes {
            id
            name
            type
            items{
              id
              displayValue
              value
            }
    }
          prices {
            currency{
              label
              symbol
            }
            amount
          }
        }
        }
    `;
  return result;
}

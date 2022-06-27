import { gql } from '@apollo/client';

export const loadCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

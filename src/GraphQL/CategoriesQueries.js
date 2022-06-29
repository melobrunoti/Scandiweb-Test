import { gql } from '@apollo/client';

export const loadCategories = gql`
  query {
    categories {
      name
    }
  }
`;

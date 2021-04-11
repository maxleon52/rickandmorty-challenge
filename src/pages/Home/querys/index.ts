import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        dimension
      }
    }
  }
`;

export const GET_PERSONS = gql`
  query {
    characters {
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;

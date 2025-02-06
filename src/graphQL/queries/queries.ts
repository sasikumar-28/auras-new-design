import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(limit: 4) {
      total
      results {
        id
        key
        name(locale: "en-US")
      }
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory(
    $filters: [SearchFilterInput!]!
    $limit: Int
    $offset: Int
  ) {
    productProjectionSearch(filters: $filters, limit: $limit, offset: $offset) {
      offset
      total
      count
      results {
        id
        key
        name(locale: "en-US")
        description(locale: "en-US")
        masterVariant {
          prices {
            value {
              currencyCode
              centAmount
            }
          }
          images {
            url
          }
        }
      }
    }
  }
`;
import { gql } from "@apollo/client";

export const PRODUCTS_LIST_GQ = gql`
query GetProducts {
  getProducts {
    name
    cost
    uid
    photo
    _id
  }
}
`
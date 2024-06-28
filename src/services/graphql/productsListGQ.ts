import { gql } from "@apollo/client";

export const PRODUCTS_LIST_GQ = gql`
  query GetProducts($getProductsId: String) {
  getProducts(id: $getProductsId) {
    name
    cost
    uid
    path
    _id
  }
}
`
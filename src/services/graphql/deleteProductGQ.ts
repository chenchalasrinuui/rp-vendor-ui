import { gql } from "@apollo/client";

export const DELETE_PRODUCT_GQL = gql`
mutation DeleteProduct($deleteProductId: String) {
  deleteProduct(id: $deleteProductId)
}
`

/*
{
  "deleteProductId": "667d003a8d98815eb67ade8b"
}
*/
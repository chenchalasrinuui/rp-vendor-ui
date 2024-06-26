import { gql } from "@apollo/client";

export const SAVE_PRODUCT = gql`
mutation Mutation($file: Upload, $product: ProductInput) {
  saveProduct(file: $file, product: $product)
}
`
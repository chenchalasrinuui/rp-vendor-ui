import { gql } from "@apollo/client";

export const SAVE_PRODUCT = gql`
mutation SaveProduct($file: Upload!) {
  saveProduct(file: $file)
}
`
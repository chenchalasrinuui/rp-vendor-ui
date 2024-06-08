import { gql } from '@apollo/client';

export const REG_VENDOR_GQ = gql`
mutation RegisterVendor($data: User) {
  registerVendor(data: $data)
}
`
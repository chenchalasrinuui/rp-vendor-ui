import { gql } from '@apollo/client';
export const VENDORS_LIST_GQ = gql`
query GetVendors {
  getVendors {
    _id
    uid
    password
    role
    phone
    email
    address
  }
}
`
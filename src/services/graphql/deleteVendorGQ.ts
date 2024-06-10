import { gql } from "@apollo/client";

export const DELETE_VENDOR_GS = gql`
mutation DeleteVendor($deleteVendorId: String) {
  deleteVendor(id: $deleteVendorId)
}
`
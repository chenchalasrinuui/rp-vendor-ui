import { gql } from "@apollo/client";

export const CHANGE_PWD_GQ = gql`
mutation ChangePassword($currPwd: String, $newPwd: String, $changePasswordId: String) {
  changePassword(currPwd: $currPwd, newPwd: $newPwd, id: $changePasswordId)
}
`
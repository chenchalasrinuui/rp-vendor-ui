import { gql } from '@apollo/client';

export const LOGIN_GQ = gql`
query Query($data: loginInput) {
  login(data: $data)
}
`;

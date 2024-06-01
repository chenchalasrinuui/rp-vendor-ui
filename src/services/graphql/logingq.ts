import { gql } from '@apollo/client';

export const LOGIN_GQ = gql`
query Query($data: User) {
    login(data: $data)
  }
`;
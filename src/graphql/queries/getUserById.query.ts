import gql from 'graphql-tag'
import UserFragment from '../fragments/user.fragment'

export const GetUserByIdQuery = gql`
  ${UserFragment}
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      ...user
    }
  }
`

import gql from 'graphql-tag'
import UserFragment from '../fragments/user.fragment'

export const MeQuery = gql`
  ${UserFragment}
  query Me {
    me {
      ...user
    }
  }
`

import gql from 'graphql-tag'

export const SearchUsersByNameQuery = gql`
  query SearchUsersByName($name: String!) {
    searchUsersByName(name: $name) {
      _id
      avatar
      name
    }
  }
`

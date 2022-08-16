import gql from 'graphql-tag'

export const RegisterMutation = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      message
    }
  }
`

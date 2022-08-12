import gql from 'graphql-tag'

const GoogleLoginMutation = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      token
      isNewUser
    }
  }
`

export default GoogleLoginMutation

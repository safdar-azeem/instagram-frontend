import gql from 'graphql-tag'

export const FollowOrUnfollowUserMutation = gql`
  mutation FollowOrUnfollowUser($userId: ID!) {
    followOrUnfollowUser(userId: $userId)
  }
`

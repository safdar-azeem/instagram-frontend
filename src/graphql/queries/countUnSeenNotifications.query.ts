import gql from 'graphql-tag'

export const CountUnSeenNotificationsQuery = gql`
  query CountUnSeenNotifications {
    countUnSeenNotifications
  }
`

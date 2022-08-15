import gql from 'graphql-tag'

export const MarkAllNotificationsSeenMutation = gql`
  mutation MarkAllNotificationsSeen {
    markAllNotificationsSeen
  }
`

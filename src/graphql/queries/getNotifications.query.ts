import gql from 'graphql-tag'
import NotificationFragment from '../fragments/notification.fragment'

export const GetNotificationsQuery = gql`
  ${NotificationFragment}
  query GetNotifications {
    getNotifications {
      ...notification
    }
  }
`

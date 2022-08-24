import gql from 'graphql-tag'
import NotificationFragment from '../fragments/notification.fragment'

export const NewNotificationSubscription = gql`
  ${NotificationFragment}
  subscription NewNotification {
    newNotification {
      ...notification
    }
  }
`

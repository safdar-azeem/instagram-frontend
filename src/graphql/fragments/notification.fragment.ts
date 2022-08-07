import { gql } from '@apollo/client'

const NotificationFragment = gql`
  fragment notification on Notification {
    _id
    type
    createdAt
    isSeen
    isRemoved
    post {
      _id
      photo
    }
    sender {
      _id
      avatar
      name
    }
  }
`

export default NotificationFragment

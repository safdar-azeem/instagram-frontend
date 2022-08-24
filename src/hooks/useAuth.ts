import apolloClient from '@/config/graphql.config'
import { useMeQuery } from '@/graphql'
import { provideApolloClient } from '@vue/apollo-composable'
provideApolloClient(apolloClient)

export function useAuth() {
  const { onResult, onError } = useMeQuery()
  const authPromise = new Promise((resolve) => {
    onResult((result) => {
      resolve(true)
    })

    onError((error) => {
      resolve(false)
    })
  })

  return { authPromise }
}

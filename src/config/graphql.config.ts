import Cookies from '@/utils/cookies'
import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
const env = import.meta.env as any

const httpLink: any = createUploadLink({
  uri: env.VITE_APP_API_URL,
  headers: { 'Apollo-Require-Preflight': 'true' },
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: env.VITE_APP_WS_API_URL,
    connectionParams: async () => {
      const token = Cookies.getToken()
      return {
        Authorization: token,
      }
    },
  })
)

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink: any = setContext((_, { headers }) => {
  const authHeader: any = {}
  const token = Cookies.getToken()
  if (token) {
    authHeader['Authorization'] = `${token}`
  }
  return {
    headers: {
      ...headers,
      ...authHeader,
    },
  }
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, link]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing, incoming) {
              return incoming
            },
          },
          posts: {
            merge(existing, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
})

export default apolloClient

import App from './App.vue'
import router from './router'
import './assets/sass/main.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp, h, provide } from 'vue'
import apolloClient from './config/graphql.config'
import { DefaultApolloClient } from '@vue/apollo-composable'
import GoogleSignInPlugin from 'vue3-google-signin'
const env = import.meta.env as any

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(GoogleSignInPlugin, {
  clientId: env.VITE_GOOGLE_CLIENT_ID,
})

app.use(router)
app.mount('#app')
const options = {
  timeout: 1500,
  position: 'bottom-center',
}
app.use(Toast, options)

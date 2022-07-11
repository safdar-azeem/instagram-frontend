<script setup lang="ts">
import Cookies from '@/utils/cookies'
import { useRouter } from 'vue-router'
import Button from '../reusable/Button.vue'
import { useToast } from 'vue-toastification'
import { useGoogleLoginMutation } from '@/graphql'
import { AppRoutes } from '@/constants/routes.constant'
import { useTokenClient, type AuthCodeFlowSuccessResponse } from 'vue3-google-signin'

defineProps<{
  loading: boolean
  label: string
}>()

const toast = useToast()
const router = useRouter()

const {
  mutate: googleLoginMutation,
  onError: googleLoginError,
  onDone: googleLoginDone,
  loading: googleLoading,
} = useGoogleLoginMutation({})

const { isReady, login } = useTokenClient({
  onSuccess: (response: AuthCodeFlowSuccessResponse) => {
    googleLoginMutation({
      token: response.access_token,
    })
  },
  onError: (erro) => {
    console.error('Error with One Tap Login')
  },
})

googleLoginError((error) => {
  toast.error(error.message)
})

googleLoginDone((result) => {
  if (result.data.googleLogin) {
    Cookies.setToken(result.data.googleLogin.token as string)
    toast.success(
      result.data.googleLogin.isNewUser ? 'Account created successfully' : 'Login successful'
    )
    router.push(AppRoutes.HOME)
  }
})
</script>

<template>
  <Button
    size="lg"
    full-width
    @click="login"
    icon="devicon:google"
    variant="outline"
    :text="label"
    :disabled="loading || googleLoading || !isReady">
  </Button>
</template>

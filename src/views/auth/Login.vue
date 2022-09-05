<script lang="ts">
import Cookies from '@/utils/cookies'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginMutation } from '@/graphql'
import { loginJson } from '@/json/login.json'
import { useToast } from 'vue-toastification'
import Form from '@/components/reusable/Form.vue'
import Button from '@/components/reusable/Button.vue'
import { AppRoutes } from '@/constants/routes.constant'
import AuthFormHeader from '@/components/auth/AuthFormHeader.vue'
import GoogleLoginBtn from '@/components/auth/GoogleLoginBtn.vue'

export default defineComponent({
  name: 'Login',
  components: {
    Form,
    Button,
    AuthFormHeader,
    GoogleLoginBtn,
  },
  setup() {
    const toast = useToast()
    const router = useRouter()
    const { mutate, onDone, onError, loading } = useLoginMutation({})

    const handleSubmit = ({ email, password }) => {
      mutate({
        email: email,
        password: password,
      })
    }

    onDone((result) => {
      Cookies.setToken(result.data?.login?.token as string)
      toast.success('Login successful')
      router.push(AppRoutes.HOME)
    })

    onError((error) => toast.error(error.message))

    return {
      loading,
      AppRoutes,
      loginJson,
      handleSubmit,
    }
  },
})
</script>

<template>
  <section class="grid lg:grid-cols-2 place-items-center min-h-screen">
    <aside class="w-full sm:min-w-[541px] sm:w-auto px-10 grid gap-y-8">
      <AuthFormHeader
        title="Login into account"
        description="Use your credentials to access your account." />
      <Form
        class="grid gap-y-5"
        :schema="loginJson"
        @onSubmit="handleSubmit">
        <button
          :disabled="loading"
          class="btn neobrutalism left"
          :class="{
            'w-full': true,
            loading: loading,
          }">
          Login
          <input
            type="submit"
            class="hidden" />
        </button>
      </Form>
      <footer class="-text-fs-1 text-center">
        <span>Don’t have an account? </span>
        <router-link
          :to="AppRoutes.REGISTER"
          class="font-bold ml-1">
          Register
        </router-link>
      </footer>
      <GoogleLoginBtn
        :loading="loading"
        label=" Sign in with Google" />
    </aside>
    <figure class="bg-[#EAE8E2] h-full w-full hidden lg:grid place-items-center">
      <img
        src="/register-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>

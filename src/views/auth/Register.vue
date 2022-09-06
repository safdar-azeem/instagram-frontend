<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useRegisterMutation } from '@/graphql'
import Form from '@/components/reusable/Form.vue'
import { registerJson } from '@/json/register.json'
import Button from '@/components/reusable/Button.vue'
import { AppRoutes } from '@/constants/routes.constant'
import AuthFormHeader from '@/components/auth/AuthFormHeader.vue'
import GoogleLoginBtn from '@/components/auth/GoogleLoginBtn.vue'

export default defineComponent({
  name: 'Register',
  components: {
    Form,
    Button,
    AuthFormHeader,
    GoogleLoginBtn,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const { mutate, onDone, onError, loading } = useRegisterMutation({})

    const handleSubmit = ({ name, email, password }) => {
      mutate({
        name: name,
        email: email,
        password: password,
      })
    }

    onDone(() => {
      toast.success('Account created successfully')
      router.push(AppRoutes.LOGIN)
    })

    onError((error) => toast.error(error.message))

    return {
      loading,
      AppRoutes,
      registerJson,
      handleSubmit,
    }
  },
})
</script>

<template>
  <section class="grid lg:grid-cols-2 place-items-center min-h-screen">
    <aside class="w-full sm:min-w-[541px] sm:w-auto px-10 grid gap-y-8">
      <AuthFormHeader
        title="Create New Account."
        description="Add your credentials to create a new account." />
      <Form
        class="grid gap-y-5"
        :schema="registerJson"
        @onSubmit="handleSubmit">
        <button
          class="btn neobrutalism left"
          :class="{
            'w-full': true,
            loading: loading,
          }">
          Create Account
          <input
            type="submit"
            class="hidden" />
        </button>
      </Form>
      <footer class="-text-fs-1 text-center">
        <span>Already have an account? </span>
        <router-link
          :to="AppRoutes.LOGIN"
          class="font-bold ml-1"
          >Login</router-link
        >
      </footer>
      <GoogleLoginBtn
        :loading="loading"
        label=" Sign up with Google" />
    </aside>
    <figure class="bg-[#EAE8E2] h-full w-full hidden lg:grid place-items-center">
      <img
        src="/register-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>

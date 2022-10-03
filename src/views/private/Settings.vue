<script lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Form from '@/components/reusable/Form.vue'
import Input from '@/components/reusable/Input.vue'
import usePhotoUpload from '@/hooks/usePhotoUpload'
import Button from '@/components/reusable/Button.vue'
import { AppRoutes } from '@/constants/routes.constant'
import { defineComponent, reactive, toRefs } from 'vue'
import CoverPhoto from '@/components/profile/CoverPhoto.vue'
import { profileUpdateJson } from '@/json/profileUpdate.json'
import { useMeQuery, useUpdateProfileMutation } from '@/graphql'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import ThemeDropdown from '@/components/settings/ThemeDropdown.vue'
import SettingActionBtns from '@/components/settings/SettingActionBtns.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    Input,
    Button,
    Form,
    CoverPhoto,
    ProfileHeader,
    SettingActionBtns,
    ThemeDropdown,
  },
  setup() {
    const toast = useToast()
    const router = useRouter()
    const {
      mutate: updateProfile,
      onError: onUpdateProfileError,
      loading: updateProfileLoading,
    } = useUpdateProfileMutation({
      refetchQueries: ['Me'],
    })

    const { result: me, loading: meLoading, error: meError } = useMeQuery()
    const { handleUploadPhoto, uploadPhotoLoading } = usePhotoUpload()
    const userName = reactive({
      value: String(me?.value?.me?.name),
      error: '',
    })

    const state = reactive({
      avatar: '',
      cover: '',
    })

    const handleAvatar = (file: any) => (state.avatar = file)
    const handleCover = (file: any) => (state.cover = file)

    const upoadPhotos = async () => {
      if (!state.avatar && !state.cover) return
      const data: any = {}
      if (state.avatar) {
        const avatar = await handleUploadPhoto(state.avatar)
        data['avatar'] = avatar
      }
      if (state.cover) {
        const cover = await handleUploadPhoto(state.cover)
        data['cover'] = cover
      }
      return data
    }

    const handleSubmit = async (formValues: Object) => {
      if (!userName.value) {
        return (userName.error = 'Name is required')
      } else if (userName.value.length > 15) {
        return (userName.error = 'Name is too long')
      } else if (userName.value.length < 3) {
        return (userName.error = 'Name is too short')
      } else {
        userName.error = ''
      }

      const photos = await upoadPhotos()

      const data = { name: userName.value, ...formValues, ...photos }
      console.log({ data })
      const result: any = await updateProfile(data)
      if (result.data?.updateProfile) {
        toast.success('Profile updated successfully')
        router.push(`${AppRoutes.PROFILE}/${me.value?.me?._id}`)
      }
    }

    onUpdateProfileError((error) => toast.error(error.message))

    return {
      ...toRefs(state),
      userName,
      me,
      meError,
      meLoading,
      handleCover,
      handleAvatar,
      handleSubmit,
      profileUpdateJson,
      uploadPhotoLoading,
      updateProfileLoading,
    }
  },
})
</script>

<template>
  <section class="sm:flex gap-x-10 lg:gap-x-20 pb-10">
    <section class="flex-1 w-full">
      <CoverPhoto
        :cover="me?.me?.cover || ''"
        :isLoading="meLoading"
        @handleImage="handleCover"
        :edit="true" />
      <section class="relative">
        <ProfileHeader
          :edit="true"
          :isLoading="meLoading"
          :error="userName.error"
          :avatar="me?.me?.avatar || ''"
          :name="me?.me?.name || ''"
          @handleImage="handleAvatar"
          @handleName="userName.value = $event">
        </ProfileHeader>
        <form class="mt-7">
          <Form
            class="grid md:grid-cols-2 gap-x-6 xl:gap-x-10 gap-y-6"
            :schema="profileUpdateJson"
            :values="me?.me"
            @onSubmit="handleSubmit">
            <ThemeDropdown class="max-w-[400px]" />
            <SettingActionBtns
              class="lg:absolute lg:top-16 lg:right-1 col-span-2"
              :loading="uploadPhotoLoading || updateProfileLoading"
              :disabled="uploadPhotoLoading || updateProfileLoading" />
          </Form>
        </form>
      </section>
    </section>
    <figure class="hidden md:block">
      <img
        src="/setting-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>

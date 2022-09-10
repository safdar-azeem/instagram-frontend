<script lang="ts">
import useForm from '@/hooks/useForm'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Input from '@/components/reusable/Input.vue'
import usePhotoUpload from '@/hooks/usePhotoUpload'
import Button from '@/components/reusable/Button.vue'
import { AppRoutes } from '@/constants/routes.constant'
import CoverPhoto from '@/components/profile/CoverPhoto.vue'
import { profileUpdateJson } from '@/json/profileUpdate.json'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import ThemeDropdown from '@/components/settings/ThemeDropdown.vue'
import SettingActionBtns from '@/components/settings/SettingActionBtns.vue'
import { useMeQuery, useUpdateProfileMutation, useUploadPhotoMutation } from '@/graphql'

export default defineComponent({
  name: 'Settings',
  components: {
    Input,
    Button,
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
    const { state: formState, handleChange, doValidation, updateForm } = useForm(profileUpdateJson)
    const state = reactive({
      avatar: '',
      cover: '',
    })

    watch(
      () => me.value,
      (newVal) => {
        if (newVal?.me) {
          updateForm(newVal.me)
        }
      },
      { immediate: true }
    )

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

    const handleSubmit = async () => {
      const isValid = await doValidation()
      if (!isValid) return
      const photos = await upoadPhotos()
      const formValues: any = {}
      for (const key in formState) {
        formValues[key] = formState[key].value
      }
      const data = { ...formValues, ...photos }
      const result: any = await updateProfile(data)
      if (result.data?.updateProfile) {
        toast.success('Profile updated successfully')
        router.push(`${AppRoutes.PROFILE}/${me.value?.me?._id}`)
      }
    }

    onUpdateProfileError((error) => toast.error(error.message))

    return {
      ...toRefs(state),
      me,
      meError,
      meLoading,
      formState,
      handleCover,
      handleChange,
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
      <ProfileHeader
        :edit="true"
        :isLoading="meLoading"
        @handleName="handleChange"
        :name="me?.me?.name || ''"
        @handleImage="handleAvatar"
        :error="formState.name.error"
        :avatar="me?.me?.avatar || ''">
        <SettingActionBtns
          class="hidden lg:flex"
          @handleSubmit="handleSubmit"
          :loading="uploadPhotoLoading || updateProfileLoading"
          :disabled="uploadPhotoLoading || updateProfileLoading" />
      </ProfileHeader>
      <form class="mt-7">
        <section class="grid md:grid-cols-2 gap-x-6 xl:gap-x-10 gap-y-6">
          <template v-for="input in profileUpdateJson">
            <Input
              :key="input.name"
              :name="input.name"
              :type="input.type"
              :class="input.cols"
              :label="input.label"
              @input="handleChange"
              v-if="input.name !== 'name'"
              :placeholder="input.placeholder"
              :value="formState[input.name].value" />
          </template>
          <ThemeDropdown />
        </section>
      </form>
      <SettingActionBtns
        class="lg:hidden flex justify-end"
        :loading="uploadPhotoLoading || updateProfileLoading"
        @handleSubmit="handleSubmit" />
    </section>
    <figure class="hidden md:block">
      <img
        src="/setting-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>

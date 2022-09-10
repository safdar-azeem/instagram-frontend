<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useGetPostsByUserQuery, useGetUserByIdQuery, useMeQuery } from '@/graphql'

const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))
const Avatar = defineAsyncComponent(() => import('@/components/reusable/Avatar.vue'))
const Button = defineAsyncComponent(() => import('@/components/reusable/Button.vue'))
const UserAbout = defineAsyncComponent(() => import('@/components/profile/UserAbout.vue'))
const UserStats = defineAsyncComponent(() => import('@/components/profile/UserStats.vue'))
const CoverPhoto = defineAsyncComponent(() => import('@/components/profile/CoverPhoto.vue'))
const EmptyState = defineAsyncComponent(() => import('@/components/reusable/EmptyState.vue'))
const ProfileHeader = defineAsyncComponent(() => import('@/components/profile/ProfileHeader.vue'))

const FollowOrUnfollowBtn = defineAsyncComponent(
  () => import('@/components/reusable/FollowOrUnfollowBtn.vue')
)

export default defineComponent({
  components: {
    Avatar,
    Button,
    PostList,
    UserStats,
    UserAbout,
    CoverPhoto,
    EmptyState,
    ProfileHeader,
    FollowOrUnfollowBtn,
  },
  name: 'Profile',
  props: ['id'],
  setup(props) {
    const { result: me, loading: meLoading, error: meError } = useMeQuery()

    const {
      result: user,
      loading: userLoading,
      error: userError,
    } = useGetUserByIdQuery({
      id: props.id,
    })

    const {
      result: posts,
      loading: postLoading,
      error: postError,
    } = useGetPostsByUserQuery({
      userId: props.id,
    })

    return {
      user,
      userLoading,
      userError,
      posts,
      postLoading,
      postError,
      AppRoutes,
      me,
    }
  },
  computed: {
    isOwner() {
      return this.user?.getUserById?._id === this.me?.me?._id
    },
  },
})
</script>

<template>
  <header class="-mt-1">
    <CoverPhoto
      :cover="user?.getUserById?.cover || ''"
      :isLoading="userLoading" />
    <ProfileHeader
      :avatar="user?.getUserById?.avatar || ''"
      :name="user?.getUserById?.name || ''"
      :isLoading="userLoading"
      :isOwner="isOwner">
      <section v-if="!userLoading">
        <router-link
          :to="AppRoutes.SETTINGS"
          v-if="isOwner">
          <Button
            class="hidden mt-11 sm:flex"
            text="Edit Profile"
            variant="outline"
            buttonClass="-text-fs-1" />
          <Button
            size="sm"
            variant="outline"
            radius="rounded-full"
            buttonClass="-text-fs-1"
            class="flex mt-11 sm:hidden"
            icon="material-symbols:edit-rounded" />
        </router-link>
        <FollowOrUnfollowBtn
          :userId="user?.getUserById?._id"
          v-else
          class="mt-11" />
      </section>
    </ProfileHeader>
  </header>
  <section class="profile-section-grid">
    <aside>
      <UserStats
        :user="user?.getUserById"
        variant="bg"
        class="mb-6" />
      <UserAbout
        :user="user?.getUserById"
        variant="bg" />
    </aside>
    <div>
      <PostList
        :posts="posts?.getPostsByUser"
        :loading="postLoading"
        :columnsOnLgScreens="3"
        :columnsOnMdScreens="3"
        :columnsOnSmScreens="2"
        :isCardPhotoOnly="true" />
      <EmptyState
        height="h-80"
        icon="/emptyFeed.svg"
        description="Click the 'Add Post' button to share something with your followers."
        v-if="!postLoading && posts?.getPostsByUser.length === 0"
        :title="`${isOwner ? 'You' : user?.getUserById?.name}
        haven't shared anything yet.
        `" />
    </div>
  </section>
</template>

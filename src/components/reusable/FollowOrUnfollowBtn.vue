<script lang="ts">
import { useFollowOrUnfollowUserMutation, useMeQuery } from '@/graphql'
import { defineComponent, reactive, toRefs } from 'vue'
import Button from './Button.vue'

export default defineComponent({
  name: 'FollowOrUnfollowBtn',
  components: {
    Button,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg' | 'default',
      default: 'default',
    },
  },
  setup(props) {
    const { result: me, loading: meLoading, error: meError, onResult } = useMeQuery()
    const state = reactive({
      mefollowing: [],
    })

    onResult((result) => {
      state.mefollowing = result.data?.me?.following
    })

    const {
      mutate: followOrUnfollowUser,
      loading: followOrUnfollowUserLoading,
      error: followOrUnfollowUserError,
    } = useFollowOrUnfollowUserMutation({
      refetchQueries: ['GetUserById', 'Me'],
    })

    const handleFollowOrUnfollowUser = async () => {
      state.mefollowing = state.mefollowing?.includes(props.userId)
        ? state.mefollowing?.filter((following) => following !== props.userId)
        : [...state.mefollowing, props.userId]
      followOrUnfollowUser({
        userId: props.userId,
      })
    }

    return {
      ...toRefs(state),
      me,
      meLoading,
      meError,
      followOrUnfollowUser,
      followOrUnfollowUserLoading,
      followOrUnfollowUserError,
      handleFollowOrUnfollowUser,
    }
  },
  computed: {
    followOrUnfollowBtn(): {
      text: string
      variant: 'primary' | 'outline'
    } {
      return this.mefollowing?.includes(this.userId)
        ? {
            text: 'Unfollow',
            variant: 'outline',
          }
        : this.mefollowing?.includes(this.userId)
        ? {
            text: 'Follow Back',
            variant: 'primary',
          }
        : {
            text: 'Follow',
            variant: 'primary',
          }
    },
  },
})
</script>

<template>
  <Button
    :text="followOrUnfollowBtn.text"
    :variant="followOrUnfollowBtn.variant"
    :size="size"
    @click="handleFollowOrUnfollowUser" />
</template>

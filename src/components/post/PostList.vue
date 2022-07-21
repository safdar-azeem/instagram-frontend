<script lang="ts">
import useGallery from '@/hooks/useGallery'
import type { IPost } from '@/graphql'
import { useMeQuery } from '@/graphql'
import PostSkeleton from '@/components/skeletons/PostSkeleton.vue'
import { defineAsyncComponent, defineComponent, reactive, toRefs, watch } from 'vue'

const PostCard = defineAsyncComponent(() => import('./PostCard.vue'))
const ViewPostModal = defineAsyncComponent(() => import('./ViewPostModal.vue'))

export default defineComponent({
  name: 'PostList',
  components: { PostCard, PostSkeleton, ViewPostModal },
  props: {
    posts: {
      type: Array as () => Array<IPost>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    isCardPhotoOnly: {
      type: Boolean,
      default: false,
    },
    columnsOnLgScreens: {
      type: Number,
      default: 3,
    },
    columnsOnMdScreens: {
      type: Number,
      default: 2,
    },
    columnsOnSmScreens: {
      type: Number,
      default: 1,
    },
  },

  setup(props) {
    const { result: meData, loading: meLoading, onResult: onMeResult } = useMeQuery()
    const { column1, column2, column3, setData } = useGallery(props.posts, {
      columnsOnLgScreens: props.columnsOnLgScreens,
      columnsOnMdScreens: props.columnsOnMdScreens,
      columnsOnSmScreens: props.columnsOnSmScreens,
      stateSuffix: 'column',
    })

    const state = reactive({
      isModalOpen: false,
      selectedPost: null as IPost | null,
      posts: props.posts,
      deletedPosts: [] as Array<string>,
      me: {} as any,
    })

    onMeResult((data: any) => {
      state.me = data.data.me
    })

    const handlePostClick = (post: IPost) => {
      state.selectedPost = post
      state.isModalOpen = true
    }

    const handlePrevPost = () => {
      const currentPost = state.selectedPost
      const currentIndex = state.posts.indexOf(currentPost)

      if (currentIndex > 0) {
        state.selectedPost = state.posts[currentIndex - 1]
      }
    }

    const handleNextPost = () => {
      const currentPost = state.selectedPost
      const currentIndex = state.posts.indexOf(currentPost)

      if (currentIndex !== -1 && currentIndex < state.posts.length - 1) {
        state.selectedPost = state.posts[currentIndex + 1]
      }
    }
    const handleDeletePost = (id) => {
      state.deletedPosts = [...state.deletedPosts, id]
      state.posts = state.posts.filter((post) => post._id !== id)
      if (state.isModalOpen) {
        handleNextPost()
      }
    }

    const handleLikePost = (id) => {
      state.posts = state.posts.map((post: IPost) => {
        if (post._id !== id) return post

        const liked = post.likes.includes(meData?.value.me._id)

        const newPost: IPost = {
          ...post,
          likes: liked
            ? post.likes.filter((like) => like !== meData?.value.me._id)
            : [meData?.value.me._id],
        }

        if (state.selectedPost?._id === id) state.selectedPost = newPost

        return newPost
      })
    }

    const handleBookmarkPost = (id) => {
      const bookmarks = state.me.bookmarks.includes(id)
        ? state.me.bookmarks.filter((bookmark) => bookmark !== id)
        : [...state.me.bookmarks, id]
      state.me = { ...state.me, bookmarks }
    }

    watch(
      () => state.posts,
      () => {
        if (state.posts.length == 0) {
          state.selectedPost = null
          state.isModalOpen = false
          return
        }

        setData(state.posts)
      }
    )

    watch(
      () => props.posts,
      () => {
        if (state.posts) {
          if (state.deletedPosts.includes(state.selectedPost?._id)) {
            state.selectedPost = null
            state.isModalOpen = false
            return
          }

          state.posts = state.posts.filter((post) => {
            return props.posts.find((p) => p._id === post._id)
          })

          if (state.selectedPost) {
            const newPost = props.posts.find((post) => post._id === state.selectedPost._id)
            if (newPost) {
              state.selectedPost = {
                ...newPost,
                likes: state.selectedPost.likes,
              }
            } else {
              handleNextPost()
            }
          }
        }
        state.posts = props.posts
      }
    )

    return {
      ...toRefs(state),
      meData,
      meLoading,
      handlePostClick,
      handlePrevPost,
      handleNextPost,
      handleDeletePost,
      handleLikePost,
      handleBookmarkPost,
      column1: column1 as IPost,
      column2: column2 as IPost,
      column3: column3 as IPost,
    }
  },
})
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="card-gallery"
      :class="{
        'profile-page-gallery': columnsOnLgScreens === 2,
      }">
      <PostSkeleton
        v-for="i in 4"
        :variant="isCardPhotoOnly ? 'photo' : 'card'"
        :key="i" />
    </div>
    <div
      v-else
      class="card-gallery"
      :class="{
        'profile-page-gallery': columnsOnLgScreens === 2,
        'explore-page-gallery': columnsOnSmScreens === 2,
      }">
      <div class="gallery-item">
        <PostCard
          :me="me"
          :post="post"
          :key="post._id"
          v-for="post in column1"
          @handleLikePost="handleLikePost"
          @openModal="handlePostClick(post)"
          :isCardPhotoOnly="isCardPhotoOnly"
          @handleDeletePost="handleDeletePost"
          @handleBookmarkPost="handleBookmarkPost" />
      </div>
      <div class="gallery-item">
        <PostCard
          :me="me"
          :post="post"
          :key="post._id"
          v-for="post in column2"
          @handleLikePost="handleLikePost"
          @openModal="handlePostClick(post)"
          :isCardPhotoOnly="isCardPhotoOnly"
          @handleDeletePost="handleDeletePost"
          @handleBookmarkPost="handleBookmarkPost" />
      </div>
      <div
        class="gallery-item"
        v-if="columnsOnLgScreens === 3">
        <PostCard
          :me="me"
          :post="post"
          :key="post._id"
          v-for="post in column3"
          @handleLikePost="handleLikePost"
          @openModal="handlePostClick(post)"
          :isCardPhotoOnly="isCardPhotoOnly"
          @handleDeletePost="handleDeletePost"
          @handleBookmarkPost="handleBookmarkPost" />
      </div>
    </div>
    <ViewPostModal
      :me="me"
      :post="selectedPost"
      @prev="handlePrevPost"
      @next="handleNextPost"
      :isModalOpen="isModalOpen"
      @open="isModalOpen = true"
      @close="isModalOpen = false"
      @handleLikePost="handleLikePost"
      @handleDeletePost="handleDeletePost"
      @handleBookmarkPost="handleBookmarkPost"
      :isPrevBtnDisabled="!selectedPost || selectedPost._id === posts[0]._id"
      :isNextBtnDisabled="!selectedPost || selectedPost._id === posts[posts.length - 1]._id" />
  </div>
</template>

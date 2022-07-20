<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useImage } from '@vueuse/core'

export default defineComponent({
  name: 'PostImage',
  props: {
    photo: {
      type: String,
      required: true,
    },
    isAspectSquare: {
      type: Boolean,
      default: false,
    },
    isCardPhotoOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const imgHeight = ref(0)
    const id = ref(new Date().getTime() * Math.random())
    const { isLoading } = useImage({ src: props.photo })

    watch(isLoading, (value) => {
      if (!value) {
        setTimeout(() => {
          const postImage = document.getElementById(`post-image-${id.value}`)
          if (postImage) {
            imgHeight.value = postImage.clientHeight
          }
        }, 5)
      }
    })

    return { isImageLoading: isLoading, id, imgHeight }
  },

  computed: {
    imgClass() {
      return [
        this.imgHeight < 450
          ? this.isAspectSquare
            ? 'lg:aspect-auto'
            : ' lg:aspect-auto'
          : 'aspect-square',
      ]
    },
  },
})
</script>

<template>
  <section ref="imgContainerRef">
    <div
      v-if="isImageLoading"
      class="bg-gray-200 h-max w-full aspect-square rounded-md skeleton"></div>
    <figure
      class="bg-gray-100 rounded-lg overflow-hidden"
      v-else>
      <img
        alt=""
        :class="imgClass"
        :src="photo || ''"
        :id="`post-image-${id}`"
        class="card-image object-contain lg:max-h-full" />
    </figure>
  </section>
</template>

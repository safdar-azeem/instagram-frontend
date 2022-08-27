import { ref, computed } from 'vue'

export function useInfiniteScrollPagination() {
  const page = ref(1)
  const pageSize = ref(10)
  const skip = computed(() => (page.value - 1) * pageSize.value)
  const limit = computed(() => pageSize.value)
  const hasMore = ref(true)

  const loadMore = async () => {
    page.value++
  }

  return {
    skip,
    limit,
    loadMore,
    hasMore,
  }
}

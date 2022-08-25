import { onMounted, reactive, toRefs } from 'vue'

interface Props {
  columnsOnLgScreens: number
  columnsOnMdScreens: number
  columnsOnSmScreens: number
  stateSuffix: string
}

const useGallery = (data: unknown[], props: Props) => {
  const mdScreenWidth = 640
  const xlScreenWidth = 1280
  const maxColumns =
    props.columnsOnLgScreens > props.columnsOnMdScreens
      ? props.columnsOnLgScreens
      : props.columnsOnMdScreens
  const columns = {}

  for (let i = 1; i <= maxColumns; i++) {
    columns[`${props.stateSuffix}${i}`] = []
  }

  const state = reactive({
    data: data,
    loading: true,
    ...columns,
  })

  const displayLgScreenData = () => {
    for (let i = 0; i <= props.columnsOnLgScreens; i++) {
      setTimeout(() => {
        state[`${props.stateSuffix}${i + 1}`] = state.data
          .map((data: unknown, index: number) =>
            index % props.columnsOnLgScreens === i ? data : null
          )
          .filter(Boolean)
      }, 0)
    }
  }

  const displayMdScreenData = () => {
    for (let i = 0; i <= props.columnsOnMdScreens; i++) {
      setTimeout(() => {
        state[`${props.stateSuffix}${i + 1}`] = state.data
          .map((data: unknown, index: number) =>
            index % props.columnsOnMdScreens === i ? data : null
          )
          .filter(Boolean)
      }, 0)
    }

    if (props.columnsOnLgScreens > 1) {
      for (let i = props.columnsOnMdScreens + 1; i <= props.columnsOnLgScreens; i++) {
        state[`${props.stateSuffix}${i}`] = []
      }
    }
  }

  const displaySmScreenData = () => {
    for (let i = 0; i <= props.columnsOnSmScreens; i++) {
      setTimeout(() => {
        state[`${props.stateSuffix}${i + 1}`] = state.data
          .map((data: unknown, index: number) =>
            index % props.columnsOnSmScreens === i ? data : null
          )
          .filter(Boolean)
      }, 0)
    }

    if (props.columnsOnMdScreens > props.columnsOnSmScreens) {
      for (let i = props.columnsOnSmScreens + 1; i <= props.columnsOnMdScreens; i++) {
        state[`${props.stateSuffix}${i}`] = []
      }
    }
  }

  const displayData = () => {
    if (window.innerWidth >= xlScreenWidth && props.columnsOnLgScreens > 1) {
      displayLgScreenData()
      return
    }
    if (window.innerWidth >= mdScreenWidth && props.columnsOnMdScreens > 1) {
      displayMdScreenData()
      return
    }
    displaySmScreenData()
  }

  const setData = (data: unknown[]) => {
    state.loading = false
    state.data = data
    displayData()
  }

  onMounted(() => {
    displayData()
    window.addEventListener('resize', () => {
      displayData()
    })
  })

  return {
    ...toRefs(state),
    setData,
  } as any
}

export default useGallery

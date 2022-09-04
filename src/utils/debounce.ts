function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  } as any as F
}

export default debounce

type PropMapper<T,  K extends keyof T = keyof T> = (value: T[K], record?: T) => T[K]


export const mergeProps =
  <T, D = T>(obj: {[key in keyof Partial<T>]: PropMapper<T>} ) =>
    (source: T) => {
      const mapped = Object
        .entries(obj)
        .reduce(
          (r, [key, value]) =>
            ({...r, [key]: obj[key](source[key], source)}),
          {},
        )

      return {
        ...source,
        ...mapped,
      }
    }

export * from './ability'
export * from './dream-world'
export * from './move'
export * from './other'
export * from './pokemon'
export * from './simple-attribute'
export * from './sprites'
export * from './stat'
export * from './type'
export * from './version-group-detail'

export type RequiredList<T, K extends keyof T = keyof T> = Partial<T> &
  Required<Pick<T, K>>

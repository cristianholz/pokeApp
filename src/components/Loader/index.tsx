import styles from './Loader.module.scss'

type LoaderProps = {
  width?: string
  height?: string
}

export function Loader({ width = '16px', height = '16px' }: LoaderProps) {
  return (
    <span className={styles.loader} style={{ width, height }}>
      <span className="sr-only">Carregando...</span>
    </span>
  )
}

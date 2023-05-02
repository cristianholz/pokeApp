import styles from './Pagination.module.scss'

type PaginationProps = {
  totalCountOfRegister: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const SIBLINGS_COUNT = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => from + index + 1)
}

export function Pagination({
  totalCountOfRegister,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegister / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage),
        )
      : []

  return (
    <nav className={styles.pagination}>
      <ol className={styles.list}>
        {currentPage > SIBLINGS_COUNT + 1 && (
          <>
            <li>
              <button type="button" onClick={() => onPageChange(1)}>
                1
              </button>
            </li>

            {currentPage > 2 + SIBLINGS_COUNT && (
              <li>
                <span>...</span>
              </li>
            )}
          </>
        )}

        {previousPages.length
          ? previousPages.map((page) => (
              <li key={page}>
                <button type="button" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            ))
          : ''}

        <li>
          <button
            className={styles.current}
            type="button"
            onClick={() => onPageChange(currentPage)}
          >
            {currentPage}
          </button>
        </li>

        {nextPages.length
          ? nextPages.map((page) => (
              <li key={page}>
                <button type="button" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            ))
          : ''}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <li>
                <span>...</span>
              </li>
            )}

            <li>
              <button type="button" onClick={() => onPageChange(lastPage)}>
                {lastPage}
              </button>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

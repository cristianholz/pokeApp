import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  CardSkeleton,
  Loader,
  Pagination,
  PokemonCard,
  SEO,
} from '@/components'
import { usePokemonList } from '@/hooks'
import { STRINGS } from '@/strings'

import styles from '../styles/Home.module.scss'

const TITLE = STRINGS.APP_NAME

export default function Home() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = usePokemonList(page, 10)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page])

  if (error)
    return (
      <>
        <SEO title={TITLE} />

        <main className="main mainError">
          <h1>Oops! Tente novamente mais tarde.</h1>
        </main>
      </>
    )

  function renderList() {
    const hasResults = data?.results.length && !isLoading

    if (hasResults) {
      return (
        <>
          <ul className={styles.list}>
            {data.results.map((pokemon) => (
              <li key={pokemon.name}>
                <PokemonCard pokemon={pokemon} />
              </li>
            ))}
          </ul>

          <Pagination
            totalCountOfRegister={data.count}
            currentPage={page}
            registersPerPage={10}
            onPageChange={setPage}
          />
        </>
      )
    }

    return (
      <ul className={styles.list}>
        {[...Array(10)].map((_, e) => (
          <li key={e}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <SEO title={TITLE} />

      <main className="main">
        <h1 className={styles.title}>
          <Link href="/" passHref>
            <a title={TITLE}>
              <Image
                width={70}
                height={70}
                alt={TITLE}
                title={TITLE}
                src="/logotipo.svg"
              />
              <span className={styles.title}>{TITLE}</span>
            </a>
          </Link>
          {isFetching && <Loader />}
        </h1>

        {renderList()}
      </main>
    </>
  )
}

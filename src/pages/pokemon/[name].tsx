import { BsArrowLeft } from 'react-icons/bs'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { Loader, PokemonImage, SEO } from '@/components'
import { renderStatName } from '@/helpers'
import { STRINGS } from '@/strings'
import { GetPokemonListResponse, Pokemon } from '@/types'

import api from '../../services/axios'
import Custom404 from '../404'

import styles from './Pokemon.module.scss'

type PokemonPageProps = {
  pokemon: Pokemon
}

const TITLE = STRINGS.APP_NAME
const BUTTON_BACK = STRINGS.GO_BACK

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<GetPokemonListResponse>('pokemon?limit=120')
  const paths = data.results.map((_, name) => ({
    params: { name: String(name) },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as ParsedUrlQuery

  let pokemon

  try {
    const { data: pokemonData } = await api.get<Pokemon>(`pokemon/${name}`)

    pokemon = pokemonData
  } catch (err) {
    return { props: { pokemon: null } }
  }

  return {
    props: { pokemon },
  }
}

export default function PokemonPage({ pokemon }: PokemonPageProps) {
  const { isFallback } = useRouter()

  if (!pokemon) return <Custom404 />

  if (isFallback)
    return (
      <>
        <SEO title={TITLE} />

        <main className="main mainError">
          <Loader width="40px" height="40px" />
        </main>
      </>
    )

  function renderImage() {
    const imageUrl = pokemon?.sprites?.other?.dream_world?.front_default
    const defaultImage = '/placeholder.png'

    return (
      <PokemonImage
        imgUrl={imageUrl || defaultImage}
        defaultImage={defaultImage}
        alt={pokemon.name}
        title={pokemon.name}
        width={250}
        height={250}
      />
    )
  }

  return (
    <>
      <SEO
        title={`${TITLE} | 
        ${pokemon.name}`}
        description={`
        ${pokemon.name}`}
      />

      <div className={`${styles.wrapper} ${pokemon.types[0].type.name}`}>
        <main className={`main ${styles.main} `}>
          <header className={styles.header}>
            <div className={styles.title}>
              <Link href="/">
                <a title={BUTTON_BACK} className={styles.goBack}>
                  <BsArrowLeft />
                  <span className="sr-only">{BUTTON_BACK}</span>
                </a>
              </Link>

              <h1>{pokemon.name}</h1>
            </div>
          </header>
          <div className={styles.content}>
            <section>
              <div className={styles.image__wrapper}>{renderImage()}</div>

              <ul className={styles.types}>
                {pokemon.types.map(({ type }) => (
                  <li key={type.name} className={type.name}>
                    {type.name}
                  </li>
                ))}
              </ul>
            </section>

            {!!pokemon.stats?.length && (
              <section>
                <h2 className={styles.contentTitle}>Estatísticas básicas</h2>

                <ul className={styles.stats}>
                  {pokemon.stats.map((stat) => {
                    if (!stat.stat.name) return null

                    return (
                      <li key={stat.stat.name}>
                        <span>{renderStatName(stat.stat.name)}</span>

                        <p>
                          <span className={styles.value}>
                            {stat.base_stat < 100
                              ? `0${stat.base_stat}`
                              : stat.base_stat}
                          </span>

                          <span className={styles.bar}>
                            <span
                              className={styles.progress}
                              style={{
                                width: `${(stat.base_stat / 300) * 100}%`,
                              }}
                            />
                          </span>
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

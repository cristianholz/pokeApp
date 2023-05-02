import Link from 'next/link'

import { CardSkeleton, PokemonImage } from '@/components'
import { renderId, renderStatName } from '@/helpers'
import { usePokemon } from '@/hooks'
import { SimpleAttribute } from '@/types'

import styles from './PokemonCard.module.scss'

type PokemonCardProps = {
  pokemon: SimpleAttribute
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { data, isLoading, error } = usePokemon(pokemon.name)

  if (error) return null

  if (isLoading) return <CardSkeleton />

  function renderStats() {
    const hasStats = !data?.stats.length

    if (hasStats) return null

    return (
      <ul className={styles.stats}>
        {data?.stats.map((stat) => {
          if (!stat.stat.name) return null

          return (
            <li key={stat.stat.name}>
              <span className={styles.stats__title}>
                {renderStatName(stat.stat.name)}
              </span>

              <p>
                <span className={styles.stats__result}>{stat.base_stat}</span>
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  function renderImage() {
    const imageUrl = data?.sprites?.other?.dream_world?.front_default
    const defaultImage = '/placeholder.png'

    return (
      <PokemonImage
        imgUrl={imageUrl || defaultImage}
        defaultImage={defaultImage}
        alt={pokemon.name}
        title={pokemon.name}
      />
    )
  }

  return (
    <Link href={`/pokemon/${data?.name}`}>
      <a className={styles.card}>
        <div className={data?.types[0].type.name}>
          <span className={styles.id}>#{renderId(String(data?.id))}</span>

          <div className={styles.sprite}>
            <div className={styles.sprite__image}>{renderImage()}</div>
          </div>

          <div className={styles.infos}>
            <h2>{data?.name}</h2>
            {renderStats()}
          </div>
        </div>
      </a>
    </Link>
  )
}

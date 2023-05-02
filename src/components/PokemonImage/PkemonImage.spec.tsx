import { render } from '@testing-library/react'

import { PokemonImage } from '@/components'

describe('PokemonCard component', () => {
  it('renders correctly', () => {
    render(
      <PokemonImage
        imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        defaultImage="./placeholder.png"
        alt="bulbasaur"
        title="bulbasaur"
        width={65}
        height={65}
      />,
    )
  })
})

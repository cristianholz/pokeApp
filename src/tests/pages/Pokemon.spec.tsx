import { render, screen } from '@testing-library/react'

import { Pokemon as PokemonInterface } from '@/types'

import Pokemon, { getStaticProps } from '../../pages/pokemon/[name]'

const testPokemon = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
}

jest.mock('next/router', () => ({
  useRouter() {
    return {
      isFallback: false,
    }
  },
}))

describe('Pokémon page', () => {
  it('renders correctly', () => {
    render(<Pokemon pokemon={testPokemon as PokemonInterface} />)

    expect(screen.getByText(testPokemon.name)).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const response: any = await getStaticProps({
      params: { name: String(testPokemon.name) },
    })

    expect(response.props.pokemon.name).toEqual(testPokemon.name)
  })
})

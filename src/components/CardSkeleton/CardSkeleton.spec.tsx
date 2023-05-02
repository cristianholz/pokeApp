import { render, screen, waitFor } from '@testing-library/react'

import { PokemonCard } from '@/components'
import { usePokemon } from '@/hooks'

const pokemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  stats: [
    {
      base_stat: 45,
      effort: 1,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 30,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 20,
      effort: 0,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 20,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
}

jest.mock('@/hooks/usePokemon')

describe('PokémonCard component', () => {
  it('renders skeleton correctly', () => {
    const usePokemonMocked = jest.mocked(usePokemon)

    usePokemonMocked.mockReturnValueOnce({
      data: {},
      isLoading: true,
      error: false,
    } as any)

    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders correctly', async () => {
    const usePokemonMocked = jest.mocked(usePokemon)

    usePokemonMocked.mockReturnValueOnce({
      data: {
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          other: {
            dream_world: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg',
            },
          },
        },
        stats: [
          {
            base_stat: 45,
            effort: 1,
            stat: {
              name: 'hp',
              url: 'https://pokeapi.co/api/v2/stat/1/',
            },
          },
          {
            base_stat: 30,
            effort: 0,
            stat: {
              name: 'attack',
              url: 'https://pokeapi.co/api/v2/stat/2/',
            },
          },
          {
            base_stat: 35,
            effort: 0,
            stat: {
              name: 'defense',
              url: 'https://pokeapi.co/api/v2/stat/3/',
            },
          },
          {
            base_stat: 20,
            effort: 0,
            stat: {
              name: 'special-attack',
              url: 'https://pokeapi.co/api/v2/stat/4/',
            },
          },
          {
            base_stat: 20,
            effort: 0,
            stat: {
              name: 'special-defense',
              url: 'https://pokeapi.co/api/v2/stat/5/',
            },
          },
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: 'speed',
              url: 'https://pokeapi.co/api/v2/stat/6/',
            },
          },
        ],
        types: [
          {
            slot: 1,
            type: {
              name: 'grass',
            },
          },
        ],
      },
      isLoading: false,
      error: false,
    } as any)

    render(<PokemonCard pokemon={pokemon} />)

    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument(),
    )
  })
})

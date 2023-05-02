import { Ability } from './ability'
import { Move } from './move'
import { Other } from './other'
import { SimpleAttribute } from './simple-attribute'
import { Sprites } from './sprites'
import { Stat } from './stat'
import { Type } from './type'

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: SimpleAttribute[]
  moves: Move[]
  sprites: Sprites
  other: Other
  stats: Stat[]
  types: Type[]
}

export type GetPokemonListResponse = {
  count: number
  results: SimpleAttribute[]
  next?: string
  previous?: string
}

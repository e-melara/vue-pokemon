import pokemonApi from '../api/pokemonApi'

const getPokemons = () => {
  return Array.from(Array(650), (x, i) => i + 1)
}
const getPokemonNames = async (pokemons = []) => {
  const promisesPokemons = pokemons.map((pokemon) =>
    pokemonApi.get(`/${pokemon}`)
  )

  const [p1, p2, p3, p4] = await Promise.all(promisesPokemons)
  return [
    {
      name: p1.data.name,
      id: p1.data.id,
    },
    {
      name: p2.data.name,
      id: p2.data.id,
    },
    {
      name: p3.data.name,
      id: p3.data.id,
    },
    {
      name: p4.data.name,
      id: p4.data.id,
    },
  ]
}

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
  return pokemons
}

export default getPokemonOptions

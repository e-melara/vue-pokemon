<template>
  <h1 v-if="!pokemon">Espere por favor</h1>
  <div v-else>
    <h1>¿Quien es este pokemon?</h1>
    <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <pokemon-options :pokemonsArr="pokemonsArr" @selection="checkAnswer" />
  </div>
  <div v-if="showPokemon">
    <h2>{{ message }}</h2>
    <button class="fade-in" @click="newGame">Nuevo juego</button>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'

import getPokemonOptions from '../helpers/getPokemonOptions'

export default {
  name: 'PokemonPage',
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemon: null,
      message: null,
      pokemonsArr: [],
      showPokemon: false,
    }
  },
  methods: {
    async mixPokemonArray() {
      const rndInt = Math.floor(Math.random() * 4)

      this.pokemonsArr = await getPokemonOptions()
      this.pokemon = this.pokemonsArr[rndInt]
    },
    checkAnswer({ id }) {
      this.showPokemon = true
      if (id === this.pokemon.id) {
        this.message = `¡Correcto! ${this.pokemon.name}`
      } else {
        this.message = `Oops, era ${this.pokemon.name}`
      }
    },

    newGame() {
      this.showPokemon = false
      this.pokemonsArr = []
      this.mixPokemonArray()
    },
  },
  mounted() {
    this.mixPokemonArray()
  },
}
</script>

<style></style>

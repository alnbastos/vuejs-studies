<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  // Nome do componente.
  name: "BarraLateral",

  // Lista de emitir evento.
  emits: ["aoTemaAlterado"],

  // Estado do componente.
  data () {
    return {
      modoEscuroAtivo : false,
    }
  },

  // Propriedade computada.
  computed: {
    textoBotao () {
      if (this.modoEscuroAtivo) {
        return "Desativar Modo Escuro";
      }
      return "Ativar Modo Escuro";
    },
  },

  // Métodos do componente.
  methods: {
    alterarTema () {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    }
  }
});
</script>

<style scoped>
header {
  text-align: center;
  padding: 1rem;
  background: #e4e0a4;
  /* background: #0d3b66; */
  width: 100%;
  height: 100vh;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>

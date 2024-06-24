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

<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
    
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  text-align: center;
  padding: 1rem;
  background: #e4e0a4;
  /* background: #0d3b66; */
  width: 100%;
  height: 100vh;
}

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>

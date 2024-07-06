<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro' : modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
  // Nome do componente.
  name: "App",

  // Componentes filho.
  components: {
    BarraLateral,
    Notificacoes,
  },

  // Estado do componente.
  data() {
    return {
      modoEscuroAtivo: false,
    }
  },

  // Métodos do componente.
  methods: {
    trocarTema (modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}
main {
  --bg-primario: #FFF;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2B2D42;
  --texto-primario: #DDD;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>

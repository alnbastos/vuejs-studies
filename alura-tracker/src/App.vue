<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro' : modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="list">
        <!--  
          v-for, é um for inline (para cada tarefa em tarefas). 
          para fazer uma iteração utilizando o v-for, é preciso linkar
          a uma propriedade key (ela identifica o item da lista, para o vue poder saber
          quando ele vai ou não renderizar aquele componente denovo).
          Como não há um banco de nada e nem um ID de tarefa, é informado o indice
          da tarefa no key.
          :tarefa é o prop de DescricaoTarefa, e "tarefa" é o item do array tarefas.
        -->
        <DescricaoTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <!--
          v-if, renderização condicional. Só renderiza o BoxListaTarefa se
          existeTarefa for igual a zero.
        -->
        <BoxListaTarefa v-if="existeTarefa">
          Você não está produtivo hoje 😢
        </BoxListaTarefa>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioTarefa from "./components/FormularioTarefa.vue";
import DescricaoTarefa from "./components/DescricaoTarefa.vue";
import BoxListaTarefa from "./components/BoxListaTarefa.vue";
import ITarefa from "./intefaces/ITarefa";

export default defineComponent({
  // Nome do componente.
  name: "App",

  // Componentes filho.
  components: {
    BarraLateral,
    FormularioTarefa,
    DescricaoTarefa,
    BoxListaTarefa,
  },

  // Estado do componente.
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    }
  },

  // Propriedade computada.
  computed: {
    existeTarefa(): boolean {
      return this.tarefas.length === 0;
    }
  },

  // Métodos do componente.
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      // inverte a lista, sendo a tarefa mais recente (a última a ser incluída)
      // a primeira da lista.
      this.tarefas.unshift(tarefa);
    },
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

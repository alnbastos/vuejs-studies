<script lang="ts">
import { computed, defineComponent } from "vue";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import DescricaoTarefa from "../components/DescricaoTarefa.vue";
import BoxListaTarefa from "../components/BoxListaTarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/type-actions";

export default defineComponent({
  // Nome do componente.
  name: "TarefasTracker",

  // Componentes filho.
  components: {
    FormularioTarefa,
    DescricaoTarefa,
    BoxListaTarefa,
  },

  // Estado do componente.
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
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
      // this.tarefas.unshift(tarefa);
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    }
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    }
  },
});
</script>

<template>
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
    <DescricaoTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa" />
    <!--
      v-if, renderização condicional. Só renderiza o BoxListaTarefa se
      existeTarefa for igual a zero.
    -->
    <BoxListaTarefa v-if="existeTarefa">
      Você não está produtivo hoje 😢
    </BoxListaTarefa>

    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar tarefa</p>
          <button class="delete" aria-label="close" @click="fecharModal"></button>
        </header>
        <section class="modal-card-body">
          <label for="descricaoTarefa" class="label">Descrição</label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa" />
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success">Salvar</button>
            <button class="button" @click="fecharModal">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style></style>

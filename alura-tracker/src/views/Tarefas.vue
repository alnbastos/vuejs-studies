<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import DescricaoTarefa from "../components/DescricaoTarefa.vue";
import BoxListaTarefa from "../components/BoxListaTarefa.vue";
import ModalBox from "@/components/Modal.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/type-actions";

export default defineComponent({
  // Nome do componente.
  name: "TarefasTracker",

  // Componentes filho.
  components: {
    FormularioTarefa,
    DescricaoTarefa,
    BoxListaTarefa,
    ModalBox,
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
    },
    alterarTarefa() {
      console.log(this.tarefaSelecionada)
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");
    // const tarefas = computed(() => 
    //   store.state.tarefa.filter(
    //     (t: ITarefa) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      store,
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas),
    }
  },
});
</script>

<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />

  <div class="list">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

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

    <ModalBox :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:corpo>
        <label for="descricaoTarefa" class="label">Descrição</label>
        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa" />
      </template>
      <template v-slot:rodape>
        <div class="buttons">
          <button @click="alterarTarefa" class="button is-success">Salvar</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </div>
      </template>
    </ModalBox>
  </div>
</template>

<style></style>

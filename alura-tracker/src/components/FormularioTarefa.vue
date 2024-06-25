<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa.">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">{{ projeto.nome }}</option>
          </select>
        </div>
      </div>

      <div class="column">
        <TemporizadorTarefa @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import TemporizadorTarefa from "./TemporizadorTarefa.vue";

export default defineComponent({
  // Nome do componente.
  name: "FormularioTarefa",

  // Lista de emitir evento.
  emits: ["aoSalvarTarefa"],

  // Componentes filho.
  components: { TemporizadorTarefa },

  // Estado do componente.
  data() {
    return { descricao: "", idProjeto: "", }
  },

  // Métodos do componente.
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      // tempoDecorrido é o valor this.temporizador 
      // emitido lá do componente TemporizadorTarefa.
      // tempoDecorrido pode ser qualquer nome de variavel,
      // mas sempre terá o valor do tempo.


      // Dentro de emit, será executado o evento aoSalvarTarefa,
      // e irá passar os dados necessários dentro de {}.
      this.$emit("aoSalvarTarefa", {
        // duracaoEmSegundos e descricao são as declarações feitas
        // na interface, em ITarefa.
        // Esta referencia de aoSalvarTarefa e ITarefa, foi feito 
        // em salvarTarefa do App.vue.
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.idProjeto,
      });

      this.descricao = "";
    }
  },

  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>

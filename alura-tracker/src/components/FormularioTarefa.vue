<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa.">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>

      <div class="column">
        <TemporizadorTarefa @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    return { descricao: "", }
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
      });

      this.descricao = "";
    }
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>

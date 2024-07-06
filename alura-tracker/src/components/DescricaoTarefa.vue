<template>
  <BoxListaTarefa>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column">
        <!-- :temporizador="", link com uma variavel. -->
        <!-- temporizador="", apenas string. -->
        <CronometroTarefa :temporizador="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxListaTarefa>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import CronometroTarefa from "./CronometroTarefa.vue";
import BoxListaTarefa from "./BoxListaTarefa.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  // Nome do componente.
  name: "DescricaoTarefa",

  // Componentes filho.
  components: {
    CronometroTarefa,
    BoxListaTarefa,
  },

  // Propriedade do componente.
  props: {
    // Descrição da tarefa que será exibido.
    tarefa: {
      // tarefa é do tipo objeto, da inteface ITarefa
      // e ela é obrigatória.
      type: Object as PropType<ITarefa>,
      required: true,
    }
  },
});
</script>

<style></style>

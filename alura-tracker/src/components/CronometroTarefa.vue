<template>
  <section>
    <strong class="display">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // Nome do componente.
  name: "CronometroTarefa",

  // Propriedade do componente, o que ele irá receber.
  // Como se fosse o parametro de função "Cronometro"
  // ex: def cronometro(temporizador: int=0)
  props: {
    temporizador: {
      type: Number,
      default: 0,
    },
  },

  // Propriedade computada.
  computed: {
    tempoDecorrido(): string {
      return new Date(this.temporizador * 1000).toISOString().substr(11, 8);
    }
  },
});
</script>

<style>
.display {
  color: var(--texto-primario);
}
</style>

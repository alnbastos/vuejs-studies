<template>
  <div class="box has-text-weight-bold" :style="estilos">
    <!--
            O slot indica que será carregado mais tags/componentes
            dentro da div. O que estiver dentro do componente BoxListaTarefa, será
            renderizado pelo slot.
        -->
    <slot></slot>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // Nome do componente.
  name: "BoxListaTarefa",

  // Exemplo de estilo via componente.
  data () {
    return {
      estilos: {
        background: "#E4E0A4",

        // Formas de se declara quando o
        // estilo tem hifen.
        // "background-color": "#E4E0A4",
        // backgroundColor: "#E4E0A4",
      }
    }
  },
});
</script>

<!-- scope quer dizer que o css se aplica a -->
<!-- apenas este componente e seus filhos. -->
<!-- <style scoped>
.box {
  /* background: #FAF0CA; */
  background: #E4E0A4;
}
</style> -->

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <!-- CronometroTarefa recebe temporizador (:temporizador="") -->
    <!-- No caso, está recebendo o valor de temporizador definido em -->
    <!-- data() do componente FormularioTarefa. -->
    <CronometroTarefa :temporizador="temporizador" />

    <!-- @ ou v-on -> é usado para vincular eventos a métodos. -->
    <!-- : ou v-bind -> é usado para vincular dinamicamente valores de propriedades HTML a expressões Vue. -->
    <BotoesTarefa @clicked="iniciar" :disabled="cronometroRodando" text="play" icon="fas fa-play" />
    <BotoesTarefa @clicked="finalizar" :disabled="!cronometroRodando" text="stop" icon="fas fa-stop" />
    <!-- <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button> -->
    <!-- <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CronometroTarefa from "./CronometroTarefa.vue";
import BotoesTarefa from "./BotoesTarefa.vue";

export default defineComponent({
  // Nome do componente.
  name: "TemporizadorTarefa",

  // Emitir um evento (emit), pode ser uma lista de eventos.
  // Coomunicação de Filho para Pai/
  emits: ["aoTemporizadorFinalizado"],

  // Componentes filho.
  components: {
    CronometroTarefa,
    BotoesTarefa,
  },

  // Estado do componente.
  data() {
    return {
      temporizador: 0,
      cronometro: 0,
      cronometroRodando: false,
    }
  },

  // Métodos do componente.
  methods: {
    iniciar() {
      // Começa a contagem (1s = 1000ms).
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => { this.temporizador += 1 }, 1000);
    },
    finalizar() {
      // Finaliza a contagem.
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.temporizador);
      this.temporizador = 0;
    }
  }
});
</script>

<style></style>

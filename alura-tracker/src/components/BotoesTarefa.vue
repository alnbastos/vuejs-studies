<template>
  <button class="button" @click="clicked" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // Nome do componente.
  name: "BotoesTarefa",

  // Lista de emitir evento.
  emits: ["clicked"],

  // Propriedades do componente.
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
    },
    icon: {
      type: String,
    },
  },

  // Métodos do componente.
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  },
});
</script>

<style></style>

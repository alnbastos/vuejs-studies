<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "NotificacoesTracker",
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: "is-success",
        [TipoNotificacao.ATENCAO]: "is-warning",
        [TipoNotificacao.ERRO]: "is-danger",
      }
    }
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    }
  }
});
</script>

<template>
  <div class="notificacoes">
    <article v-for="notificacao in notificacoes" :key="notificacao.id" :class="['message', contexto[notificacao.tipo]]">

      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>

      <div class="message-body">
        {{ notificacao.texto }}
      </div>

    </article>

  </div>
</template>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>

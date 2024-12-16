<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useNotificador } from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/type-actions";

export default defineComponent({
  name: "FormularioProjetos",
  props: {
    id: { type: String }
  },
  mounted() {
    // Quando o componente estiver montado...
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id);
      this.nomeProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeProjeto: "",
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return { store, notificar, }
  },
  methods: {
    salvar() {
      if (this.id) {
        // Editar o nome do projeto
        this.store.dispatch(ALTERAR_PROJETO, { id: this.id, nome: this.nomeProjeto })
          .then(() => this.lidarComSucesso());
      } else {
        // Salvar o nome do projeto
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      // useNotificador, Hook
      this.notificar(
        "Projeto adicionado!",
        "Prontinho 🫡 O projeto já está disponível.",
        TipoNotificacao.SUCESSO,
      )
      this.nomeProjeto = "";
      this.$router.push("/projetos");
    },
  }
});
</script>

<template>
  <section class="projetos">

    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto" />
      </div>

      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>

  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>

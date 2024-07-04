<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ALTERA_PROJETO, ADICIONA_PROJETO } from "@/store/type-mutations";

export default defineComponent({
  name: "FormularioProjetos",
  props: {
    id: { type: String }
  },
  mounted() {
    // Quando o componente estiver montado...
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
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
    return { store }
  },
  methods: {
    salvar() {
      if (this.id) {
        // Editar o nome do projeto
        this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeProjeto });
      } else {
        // Salvar o nome do projeto
        this.store.commit(ADICIONA_PROJETO, this.nomeProjeto);
      }
      this.nomeProjeto = "";
      this.$router.push("/projetos");
    }
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

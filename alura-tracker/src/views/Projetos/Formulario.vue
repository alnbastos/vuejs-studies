<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "FormularioProjetos",
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
      // Salvar o nome do projeto
      this.store.commit("ADICIONA_PROJETO", this.nomeProjeto);
      this.nomeProjeto = "";
      this.$router.push("/projetos");
    }
  }
});
</script>

<template>
  <section class="projetos">
    <h1>Projetos</h1>

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

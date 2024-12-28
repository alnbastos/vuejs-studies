<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/type-actions";

export default defineComponent({
  name: "ListaProjetos",
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETO, id);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    }
  },
});
</script>

<template>
  <section class="projetos">

    <router-link to="/projetos/criar" class="button">
      <span class="icon is-small">
        <i class="fas fas-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-pen"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
        <tr v-if="!projetos.length">
          <td colspan="3" class="has-text-centered">
            Não há projeto(s) cadastrado(s) ainda.
          </td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<style scoped></style>

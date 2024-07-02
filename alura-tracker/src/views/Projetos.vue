<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "ProjetosTracker",
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projetos),
    }
  },
});
</script>

<template>
  <section class="projetos">
    <h1>Projetos</h1>

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
          <th>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fas-pencil-alt"></i>
              </span>
            </router-link>
          </th>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>

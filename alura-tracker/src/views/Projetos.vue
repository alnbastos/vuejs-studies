<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjetosTracker"
});
</script>

<template>
  <section class="projetos">
    <h1>Projetos</h1>
    <router-view></router-view>
  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>

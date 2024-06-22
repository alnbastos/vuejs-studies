<script lang="ts">
// Tipagem
import type { PropType } from 'vue';
import type IReceita from '@/interfaces/IReceitas';

// Funções
import { itensDeLista1EstaoEmLista2 } from '@/operations/listas';
import { obterReceitas } from '@/http/index';

// Componentes
import CardReceitas from './CardReceitas.vue';
import BotaoPrincipal from './BotaoPrincipal.vue';

export default {
  props: {
    ingredientes: { type: Array as PropType<string[]>, required: true },
  },
  components: { CardReceitas, BotaoPrincipal },
  data() {
    return {
      receitas: [] as IReceita[],
    }
  },
  async created() {
    const receitas = await obterReceitas();
    this.receitas = receitas.filter((receita) => {
      // O parâmetro receita, trás o dict de cada receita do array.

      // Lógica que verifica se posso fazer receita:
      // Todos os ingredientes de uma receita devem estar inclusos na minha
      // lista de ingredientes selecionados. Se sim, devemos retornar `true`.
      const possoFazerReceita = itensDeLista1EstaoEmLista2(
        receita.ingredientes,
        this.ingredientes,
      )
      return possoFazerReceita;
    });
  },
  emits: ['editarReceitas', ],
}
</script>

<template>
  <section class="mostrar-receitas">
    <h1 class="cabecalho titulo-receitas">Receitas</h1>

    <p class="paragrafo-lg resultados-encontrados">
      Resultados encontrados: {{ receitas.length }}
    </p>

    <div v-if="receitas.length" class="receitas-wrapper">
      <p class="paragrafo-lg informacoes">
        Veja as opções de receitas que encontramos com os ingredientes que você tem por ai!
      </p>

      <ul class="receitas">
        <li v-for="receita in receitas" :key="receita.nome">
          <CardReceitas :receita="receita"/>
        </li>
      </ul>
    </div>

    <div v-else class="receitas-nao-encontradas">
      <p class="paragrafo-lg receitas-nao-encontradas__info">
        Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
      </p>
    
      <img src="/src/assets/images/sem-receitas.png"
        alt="Desenho de um ovo quebrado. A gema tem um rosto com uma expressão triste.">
    </div>

  
    <BotaoPrincipal texto="Editar lista" v-on:click="$emit('editarReceitas')"/>
  </section>
</template>

<style scoped>
.mostrar-receitas {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.titulo-receitas {
  color: var(--verde-medio, #3D6D4A);
  margin-bottom: 1.5rem;
}

.resultados-encontrados {
  color: var(--verde-medio, #3D6D4A);
  margin-bottom: 0.5rem;
}

.receitas-wrapper {
  margin-bottom: 3.5rem;
}

.informacoes {
  margin-bottom: 2rem;
}

.receitas {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.receitas-nao-encontradas {
  margin-bottom: 2rem;
}

.receitas-nao-encontradas__info {
  margin-bottom: 0.5rem;
}

@media only screen and (max-width: 767px) {
  .receitas-wrapper {
    margin-bottom: 2rem;
  }
}
</style>

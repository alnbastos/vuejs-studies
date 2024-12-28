import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";

import { EstadoProjeto, moduloProjeto } from "./modules/projeto";
import { EstadoTarefa, moduloTarefa } from "./modules/tarefa";
import { INotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "./type-mutations";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa,
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: { projetos: [] },
        tarefa: { tarefas: [] },
    },
    mutations: {
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);

            setTimeout(() => {
                // Remove a notificação após 3 segundos.
                state.notificacoes = state.notificacoes.filter(
                    not => not.id != notificacao.id
                );
            }, 3000);
        },
    },
    modules: {
        projeto: moduloProjeto,
        tarefa: moduloTarefa,
    }
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

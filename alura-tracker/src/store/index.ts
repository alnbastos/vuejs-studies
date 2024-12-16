import http from "@/http";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";
import { INotificacao } from "@/interfaces/INotificacao";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./type-mutations";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./type-actions";
import { EstadoProjeto, moduloProjeto } from "./modules/projeto";
import ITarefa from "@/interfaces/ITarefa";

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefas: [],
        projeto: { projetos: [] },
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
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
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            http.get("tarefas")
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post("/tarefas", tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(tarefa => commit(ALTERA_TAREFA, tarefa));
        },
    },
    modules: {
        projeto: moduloProjeto,
    }
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

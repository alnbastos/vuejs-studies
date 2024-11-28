import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";
import IProjeto from "@/interfaces/IProjetos";
import { INotificacao } from "@/interfaces/INotificacao";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUI_PROJETO, NOTIFICAR } from "./type-mutations";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./type-actions";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    tarefas: ITarefa[],
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
        tarefas: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto,
            };
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
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
        [OBTER_PROJETOS]({ commit }) {
            http.get("projetos")
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post("/projetos", { nome: nomeDoProjeto });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUI_PROJETO, id));
        },
        [OBTER_TAREFAS]({ commit }) {
            http.get("tarefas")
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post("/tarefas", tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data));
        },
    },
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

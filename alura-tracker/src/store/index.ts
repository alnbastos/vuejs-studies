import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";
import IProjeto from "@/interfaces/IProjetos";
import { INotificacao } from "@/interfaces/INotificacao";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUI_PROJETO, NOTIFICAR } from "./type-mutations";
import { OBTER_PROJETOS } from "./type-actions";
import http from "@/http";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
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
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);

            setTimeout(()=>{
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
    },
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

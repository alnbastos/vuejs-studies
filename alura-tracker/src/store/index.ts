import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";
import IProjeto from "@/interfaces/IProjetos";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./type-mutations";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [
            {
                id: 1,
                tipo: TipoNotificacao.SUCESSO,
                titulo: "Título para a notificação de sucesso!",
                texto: "Texto para a notificação de sucesso!",
            },
            {
                id: 2,
                tipo: TipoNotificacao.ATENCAO,
                titulo: "Título para a notificação de atencao!",
                texto: "Texto para a notificação de atencao!",
            },
            {
                id: 3,
                tipo: TipoNotificacao.ERRO,
                titulo: "Título para a notificação de erro!",
                texto: "Texto para a notificação de erro!",
            },
        ]
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
        }
    },
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

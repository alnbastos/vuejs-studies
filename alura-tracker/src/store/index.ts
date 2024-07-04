import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUserStore } from "vuex";
import IProjeto from "@/interfaces/IProjetos";

interface Estado {
    projetos: IProjeto[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: {
        "ADICIONA_PROJETO"(state, nomeProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto,
            };
            state.projetos.push(projeto);
        },
        "ALTERA_PROJETO"(state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        }
    },
});

export function useStore(): Store<Estado> {
    return vuexUserStore(key);
}

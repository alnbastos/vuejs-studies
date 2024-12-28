import http from "@/http";
import IProjeto from "@/interfaces/IProjetos";
import { Estado } from "../..";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/type-actions";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, DEFINIR_PROJETOS } from "@/store/type-mutations";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const moduloProjeto: Module<EstadoProjeto, Estado> = {
    state: {
        projetos: [],
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
    },
}

import http from "@/http";
import { Module } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/type-mutations";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/type-actions";
import { Estado } from "../..";
import ITarefa from "@/interfaces/ITarefa";

export interface EstadoTarefa {
    tarefas: ITarefa[],
}

export const moduloTarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
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
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = "tarefas"

            if (filtro) {
                url += "?descricao=" + filtro
            }

            http.get(url)
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
}
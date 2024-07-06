import { store } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/type-mutations";

// Definição de um tipo personalizado
// O tipo Notificador, deve retornar uma função chamada `notificar` com os parâmetros definidos.
type Notificador = {
    // nofiticar é uma função com os seguintes parâmetros, e que retorna void.
    notificar: (titulo: string, texto: string, tipo: TipoNotificacao) => void
}

export function useNotificador(): Notificador {
    const notificar = (titulo: string, texto: string, tipo: TipoNotificacao) : void => {
        store.commit(NOTIFICAR, {titulo, texto, tipo,});
    };
    return { notificar };
}

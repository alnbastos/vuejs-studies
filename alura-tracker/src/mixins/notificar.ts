import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/type-mutations";

export const NotificarMixin = {
    methods: {
        notificar(titulo: string, texto: string, tipo: TipoNotificacao) : void {
            store.commit(NOTIFICAR, {titulo, texto, tipo,});
        }
    }
}

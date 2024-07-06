export enum TipoNotificacao {
    SUCESSO,
    ATENCAO,
    ERRO,
}

export interface INotificacao {
    id: number,
    tipo: TipoNotificacao,
    titulo: string,
    texto: string,
}

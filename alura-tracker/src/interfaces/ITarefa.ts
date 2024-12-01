import IProjeto from "./IProjetos";

export default interface ITarefa {
    id: number,
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto,
}

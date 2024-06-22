import type ICategoria from "@/interfaces/ICategorias";
import type IReceita from "@/interfaces/IReceitas";

// O tipo T é um tipo genérico, permite criar componentes/funções
// que podem trabalhar com qualquer tipo de dados.
async function obterDadosURL<T>(url: string) {
  const resposta = await fetch(url);
  return resposta.json() as T;
}

export async function obterCategorias() {
  const url = "https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/categorias.json";
  return obterDadosURL<ICategoria[]>(url);
}

export async function obterReceitas() {
  const url = "https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/receitas.json";
  return obterDadosURL<IReceita[]>(url);
}

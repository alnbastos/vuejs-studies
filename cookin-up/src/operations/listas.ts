export function itensDeLista1EstaoEmLista2(lista1: unknown[], lista2: unknown[]) {
    // lista1: é a lista de ingredientes de cada receita.
    // lista2: é a lista de ingredientes selecionados.
    return lista1.every((itemLista1) => lista2.includes(itemLista1));
};

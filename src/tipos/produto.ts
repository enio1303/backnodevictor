export type Produto = {
    id: string;
    titulo: string;
    descricao: string;
    preco: number;
    estoque: number;
    foto: string | undefined;
    categoria: string;
    usuario_id: number;
}

export type NovoProduto = Omit<Produto, 'id'>
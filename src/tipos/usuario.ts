export type Usuario = {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

export type UsuarioPerfil = Omit<Usuario, 'senha'>
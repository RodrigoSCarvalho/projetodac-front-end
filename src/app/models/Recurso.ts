import { PalavrasChave } from "./PalavrasChave";

export class Recurso {
    'id': number;
    'palavras_chave'?: PalavrasChave[];
    'titulo'?: string;
    'descricao'?: string;
    'link'?: string;
    'imagem'?: string;
    'data_criacao': string;
    'data_registro': string;
  }

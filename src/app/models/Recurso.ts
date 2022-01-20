import { PalavraChaves } from "./PalavrasChave";

export class Recurso {
    'id': number;
    'palavras_chave'?: PalavraChaves[];
    'titulo'?: string;
    'descricao'?: string;
    'link'?: string;
    'imagem'?: string;
    'data_criacao'?: string;
    'data_registro'?: string;
  }

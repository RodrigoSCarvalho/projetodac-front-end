import { Recurso } from "./Recurso";

export class Autor {
    'id': number;
    'orcid'?: string;
    'recursos'?: Recurso[];
    'nome'?: string;
    'sobrenome'?: string;
    'email'?: string;
    'afiliacao'?: string;
  }

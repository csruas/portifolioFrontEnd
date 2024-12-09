import { Acessorio } from './acessorio';
import { Marca } from "./marcas";

export class Carro {
  id!: number;
  nome!: string;
  marca!: Marca;
  acessorios: Acessorio[] = [];

  constructor(nome: string){
    this.nome = nome;
  }

}

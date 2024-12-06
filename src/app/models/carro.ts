import { Marca } from "./marcas";

export class Carro {
  id!: number;
  nome!: string;
  marca!: Marca;

  constructor(nome: string){
    this.nome = nome;
  }

}

import { RouterLink } from '@angular/router';
import { Carro } from './../../../models/carro';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


import { Marca } from '../../../models/marcas';
import { MarcaService } from '../../../services/marca.service';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {
  lista: Marca[] = [];
  marcaEdit: Marca = new Marca("");

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();


   //Elementos base para ter uma modal
   modalService = inject(MdbModalService);
   @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
   modalref!: MdbModalRef<any>;

   marcaService = inject(MarcaService);


  constructor(){
    this.listAll();

   let marcaNova    =  history.state.marcaNova;
   let marcaEditada =  history.state.marcaEditada;

   if(marcaNova != null){
    marcaNova.id = 330;
    this.lista.push(marcaNova)
   }else if(marcaEditada != null){
    let indice =  this.lista.findIndex( x => { return x.id == marcaEditada.id });
    this.lista[indice] = marcaEditada;
   }
  }

  listAll(){
    this.marcaService.findAll().subscribe({
      next: lista => {// quando o back retornar oque se espera
        this.lista = lista;
      },
      error: err => {// quando tiver um erro
        Swal.fire({
          title: 'Ocorreu um ao Lista marcas',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    });
  }
  deleteById(marca: Marca){

    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "NÃO"
      }).then((result) =>{
        if(result.isConfirmed){

          this.marcaService.delete(marca.id).subscribe({
            next: mensagem => {// quando o back retornar oque se espera
              Swal.fire({
                title: mensagem,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'ok'
              });

              this.listAll();
            },
            error: err => {// quando tiver um erro
              Swal.fire({
                title: 'Ocorreu um erro ',
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'ok'
              });
            }
          });


         /* let indice =  this.lista.findIndex( x => { return x.id == marca.id });
          this.lista.splice(indice, 1);

          Swal.fire({
            title: "Deletado com Sucesso",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          }); */


          }
        })
  }

  newMarca(){
    this.marcaEdit = new Marca("");
   this.modalref =  this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca:Marca){
    this.marcaEdit = Object.assign({}, marca); //clonando o objeto para ser editado
    this.modalref =  this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalheMarca(marca:Marca){

      this.listAll();
      this.modalref.close();
  }

  select(marca:Marca){
      this.retorno.emit(marca);
  }

}

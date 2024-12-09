import { Acessorio } from './../../../models/acessorio';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessoriodetailsComponent } from '../acessoriodetails/acessoriodetails.component';

@Component({
  selector: 'app-acessoriolist',
  standalone: true,
  imports: [MdbModalModule, AcessoriodetailsComponent],
  templateUrl: './acessoriolist.component.html',
  styleUrl: './acessoriolist.component.scss'
})
export class AcessoriolistComponent {
  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio("");

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //Elementos base para ter uma modal
  modalService = inject(MdbModalService);
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalref!: MdbModalRef<any>;

  acessorioService = inject(AcessorioService);

  constructor(){
    this.listAll();

    let acessorioNovo    =  history.state.acessorioNovo;
    let acessorioEditado =  history.state.acessorioEditado;

    if(acessorioNovo != null){
      acessorioNovo.id = 330;
     this.lista.push(acessorioNovo)
    }else if(acessorioEditado != null){
     let indice =  this.lista.findIndex( x => { return x.id == acessorioEditado.id });
     this.lista[indice] = acessorioEditado;
    }
  }

  listAll(){
    this.acessorioService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: err => {// quando tiver um erro
        Swal.fire({
          title: 'Ocorreu um ao Lista acessório',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    });
  }

  newAcessorio(){
    this.acessorioEdit = new Acessorio("");
   this.modalref =  this.modalService.open(this.modalAcessorioDetalhe);

  }

  edit(acessorio: Acessorio){
    this.acessorioEdit = Object.assign({}, acessorio); //clonando o objeto para ser editado
    this.modalref =  this.modalService.open(this.modalAcessorioDetalhe);

  }
  deleteById(acessorio: Acessorio){

    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "NÃO"
      }).then((result) =>{
        if(result.isConfirmed){

          this.acessorioService.delete(acessorio.id).subscribe({
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

          }
        })

  }

  new(){
    this.modalref = this.modalService.open(this.modalAcessorioDetalhe);
   }


  retornoDetalheMarca(acessorio: Acessorio){
    this.listAll();
    this.modalref.close();
  }

  select(acessorio: Acessorio){
    this.retorno.emit(acessorio);
  }

}

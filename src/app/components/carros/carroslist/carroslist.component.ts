import { RouterLink } from '@angular/router';
import { Carro } from './../../../models/carro';
import { Component, inject, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent, MarcaslistComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {


  lista: Carro[] = [];
  carroEdit: Carro = new Carro("");

  //Elementos base para ter uma modal
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalref!: MdbModalRef<any>;

  carrosService = inject(CarroService);

  constructor(){
    this.listAll();


     let carroNovo = history.state.carroNovo;
     let carroEditado = history.state.carroEditado;

    if(carroNovo != null){
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }
    if(carroEditado != null){
      let indice = this.lista.findIndex( x=> {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }
  }

  listAll(){
    this.carrosService.findAll().subscribe({
      next: lista => {// quando o back retornar oque se espera
        this.lista = lista;
      },
      error: err => {// quando tiver um erro
        Swal.fire({
          title: 'Ocorreu um ao Lista os carros ',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    });
  }

  deleteById(carro: Carro){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "NÃO"
      }).then((result) =>{
      if(result.isConfirmed){


        this.carrosService.delete(carro.id).subscribe({
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


        // percorendo a lista e comparando o ID
       // let indice = this.lista.findIndex( x=> {return x.id == carro.id})
       // this.lista.splice(indice, 1);



      }
    })
  }

  new(){
   this.carroEdit = new Carro('');
   this.modalref = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro); // clonando para evitar referencia de objeto
    this.modalref = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    /*if(carro.id > 0){
      let indice = this.lista.findIndex( x => { return x.id == carro.id});
      this.lista[indice] = carro;
    }else {
      carro.id = 55;
      this.lista.push(carro);
    }
      */
    this.listAll();
    this.modalref.close();
  }

}

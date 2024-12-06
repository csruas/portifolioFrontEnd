import { Marca } from './../../../models/marcas';
import { Carro } from './../../../models/carro';
import { routes } from './../../../app.routes';
import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';
import Swal from 'sweetalert2'
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

 @Input("carro") carro: Carro = new Carro("");
 @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  carroService = inject(CarroService);

    //Elementos base para ter uma modal
    modalService = inject(MdbModalService);
    @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
    modalref!: MdbModalRef<any>;

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findByID(id);
    }
  }

  findByID(id: number){
    this.carroService.findById(id).subscribe({
      next: retorno =>{
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu ao buscar o nome  ',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    })
  }

  salvar(){

    if(this.carro.id > 0){

     this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });

          this.router2.navigate(['admin/carros'], {state: {carroEditado: this.carro}})
          this.retorno.emit(this.carro)
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro ',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });
          this.retorno.emit(this.carro)
        }
      })


    }else{
      this.carroService.save(this.carro).subscribe({

        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['admin/carros'], {state: {carroNovo: this.carro}})
          this.retorno.emit(this.carro)
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro Ao Salvar o carro',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'ok'
          });

          this.retorno.emit(this.carro)
        }
      })


    }


  }

  buscarMarcas(){
    this.modalref = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'} );
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalref.close();
  }
}

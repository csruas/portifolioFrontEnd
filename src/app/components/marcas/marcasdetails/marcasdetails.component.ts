import { MarcaService } from './../../../services/marca.service';
import { Component, EventEmitter, inject, Input, makeStateKey, output, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marcas';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca") marca: Marca = new Marca("");
  @Output("retorno") retorno = new EventEmitter<any>();
    //acessando a rota
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  marcaService = inject(MarcaService);

  constructor(){
    let id = this.router.snapshot.params['id'];

    if(id > 0 ){
      this.findbyId(id);
    }

  }

  findbyId(id: number){
    // busca back-end

    //let marcaRetonada: Marca = new Marca(id, '');
    //this.marca = marcaRetonada;

    this.marcaService.findById(id).subscribe({
      next: retorno =>{
        this.marca = retorno;
      },
      error : erro => {
        Swal.fire({
          title: 'Ocorreu um erro ',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });

      }
    });

  }

save(){
  if(this.marca.id > 0){
   this.marcaService.update(this.marca, this.marca.id).subscribe({
      next: mensagem =>{
        Swal.fire({
          title: mensagem,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });

        this.router2.navigate(['admin/marcas'], {state: { marcaEditada: this.marca}});
        this.retorno.emit(this.marca);
      },
      error : erro => {
        Swal.fire({
          title: 'Ocorreu um erro ',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    });
  }else{
    this.marcaService.save(this.marca).subscribe({
      next: mensagem =>{
        Swal.fire({
          title: mensagem,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
        this.router2.navigate(['admin/marcas'], {state: {marcaEditada: this.marca}})
        this.retorno.emit(this.marca)
      },
      error : erro => {
        Swal.fire({
          title: 'Ocorreu um erro ',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok'
        });
      }
    });
    this.retorno.emit(this.marca);

  }


}

}

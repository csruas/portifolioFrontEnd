import { MarcaService } from './../../../services/marca.service';
import { AcessorioService } from './../../../services/acessorio.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessoriodetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriodetails.component.html',
  styleUrl: './acessoriodetails.component.scss'
})
export class AcessoriodetailsComponent {
  lista: Acessorio[] = [];

  @Input("acessorio") acessorio: Acessorio = new Acessorio("");
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  acessorioService = inject(AcessorioService);

  constructor(){
     this.lista.push(new Acessorio('brinquedo'))
  }

  save(){

    if(this.acessorio.id > 0){

      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
         next: mensagem =>{
           Swal.fire({
             title: mensagem,
             icon: 'success',
             showConfirmButton: true,
             confirmButtonText: 'ok'
           });

           this.router2.navigate(['admin/acessorio'], {state: { acessorioEditado: this.acessorio}});
           this.retorno.emit(this.acessorio);
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
      console.log("salvando");

       this.acessorioService.save(this.acessorio).subscribe({
         next: mensagem =>{
           Swal.fire({
             title: mensagem,
             icon: 'success',
             showConfirmButton: true,
             confirmButtonText: 'ok'
           });
           this.router2.navigate(['admin/acessorio'], {state: {acessorioNovo: this.acessorio}})
           this.retorno.emit(this.acessorio)
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
       this.retorno.emit(this.acessorio);

     }

  }

}

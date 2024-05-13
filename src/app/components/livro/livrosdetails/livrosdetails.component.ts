import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Livro } from '../../../models/livro';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {
  @Input("livro") livro: Livro = new Livro(); 
  @Output("retorno") retorno: EventEmitter<any> = new EventEmitter(); 


  router = inject(Router);

  constructor() { 
  }

  save() {
    
    Swal.fire('Livro salvo com sucesso!', '', 'success');
  
    this.retorno.emit(this.livro);
  
    this.router.navigate(['admin/livros']);
  }
  
  
}

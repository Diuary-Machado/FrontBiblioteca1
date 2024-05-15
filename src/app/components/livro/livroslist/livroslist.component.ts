import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    LivrosdetailsComponent
  ],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {
  modalService = inject(MdbModalService); 
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>; 
  modalRef!: MdbModalRef<any>; 

  lista: Livro[] = [];
  livroEdit!: Livro;

  livroService = inject(LivroService);

  constructor() {
    this.listAll();
    
    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if (livroNovo != null) {
      livroNovo.id = 555;
      this.lista.push(livroNovo);
    }

    if (livroEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == livroEditado.id;
      });
      if (indice !== -1) {
        this.lista[indice] = livroEditado;
      }
    }
  }

  listAll() {
    this.livroService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('A lista de livros não pôde ser carregada.');
      }
    });
  }
  
  
  new() {
    this.livroEdit = new Livro();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }


  edit(livro: Livro) {
    this.livroEdit = Object.assign({}, livro); 
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }


  deleteById(livro: Livro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.livroService.delete(livro.id).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: erro => {
            
            console.log(erro);
            Swal.fire({
              title: 'Deu algum erro!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }
  
  
  retornoDetalhe(livro: Livro) {

    this.listAll();

    this.modalRef.close();
  }
}





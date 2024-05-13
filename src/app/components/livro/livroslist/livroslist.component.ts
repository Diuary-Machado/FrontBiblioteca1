import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';

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


  constructor() {
    this.findAll();
  }

  findAll() {
    let livro1 = new Livro();
    livro1.id = 1;
    livro1.nome = 'A Origem ';
    livro1.autor = 'Machado de Assis';
    livro1.editora = 'Record';
  
    let livro2 = new Livro();
    livro2.id = 2;
    livro2.nome = 'O Poder do Hábito';
    livro2.autor = 'Agatha Christie';
    livro2.editora = 'Editora Globo';
  
    let livro3 = new Livro();
    livro3.id = 3;
    livro3.nome = 'A Culpa é das Estrelas';
    livro3.autor = 'Stephen King';
    livro3.editora = 'Companhia das Letras';
  
    this.lista.push(livro1);
    this.lista.push(livro2);
    this.lista.push(livro3);
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
      title: 'Deseja realmente deletar este objeto?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex((livroItem) => {
          return livroItem.id === livro.id;
        });
  
        this.lista.splice(indice, 1);
  
        Swal.fire('Livro deletado com sucesso!', '', 'success');
      }
    });
  }
  
  retornoDetalhe(livro: Livro) {
    if (this.livroEdit.id > 0) {
        let indice = this.lista.findIndex((livroItem) => {
            return livroItem.id === this.livroEdit.id;
        });
        this.lista[indice] = livro;
    } else {
        livro.id = Math.floor(Math.random() * 47) + 4; 
        this.lista.push(livro);
    }
    this.modalRef.close();
}



}

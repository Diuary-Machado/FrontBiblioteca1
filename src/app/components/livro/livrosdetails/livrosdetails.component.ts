import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Livro } from '../../../models/livro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LivroService } from '../../../services/livro.service';


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

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  livroService = inject(LivroService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

   findById(id: number){


    this.livroService.findById(id).subscribe({
      next: livro => {
        this.livro = livro;
      },
      error: erro => {
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Deu algum erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } );

  }

  save() {
    if (this.livro.autorNome && this.livro.editoraNome) {
        if (this.livro.id > 0) {
            this.livroService.update(this.livro).subscribe({
                next: retorno => {
                    Swal.fire({
                        title: 'Editado com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.router2.navigate(['admin'], { state: { livroNovo: this.livro } });
                    this.retorno.emit(this.livro);
                },
                error: erro => {
                    alert(erro.status);
                    console.log(erro);
                    Swal.fire({
                        title: 'Deu algum erro!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        } else {
            this.livroService.save(this.livro).subscribe({
                next: retorno => {
                    Swal.fire({
                        title: 'Salvo com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    this.router2.navigate(['admin'], { state: { livroNovo: this.livro } });
                    this.retorno.emit(this.livro);
                },
                error: erro => {
                    alert(erro.status);
                    console.log(erro);
                    Swal.fire({
                        title: 'Deu algum erro!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    } else {
        Swal.fire({
            title: 'Erro ao salvar!',
            text: 'Por favor, preencha o nome do autor e da editora.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}


  
}

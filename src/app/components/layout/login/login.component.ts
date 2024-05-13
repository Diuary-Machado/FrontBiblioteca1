import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
    login!: string;
    senha!: string;
  
    router = inject(Router);


    logar() {
      if (this.login === 'admin' && this.senha === 'admin') {
        Swal.fire('Seja bem-vindo, administrador!', '', 'success');
        this.router.navigate(['admin']);
      } else {        
         Swal.fire({
          icon: 'error',
          title: 'Erro de login',
          text: 'Login ou senha incorretos.'
        });
      }
    }
}

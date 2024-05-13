import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LivroslistComponent } from './components/livro/livroslist/livroslist.component';
import { LivrosdetailsComponent } from './components/livro/livrosdetails/livrosdetails.component';
import { EditoraComponent } from './components/editora/editora.component';
import { AutorComponent } from './components/autor/autor.component';

export const routes: Routes = [
   { path: "", redirectTo: "login", pathMatch: 'full' },
   { path: "login", component: LoginComponent },
   { path: "admin", component: PrincipalComponent, children: [
      { path: "", component: LivroslistComponent },
      { path: "livros/new", component: LivrosdetailsComponent },
      { path: "livros/edit/:id", component: LivrosdetailsComponent },
      { path: "editoras", component: EditoraComponent },
      { path: "autores", component: AutorComponent }
   ]}
];

import { Routes } from '@angular/router';
import { HomeComponent }             from './home/home.component'; 
import { GestionRecetteComponent }   from './gestion-recette/gestion-recette.component';
import { AjoutRecetteComponent }     from './ajout-recette/ajout-recette.component';
import { DetailRecetteComponent }    from './detail-recette/detail-recette.component';
import { EditRecetteComponent }      from './edit-recette/edit-recette.component';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { AjoutCategorieComponent }   from './ajout-categorie/ajout-categorie.component';
import { EditCategorieComponent }    from './edit-categorie/edit-categorie.component';
import { LoginComponent }            from './login/login.component';
import { AuthGuard }                 from './guards/auth.guard';

export const routes: Routes = [
  { path: '',                    redirectTo: 'login',   pathMatch: 'full' },
  { path: 'login',               component: LoginComponent },
  { path: 'home',                component: HomeComponent }, 
  { path: 'liste',               component: GestionRecetteComponent },
  { path: 'ajouter',             component: AjoutRecetteComponent,    canActivate: [AuthGuard] },
  { path: 'detail/:id',          component: DetailRecetteComponent },
  { path: 'edit/:id',            component: EditRecetteComponent,     canActivate: [AuthGuard] },
  { path: 'categories',          component: GestionCategorieComponent, canActivate: [AuthGuard] },
  { path: 'categories/ajouter',  component: AjoutCategorieComponent,  canActivate: [AuthGuard] },
  { path: 'categories/edit/:id', component: EditCategorieComponent,   canActivate: [AuthGuard] },
  { path: '**',                  redirectTo: 'login' }
];
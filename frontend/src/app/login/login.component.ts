import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si déjà connecté → redirect
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/liste']);
    }

    this.formLogin = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.formLogin.invalid) return;

    this.authService.login(this.formLogin.value).subscribe(
      data => {
        this.authService.saveToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        Swal.fire({
          title: 'Bienvenue !',
          text: `Bonjour ${data.user.nom}`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/liste']);
      },
      err => {
        Swal.fire({
          title: 'Erreur !',
          text: err.error.message,
          icon: 'error'
        });
      }
    );
  }
}
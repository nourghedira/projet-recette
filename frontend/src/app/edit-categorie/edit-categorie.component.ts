import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-categorie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-categorie.component.html',
  styleUrl: './edit-categorie.component.css'
})
export class EditCategorieComponent implements OnInit {

  formCategorie!: FormGroup;
  submitted: boolean = false;
  categorieId: string = '';

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formCategorie = this.fb.group({
      nom:         ['', Validators.required],
      description: ['']
    });

    this.categorieId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.categorieService.getCategorieById(this.categorieId).subscribe(
      data => this.formCategorie.patchValue(data),
      err  => console.log(err)
    );
  }

  submit(): void {
    this.submitted = true;
    if (this.formCategorie.invalid) return;

    this.categorieService.updateCategorie(this.categorieId, this.formCategorie.value).subscribe(
      data => {
        Swal.fire({ title: 'Mise à jour !', text: 'Catégorie modifiée.', icon: 'success', timer: 1500, showConfirmButton: false });
        this.route.navigate(['/categories']);
      },
      err => console.log(err)
    );
  }
}
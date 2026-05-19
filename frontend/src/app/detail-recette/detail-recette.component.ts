import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';

@Component({
  selector: 'app-detail-recette',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-recette.component.html',
  styleUrl: './detail-recette.component.css'
})
export class DetailRecetteComponent implements OnInit {

  recette: any = null;

  constructor(
    private recetteService: RecetteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.recetteService.getRecetteById(id).subscribe(
      data => this.recette = data,
      err => console.log(err)
    );
  }

  getCategorieNom(cat: any): string {
    return cat?.nom || 'Non classé';
  }
}
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService) { }

  ngOnInit() {
  }

  guardar( form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    let textoInformacion;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
      textoInformacion = 'Se actualizó correctamente';
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
      textoInformacion = 'Se creó correctamente';
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: textoInformacion,
        type: 'success'
      });
    });


  }

}

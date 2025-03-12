import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
  standalone: false,
})
export class AlumnoPage implements OnInit {

  alumnos: any = [];
  public baseUrl: string = "http://localhost:8080/alumnos";
  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.cargaralumnos();
  }
  async cargaralumnos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get(this.baseUrl, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
        },
      });

      this.alumnos = response.data;
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
    } finally {
      loading.dismiss();
      event?.target?.complete(); // Asegura que el infinite scroll se complete
    }
  }
}

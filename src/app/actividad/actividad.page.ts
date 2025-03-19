import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
  standalone: false,
})
export class ActividadPage implements OnInit {

  evaluacions: any = [];
  public baseUrl: string = "http://localhost:8080/evaluacions";

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.cargarevaluacions();
  }
 
  async cargarevaluacions(event?: InfiniteScrollCustomEvent) {
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

      this.evaluacions = response.data;
    } catch (error) {
      console.error('Error al cargar evaluacions:', error);
    } finally {
      loading.dismiss();
      event?.target?.complete(); // Asegura que el infinite scroll se complete
    }
  }
}

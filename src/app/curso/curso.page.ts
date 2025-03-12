import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
  standalone: false,
})
export class CursoPage implements OnInit {

  cursos: any = [];
  public baseUrl: string = "http://localhost:8080/cursos";

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargarCursos();
  }

  async cargarCursos(event?: InfiniteScrollCustomEvent) {
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

      this.cursos = response.data;
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    } finally {
      loading.dismiss();
      event?.target?.complete(); // Asegura que el infinite scroll se complete
    }
  }
}

import { Component } from '@angular/core';
import {MenuItem} from "./menu/menu-item";
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kalkulator karniszowy - Zarządzanie';
  version = 'Nieznana wersja';
  release = 'Nieznane wydanie';
  actualDate = new Date();
  screenWidth = window.innerWidth;

  loading: boolean;
  loadingMessage: string;

  menuItems: MenuItem[] = [
    {name: 'Naliczanie', icon: 'trending_flat', path: "/", permissions: []},
    {name: 'Dodawanie wpisu', icon: 'input', path: "/", permissions: []},
    {name: 'Import z XLS', icon: 'import_export', path: "/", permissions: []},
    {name: 'Lista wpisów', icon: 'list', path: "/", permissions: []}
  ];

  constructor(private loaderService: LoaderService){
    this.loaderService.getLoaderStatus().subscribe((status: boolean) => {
      this.loading = status;
    });
    this.loaderService.getLoaderMessage().subscribe((message: string) => {
      this.loadingMessage = message;
    });
  }

}

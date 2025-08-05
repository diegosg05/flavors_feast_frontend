import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { CardArticleHome } from '../../components/card-article-home/card-article-home';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, Nav, Footer, CardArticleHome, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  text: string = 'Bienvenido al restaurante del arte culinario peruano';
  image: string = 'images-header/bannerinicio.jpg';
}

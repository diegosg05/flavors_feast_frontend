import { Component, HostListener, ViewChild } from '@angular/core';
import { Nav } from "../../components/nav/nav";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { CardArticleCarta } from "../../components/card-article-carta/card-article-carta";

@Component({
  selector: 'app-carta',
  imports: [Nav, Header, Footer, CardArticleCarta],
  templateUrl: './carta.html',
  styleUrl: './carta.css'
})
export class Carta {
  @ViewChild(CardArticleCarta) articleComponent!: CardArticleCarta;

  irA(seccion: string) {
    this.articleComponent.irASeccion(seccion);
  }

  downScroll: boolean = false;
  text: string = 'La Carta';
  image: string = 'images-header/bannercarta.jpg';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.downScroll = window.scrollY >= 1140;
  }

}

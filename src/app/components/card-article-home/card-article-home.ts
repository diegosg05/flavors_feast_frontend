import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-article-home',
  imports: [],
  templateUrl: './card-article-home.html',
  styleUrl: './card-article-home.css'
})
export class CardArticleHome {
  @Input()
  imgUrl: string = '';
  @Input()
  imgAlt: string = '';
  @Input()
  cardTitle: string = '';
  @Input()
  articleClassName: string = '';
}

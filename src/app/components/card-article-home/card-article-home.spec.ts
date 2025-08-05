import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArticleHome } from './card-article-home';

describe('CardArticleHome', () => {
  let component: CardArticleHome;
  let fixture: ComponentFixture<CardArticleHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArticleHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardArticleHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArticleCarta } from './card-article-carta';

describe('CardArticleCarta', () => {
  let component: CardArticleCarta;
  let fixture: ComponentFixture<CardArticleCarta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArticleCarta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardArticleCarta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

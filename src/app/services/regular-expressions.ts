import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularExpressions {
  private readonly regularExpressions = {
    numeroTarjeta: /^[0-9]{16}$/,
    cvv: /^[0-9]{3}$/
  };

  constructor() {}

  getRegularExpressions() {
    return this.regularExpressions;
  }
}

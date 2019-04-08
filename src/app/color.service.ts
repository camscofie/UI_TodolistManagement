import { Injectable } from '@angular/core';
import { Color } from './color';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor() {}

  colors: Color[] = [
    {
      code: '#607d8b',
      name: 'Standard'
    },
    {
      code: '#ffd180',
      name: 'Orange'
    },
    {
      code: '#f8bbe1',
      name: 'Pink'
    },
    {
      code: '#ff8a80',
      name: 'Red'
    },
    {
      code: '#80d8ff',
      name: 'Light Blue'
    },
    {
      code: '#82b1ff',
      name: 'Blue'
    },
    {
      code: '#b388ff',
      name: 'Purple'
    },
    {
      code: '#00796B',
      name: 'Green'
    },
    {
      code: '#bec7cb',
      name: 'Light Gray'
    },
    {
      code: '#AAAAAA',
      name: 'Gray'
    },
    {
      code: '#d7ccc8',
      name: 'Brown'
    },
    {
      code: '#000000',
      name: 'Black'
    }
  ];

  /**
   * Observable is available through the imports from rxjs. The Observable class allows to subscribe to the service.
   */
  getColors(): Observable<Color[]> {
    return of(this.colors);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  paddStartId(maksimumData: number, id: number) {
    const totalDigits = Number(maksimumData).toString().length;
    const outputId = id.toString().padStart(totalDigits, "0");
    return outputId;
  }
}

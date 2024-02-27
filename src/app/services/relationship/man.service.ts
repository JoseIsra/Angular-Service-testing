import { Injectable } from '@angular/core';
import { WomanService } from './woman.service';

@Injectable({
  providedIn: 'root',
})
export class ManService {
  constructor(private womanService: WomanService) {}

  getPartnerName() {
    return this.womanService.getWomanName();
  }
}

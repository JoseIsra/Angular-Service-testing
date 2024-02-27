import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WomanService {
  private asimplename = 'Belen';

  getWomanName() {
    return this.asimplename;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  // Variabile condivisa, inizialmente vuota (può essere stringa, oggetto o qualsiasi tipo)
  private feasibilityInfoSource = new BehaviorSubject<string>('');
  private feasibilityCommandColor = new BehaviorSubject<string>('');
  
  // Observable che permette di ascoltare i cambiamenti
  feasibilityInfo$ = this.feasibilityInfoSource.asObservable();
  feasibilityCommandColor$ = this.feasibilityCommandColor.asObservable();

  // Metodo per aggiornare il valore
  setFeasibilityInfo(info: string) {
    this.feasibilityInfoSource.next(info);
    console.log("AGGIORNO INFOS")
  }
  setfeasibilityCommandColor(info: string) {
    this.feasibilityCommandColor.next(info);
    console.log("AGGIORNO COMMAND COLOR")
  }
  
}
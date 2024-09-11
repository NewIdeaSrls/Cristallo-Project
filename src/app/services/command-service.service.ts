import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  // Definisci un Subject che invia segnali
  private commandSource = new Subject<void>(); // Nessun dato, solo il segnale
  command$ = this.commandSource.asObservable();

  // Funzione per emettere il segnale
  triggerCommand() {
    this.commandSource.next(); // Emette il segnale
  }
}

/**
 * EMITTENTE
 * import { Component } from '@angular/core';
import { CommandService } from './command.service';

@Component({
  selector: 'app-component-a',
  template: `<button (click)="sendCommand()">Esegui Funzione nel Componente B</button>`,
})
export class ComponentA {
  constructor(private commandService: CommandService) {}

  // Questa funzione invia il comando
  sendCommand() {
    this.commandService.triggerCommand();
  }
}
 */

/**
 * RICEVENTE
 * import { Component, OnInit } from '@angular/core';
import { CommandService } from './command.service';

@Component({
  selector: 'app-component-b',
  template: `<p>Funzione eseguita: {{ executed }}</p>`,
})
export class ComponentB implements OnInit {
  executed = false;

  constructor(private commandService: CommandService) {}

  ngOnInit() {
    // Sottoscrivi all'Observable per eseguire la funzione quando viene emesso il segnale
    this.commandService.command$.subscribe(() => {
      this.executeFunction();
    });
  }

  // Funzione che verrà eseguita quando ricevi il comando
  executeFunction() {
    this.executed = true;
    console.log('Funzione eseguita nel Componente B');
  }
}
 */

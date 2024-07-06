import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // Reload the page on window resize
    console.log("Resizing Viewport")
    //location.reload();
  }
}
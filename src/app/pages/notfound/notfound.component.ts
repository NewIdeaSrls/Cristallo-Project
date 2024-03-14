import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent  implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}

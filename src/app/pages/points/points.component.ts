import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [],
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss'
})
export class PointsComponent  implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}

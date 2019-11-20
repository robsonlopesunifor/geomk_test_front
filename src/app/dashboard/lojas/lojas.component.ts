import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  @Input() lojas_da_rede_social:object = {};
  
  constructor() { }

  ngOnInit() {
      
  }

}

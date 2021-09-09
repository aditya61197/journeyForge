import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  devs=[{"name" :'Aditya',"image" :'assets/devimages/Aditya.png'},
  {"name" :'Arjun',"image" :'assets/devimages/Arjun.png'},
  {"name" :'Nakul',"image" :'assets/devimages/Nakul.jpeg'},
  {"name" :'Somya',"image" :'assets/devimages/Soumya.jpeg'},
  {"name" :'Srishti',"image" :'assets/devimages/Srishti.png'},
  {"name" :'Sukoulya',"image" :'assets/devimages/Sukoulya.png'},
  {"name" :'Sai Venkatesh',"image" :'assets/devimages/Venkatesh.png'},
  {"name" :'Toshan',"image" :'assets/devimages/Toshan.png'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profile:any = {
    email: "", 
    name: "",
    city: "",
    country: ""  
  };

  edit:Array<boolean> = [false, false, false];

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

  onSaveChange(index:number){
    this.edit[index] = false;

    this.authService.saveProfile(this.profile).subscribe(data => {
      if(!data.success){
        alert("An error occurred, try refreshing the page.");
      }
    })
  }

}

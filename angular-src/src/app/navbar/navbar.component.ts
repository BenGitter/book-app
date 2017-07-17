import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  navigationSub:Subscription;
  collapseOpen:boolean = false;

  constructor(
    private router:Router,
    public authService:AuthService
  ) { }

  ngOnInit() {
    this.navigationSub = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(data => {
        this.collapseOpen = false;
      });
  }

  logout(e){
    e.preventDefault();
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy(){
    this.navigationSub.unsubscribe();
  }

}

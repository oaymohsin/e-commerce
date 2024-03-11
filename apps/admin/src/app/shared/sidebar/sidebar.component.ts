import { Component } from '@angular/core';
import { AuthService, LocalStorageService } from '@e-commerce/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  constructor(private auth:AuthService){}

  logOut(){
    this.auth.logOut()
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@e-commerce/users';

@Component({
  selector: 'e-commerce-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit{
  users = [];

  constructor(private userService: UserService,private router:Router){}

  ngOnInit(): void {
      this._getUsers()
      
  }
  private _getUsers(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.result;
      console.log(this.users)
    })
  }

  getCountryName(countryKey: string) {
    
    if (countryKey) return this.userService.getCountry(countryKey);
  }

  deleteUser(userId:string){}
  updateUser(UserId: string) {
    this.router.navigateByUrl(`createUser/${UserId}`);
  }
}

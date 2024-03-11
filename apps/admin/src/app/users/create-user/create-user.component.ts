import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@e-commerce/users';
import { User } from 'libs/users/src/lib/models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'e-commerce-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  form: FormGroup | any;
  isSubmitted = false;
  editmode = false;
  countries: any = [];
  currentUserId: string | any;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();

    console.log(this.countries);
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  private _getCountries() {
    this.countries = this.userService.getCountries();
  }

  private _checkEditMode() {
    this.activatedroute.params.subscribe((params: any) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.userService.getUser(params.id).subscribe((response: any) => {
          this.userForm.name.setValue(response.result.name);
          this.userForm.email.setValue(response.result.email);
          this.userForm.phone.setValue(response.result.phone);
          this.userForm.isAdmin.setValue(response.result.isAdmin);
          this.userForm.street.setValue(response.result.street);
          this.userForm.apartment.setValue(response.result.apartment);
          this.userForm.zip.setValue(response.result.zip);
          this.userForm.city.setValue(response.result.city);
          this.userForm.country.setValue(response.result.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password:this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };

    if (this.editmode) {

      this._updateUser(user);
    } else {
      
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addUser(user: User) {
    console.log(user)
    this.userService.createUser(user).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User not added',
        });
      }
    );
  }

  private _updateUser(userData: User) {
    this.userService.updateUser(userData, this.currentUserId).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not Updated',
        });
      }
    );
  }

  get userForm() {
    return this.form.controls;
  }
}

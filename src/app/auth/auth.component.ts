import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{

  authForm: FormGroup | undefined;
  isSubmitted  =  false;

  constructor(
     private authService: AuthService,
     private userService: UserService,
     private router: Router,
     private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControls() { return this.authForm?.controls }

  public signIn = async () => {
    this.isSubmitted = true
    if (this.authForm?.invalid) {
      console.warn('[Component][Login] Invalid entered data')
      return;
    }
    this.authService.signIn(this.authForm?.value).subscribe(
        (res: any) => {
        this.userService.user = res.user
        this.userService.token = res.token
        console.log(`[Component][Auth] Log in successful: ${JSON.stringify(res.user)}`)
        this.router.navigate(['user', this.userService.user.id]);
      }
    )
  }
}

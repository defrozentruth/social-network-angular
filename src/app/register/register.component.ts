import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup | undefined;
  isSubmitted  =  false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  get formControls() { return this.registerForm?.controls }

  public submit = () => {
    this.isSubmitted = true
    if (this.registerForm?.invalid) {
      console.warn('[Component][Register] Invalid entered data')
      return;
    }
    this.authService.register(this.registerForm?.value).subscribe({
      complete: async () => {
        console.log('Registration successful')
        await this.router.navigateByUrl("/login")
      },
      error: console.error
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['tabs/tab3']); // Navigate to your desired page after login
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Login failed. Please try again.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  navigateToRegister() {
    this.router.navigate(['/tabs/tab3/register']);
  }
  
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  homeAddress = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    // Check for empty fields
    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword ||
      !this.phoneNumber.trim() ||
      !this.homeAddress.trim()
    ) {
      this.showAlert('Missing Fields', 'Please complete all fields before registering.');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
  
    // Password length check
    if (this.password.length < 6) {
      this.showAlert('Password Too Short', 'Password should be at least 6 characters long.');
      return;
    }
  
    // Confirm password check
    if (this.password !== this.confirmPassword) {
      this.showAlert('Password Mismatch', 'Please make sure both passwords match.');
      return;
    }
  
    // Numeric phone validation
    if (!/^\d+$/.test(this.phoneNumber)) {
      this.showAlert('Invalid Phone Number', 'Phone number must contain digits only.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
  
      const userData = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        homeAddress: this.homeAddress,
        role: 'user'
      };
  
      await addDoc(collection(this.firestore, 'users'), userData);
  
      await this.showAlert('Welcome to MyBloom 💖', 'Your account has been created!');
      this.router.navigate(['/tabs/tab3']);
    } catch (error: any) {
      this.showAlert('Error', error.message);
    }
  }
  

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

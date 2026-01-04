// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth = inject(Auth);
  public firestore = inject(Firestore);

  constructor() {}

  // Sign up with email and password
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Log in with email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Log out the user
  logout() {
    return this.auth.signOut();
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  // Fetch user data from Firestore by UID
  async getUserData(uid: string) {
    const userDocRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No user found');
      return null;
    }
  }

  // in auth.service.ts
async getOrdersByEmail(email: string) {
  const ordersRef = collection(this.firestore, 'orders');
  const q = query(ordersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}


  // Fetch user data from Firestore by Email
  async getUserDataByEmail(email: string) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];  // Assuming the email is unique
      return userDoc.data();  // Returns the user data
    } else {
      console.log('No user found with this email');
      return null;
    }
  }
}

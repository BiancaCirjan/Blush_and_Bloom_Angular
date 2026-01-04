import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.page.html',
  styleUrls: ['./admin-customers.page.scss'],
  standalone: false,
})
export class AdminCustomersPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    this.users = snapshot.docs
      .map(doc => doc.data())
      .filter(user => user['role'] !== 'admin'); // Exclude admins
    this.filteredUsers = this.users;
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user =>
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phoneNumber?.includes(term) ||
      user.homeAddress?.toLowerCase().includes(term)
    );
  }
}

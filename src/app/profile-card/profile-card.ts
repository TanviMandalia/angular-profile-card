import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css']
})
export class ProfileCard {
  users: any[] = [];

  name: string = '';
  role: string = '';
  bio: string = '';
  avatarUrl: string | ArrayBuffer | null = null;

  editIndex: number = -1;

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.avatarUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  addUser() {
    if (this.name && this.role && this.avatarUrl) {
      this.users.push({
        name: this.name,
        role: this.role,
        bio: this.bio,
        avatarUrl: this.avatarUrl
      });

      this.clearForm();
    }
  }

  editUser(i: number) {
    const u = this.users[i];
    this.editIndex = i;
    this.name = u.name;
    this.role = u.role;
    this.bio = u.bio;
    this.avatarUrl = u.avatarUrl;
  }

  updateUser() {
    if (this.editIndex !== -1) {
      this.users[this.editIndex] = {
        name: this.name,
        role: this.role,
        bio: this.bio,
        avatarUrl: this.avatarUrl
      };

      this.editIndex = -1;
      this.clearForm();
    }
  }

  deleteUser(i: number) {
    this.users.splice(i, 1);
  }

  clearForm() {
    this.name = '';
    this.role = '';
    this.bio = '';
    this.avatarUrl = null;
  }
}
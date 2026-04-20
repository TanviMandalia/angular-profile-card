import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
   profiles: any[] = [];

  name: string = '';
  role: string = '';
  email: string = '';

  editIndex: number = -1;

  addProfile() {
    if (this.name && this.role && this.email) {
      this.profiles.push({
        name: this.name,
        role: this.role,
        email: this.email
      });
      this.clearForm();
    }
  }

  editProfile(index: number) {
    this.editIndex = index;
    this.name = this.profiles[index].name;
    this.role = this.profiles[index].role;
    this.email = this.profiles[index].email;
  }

  updateProfile() {
    if (this.editIndex !== -1) {
      this.profiles[this.editIndex] = {
        name: this.name,
        role: this.role,
        email: this.email
      };
      this.editIndex = -1;
      this.clearForm();
    }
  }

  deleteProfile(index: number) {
    this.profiles.splice(index, 1);
  }

  clearForm() {
    this.name = '';
    this.role = '';
    this.email = '';
  }
}


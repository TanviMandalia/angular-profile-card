import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.css']
})
export class ProfileCard {

  previewUrl = signal<string | null>(null);
  users: any[] = [];
  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      bio: ['', Validators.required],
      image: [null]
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Only image files allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Max file size is 5MB');
      return;
    }

    this.form.patchValue({ image: file });

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    this.users.push({
      name: value.name,
      role: value.role,
      bio: value.bio,
      avatarUrl: this.previewUrl()
    });

    this.form.reset();
    this.previewUrl.set(null);
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  editUser(index: number) {
    const user = this.users[index];

    this.form.patchValue({
      name: user.name,
      role: user.role,
      bio: user.bio
    });

    this.previewUrl.set(user.avatarUrl);
    this.users.splice(index, 1);
  }

  removeImage() {
    this.form.patchValue({ image: null });
    this.previewUrl.set(null);
  }

  get f() {
    return this.form.controls;
  }
}
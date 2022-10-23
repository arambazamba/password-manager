import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Password } from './password.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Password manager ...';
  passwords: Password[] = [];
  selectedPassword: Password | null = null;

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.ds.getPasswords().subscribe((data) => {
      this.passwords = data;
    });
  }

  savePassword(pw: Password) {
    if (pw.id == 0) {
      this.ds.addPassword(pw).subscribe((inserted: Password) => {
        this.passwords.push(inserted);
        this.selectedPassword = null;
      });
    } else {
      this.ds.updatePassword(pw).subscribe((updated: Password) => {
        let existing = this.passwords.find((p) => p.id == updated.id);
        existing = { ...updated };
        this.selectedPassword = null;
      });
    }
  }

  deletePassword(id: number) {
    this.ds.deletePassword(id).subscribe(() => {
      this.passwords = this.passwords.filter((pw) => pw.id !== id);
    });
  }

  editPasswort(pw: Password) {
    this.selectedPassword = pw;
  }

  addPassword() {
    this.selectedPassword = new Password();
  }
}

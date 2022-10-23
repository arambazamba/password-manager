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
  selectedPassword: Password = new Password();

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.ds.getPasswords().subscribe((data) => {
      this.passwords = data;
    });
  }

  savePassword(pw: Password) {
    if (pw.id == 0) {
      this.ds.addPassword(pw).subscribe((data: Password) => {
        this.passwords.push(data);
        this.selectedPassword = new Password();
      });
    } else {
      this.ds.updatePassword(pw).subscribe((data: Password) => {
        this.passwords.push(data);
        this.selectedPassword = new Password();
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

import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RouterLink, Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit() {
    this.user = { id: 1, username: '', password: '', email: '', phoneNumber: '' };
  }

  submit(username: string) {
    username = username.trim();
    if (!username) {
      return;
    }
    let user = (this.user.username = username);
    this.router.navigate(['todo-lists']);
    this.todoService.login(user);
  }
}

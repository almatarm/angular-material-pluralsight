import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isScreenSmall: boolean = false;
  isDarkTheme: boolean = false;
  dir: Direction= 'ltr';

  users!: Observable<User[]>;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

      this.users = this.userService.users;
      this.userService.loadAll();

      this.users.subscribe(data => {
        console.log(data);
      });

      this.router.events.subscribe(() => {
        if(this.isScreenSmall) {
          this.sidenav.close();
        }
      });
  }

  
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

}

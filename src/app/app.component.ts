import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public isLoginOrRegister = false;

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {
    this.translateService.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrRegister =
          event.url === '/login' || event.url === '/register';
      });
  }
}

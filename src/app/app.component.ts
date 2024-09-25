import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public isLoginOrRegister = false;
  public currentLang: string;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {
    this.translateService.setDefaultLang('fr');
    this.currentLang = 'fr';
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginOrRegister =
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/';
      });
  }

  switchLanguage(): void {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    this.translateService.use(this.currentLang);
  }

  getLanguageSwitcherText(): string {
    return this.currentLang === 'fr'
      ? this.translateService.instant('language-switcher.switch-to-english')
      : this.translateService.instant('language-switcher.switch-to-french');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

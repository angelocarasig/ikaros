import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageKeys } from '../../constants';
import { isPlatformBrowser } from '@angular/common';
import { Theme } from '../../structures/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: Theme;
  private themeSubject: BehaviorSubject<Theme>;
  theme$: Observable<Theme>;
  private browserReady$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: object) {
    this.browserReady$ = this.createBrowserReadyObservable();
    this.initializeTheme();
  }

  private createBrowserReadyObservable(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (isPlatformBrowser(this.platformId)) {
        observer.next(true);
        observer.complete();
      }
    });
  }

  private initializeTheme(): void {
    this.browserReady$.subscribe(() => {
      const initialTheme = this.initThemeFromLocalStorage() ?? this.initThemeFromBrowser();
      this.themeSubject = new BehaviorSubject<Theme>(initialTheme);
      this.theme$ = this.themeSubject.asObservable();

      this.activeTheme = this.themeSubject.value;
      this.document.body.classList.add(this.activeTheme);
      localStorage.setItem(LocalStorageKeys.theme, this.activeTheme);
    });
  }

  get currentTheme(): Theme {
    return this.activeTheme;
  }

  toggleTheme(): void {
    this.browserReady$.subscribe(() => {
      this.activeTheme = this.activeTheme === Theme.Light ? Theme.Dark : Theme.Light;
      this.document.body.classList.remove(Theme.Light, Theme.Dark);
      this.document.body.classList.add(this.activeTheme);
      localStorage.setItem(LocalStorageKeys.theme, this.activeTheme);

      this.themeSubject.next(this.activeTheme);
    });
  }

  private initThemeFromBrowser(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
  }

  private initThemeFromLocalStorage(): Theme | null {
    const storedTheme = localStorage.getItem(LocalStorageKeys.theme) as Theme;
    return storedTheme && Object.values(Theme).includes(storedTheme) ? storedTheme : null;
  }
}

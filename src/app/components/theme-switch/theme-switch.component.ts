import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  icon: string = "sun";
  classesToBeUpdated = [
    'title-text',
    'fa-solid',
    'form-label',
    'list-unstyled',
    'licensed',
    'navbar'
  ];

  constructor(private theme: ThemeService) {}

  private updateTheme() {
    this.classesToBeUpdated.forEach(currentClass => {
      Array.from(document.getElementsByClassName(currentClass)).forEach(element => {
        if (element.classList.contains('list-unstyled')) {
          element.classList.remove(this.theme.current == "dark" && "light-link" || "dark-link")
          element.classList.add(`${this.theme.current}-link`);
        } else {
          element.classList.remove(this.theme.current == "dark" && "light" || "dark")
          element.classList.add(this.theme.current);
        }
      })
    })
  }

  public switchTheme(): void {
    if (this.theme.current === 'light') {
      this.theme.current = 'dark';
    } else {
      this.theme.current = 'light';
    }
    this.icon = this.theme.current == "light" && "sun" || "moon";
    this.updateTheme();
  }

  ngOnInit(): void {
    const appRoot = document.getElementsByTagName('app-root')
    const backgroundElement: HTMLElement | any = document.getElementById("background");
    appRoot[0].append(backgroundElement);
    this.updateTheme();
    this.icon = this.theme.current == "light" && "sun" || "moon";
  }

}

import {ViewApp} from "./ViewApp";

export class App {
  private view: ViewApp

  public constructor() {
    this.view = new ViewApp();
  }

  public start(): void {
    this.view.renderPage();
  }
}
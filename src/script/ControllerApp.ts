import {ViewApp} from "./ViewApp";
import {IModelApp, ModelApp} from "./ModelApp";
import {IInputComment} from "./interface";

export class ControllerApp {
  private view: ViewApp;
  private model: IModelApp;

  constructor(viewModel: ViewApp) {
    this.view = viewModel
    this.model = ModelApp
  }

  public addComment(comment: IInputComment) {
    if (this.checkValid(comment)) {
      this.model.comments.push(comment)
      this.view.updateComments()
    }
  }

  public checkValid(comment: IInputComment): boolean {
    console.log(comment.date)
    return this.checkFieldName(comment.name) && this.checkFieldText(comment.text)
  }

  private checkFieldName(name:string):boolean {
    return name.length > 3
  }

  private checkFieldText(text:string):boolean {
    return text.length > 10
  }
}
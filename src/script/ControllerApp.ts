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
      this.view.clearAllInputs()
      this.view.updateComments()
    }
  }

  public checkValid(comment: IInputComment): boolean {
    const checkText = this.checkFieldText(comment.text)
    const checkName = this.checkFieldName(comment.name)
    return checkName && checkText
  }

  private checkFieldName(name: string): boolean {
    if (name.length < 4) {
      this.view.showFailTextForInputFieldName('Длинна имени должна быть более 3 символов')
      return false
    }
    return true
  }

  private checkFieldText(text: string): boolean {
    if (text.length < 11) {
      this.view.showFailTextForInputFieldComment('Длинна комментария должна быть более 15 символов')
      return false
    }
    return true
  }
}
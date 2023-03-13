import {createInput, createTag} from "./helper";
import {ControllerApp} from "./ControllerApp";
import {IModelApp, ModelApp} from "./ModelApp";
import {IComment, IInputComment} from "./interface";
import {createLikeBtn} from "./likeBtn/likeBtn";
import {createCloseBtn} from "./closeBtn/closeBtn";

export class ViewApp {
  public formComment: HTMLElement;
  public date: HTMLInputElement;
  private controller: ControllerApp;
  private model: IModelApp;
  private wrapperComments: HTMLElement;

  public constructor() {
    this.controller = new ControllerApp(this)
    this.model = ModelApp
  }

  public renderPage(): void {
    document.body.append(this.createAddCommentBlock(), this.createCommentsBlock());
    this.updateComments()
  }

  private createAddCommentBlock() {
    const wrapperInput = createTag('div', 'add-comment', '');
    this.formComment = createTag('form', '')

    const inputFieldName = createInput('text', 'add-comment__field-name', 'field-name', 'Ваше имя')
    const inputFieldComment = createInput('text', 'add-comment__field-text', 'field-text', 'Добавьте ваш комментарий')
    const date = createInput('date', 'add-comment__input-date', 'input-date')
    const confirmButton = createTag('button', 'add-comment__confirm', 'Sent') as HTMLButtonElement
    confirmButton.type = 'submit'

    this.formComment.append(inputFieldName, inputFieldComment, date, confirmButton)
    wrapperInput.append(this.formComment)

    this.formComment.addEventListener("submit", (event) => {
      event.preventDefault()
      const comment: IInputComment = {name: inputFieldName.value, text: inputFieldComment.value, date: date.value}

      this.controller.addComment(comment)
    })

    return wrapperInput
  }

  private createCommentsBlock() {
    this.wrapperComments = createTag('div', 'comments', '');
    return this.wrapperComments
  }

  public updateComments() {
    this.wrapperComments.innerHTML = ''

    if (this.model.comments.length === 0) {
      const noComment = createTag('p', 'comments__no-comment', 'Нет комментариев');
      this.wrapperComments.append(noComment)
    } else {
      const comments = this.model.comments.map(comment => this.createCommentBlock(comment))
      this.wrapperComments.append(...comments)
    }
  }

  private createCommentBlock(comment: IComment) {
    const wrapper = createTag('div', 'comment')
    const name = createTag('p', 'comment__name', comment.name)
    const date = createTag('p', 'comment__date', comment.date)
    const text = createTag('p', 'comment__text', comment.text)

    const likeBtn = createLikeBtn(comment)
    likeBtn.classList.add('comment__like')

    likeBtn.onclick = () => {
      this.model.comments = this.model.comments.map(item => {
        if (item === comment) {
          item.isLike = !item.isLike
        }
        return item
      })
      this.updateComments()
    }

    const closeBtn = createCloseBtn()
    closeBtn.classList.add('comment__close')

    closeBtn.onclick = () => {
      this.model.comments = this.model.comments.filter(item => item !== comment)
      this.updateComments()
    }

    wrapper.append(name, date, text, likeBtn, closeBtn)
    return wrapper
  }
}

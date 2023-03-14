import {createInput, createTag, getCurrenTime} from "./helper";
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
  private failTextForInputFieldName: HTMLElement;
  private failTextForInputFieldComment: HTMLElement;
  private inputFieldName: HTMLInputElement;
  private inputFieldComment: HTMLInputElement;
  private inputFieldDate: HTMLInputElement;

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

    this.inputFieldName = createInput('text', 'add-comment__field-name', 'field-name', 'Ваше имя',)
    this.inputFieldName.oninput = () => this.deleteFailTextForInputFieldName()
    this.failTextForInputFieldName = createTag('p', 'add-comment__field-name-fail')

    this.inputFieldComment = createInput('text', 'add-comment__field-text', 'field-text', 'Добавьте ваш комментарий',)
    this.inputFieldComment.oninput = () => this.deleteFailTextForInputFieldComment()
    this.failTextForInputFieldComment = createTag('p', 'add-comment__field-text-fail')

    this.inputFieldDate = createInput('date', 'add-comment__input-date', 'input-date')
    const confirmButton = createTag('button', 'add-comment__confirm', 'Sent') as HTMLButtonElement
    confirmButton.type = 'submit'

    this.formComment.append(this.inputFieldName, this.failTextForInputFieldName, this.inputFieldComment, this.failTextForInputFieldComment, this.inputFieldDate, confirmButton)
    wrapperInput.append(this.formComment)

    this.formComment.addEventListener("submit", (event) => {
      event.preventDefault()
      const comment: IInputComment = {
        name: this.inputFieldName.value,
        text: this.inputFieldComment.value,
        date: this.getDate(this.inputFieldDate.value)
      }

      this.controller.addComment(comment)
    })

    return wrapperInput
  }

  private getDate(date: string): string {
    if (!date) {
      return `Сегодня, ${getCurrenTime()}`
    }

    const newDate = new Date(`${date} ${getCurrenTime()}`)
    // @ts-ignore
    const differentTime = Date.now() - newDate

    if (differentTime < 24 * 3600 * 1000 && differentTime > 0) {
      return `Сегодня, ${getCurrenTime()}`
    }

    if (differentTime < 2 * 24 * 3600 * 1000 && differentTime > 0) {
      return `Вчера, ${getCurrenTime()}`
    }

    return `${date} ${getCurrenTime()}`
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

  public showFailTextForInputFieldName(text: string) {
    this.failTextForInputFieldName.innerText = text
    this.inputFieldName.classList.add('warning')

  }

  private deleteFailTextForInputFieldName() {
    this.failTextForInputFieldName.innerText = ''
    this.inputFieldName.classList.remove('warning')
  }

  public showFailTextForInputFieldComment(text: string) {
    this.failTextForInputFieldComment.innerText = text
    this.inputFieldComment.classList.add('warning')
  }

  private deleteFailTextForInputFieldComment() {
    this.failTextForInputFieldComment.innerText = ''
    this.inputFieldComment.classList.remove('warning')
  }

  public clearAllInputs() {
    this.inputFieldName.value = ''
    this.inputFieldComment.value = ''
    this.inputFieldDate.value = ''
  }
}

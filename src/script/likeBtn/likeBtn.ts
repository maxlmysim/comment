import {createTag} from "../helper";
import './likeBtn.scss'
import {IComment} from "../interface";

export const createLikeBtn = (comment: IComment): HTMLElement => {
  const wrapper = createTag('div', 'like');
  const like = createTag('button', ['like-toggle','basic'], '♥')

  if(comment.isLike) {
    like.classList.add('like-active')
  }

  wrapper.onclick = () => {
    like.classList.toggle('like-active')
  }

  wrapper.append(like)

  return wrapper
}
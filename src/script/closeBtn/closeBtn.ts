import {createTag} from "../helper";
import './closeBtn.scss'

export const createCloseBtn = (): HTMLElement => {
  const wrapper = createTag('div', 'close-wrapper');
  const close = createTag('button', 'closeBtn', 'X')

  wrapper.onclick = () => {
  }

  wrapper.append(close)

  return wrapper
}
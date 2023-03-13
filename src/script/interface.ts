export interface IInputComment {
  name: string;
  isCorrectName?: boolean;
  date: string;
  text: string;
  isCorrectText?: boolean;
}

export interface IComment extends IInputComment{
  isLike?: boolean;
}
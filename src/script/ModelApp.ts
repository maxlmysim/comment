import {IComment} from "./interface";

export interface IModelApp {
  comments: IComment[]
}

export const ModelApp: IModelApp = {
  comments: [{name: 'Maks', text: 'Hello world!', date: '15-12-2015', isLike: false}]
}
import {IComment} from "./interface";

export interface IModelApp {
  comments: IComment[]
}

export const ModelApp: IModelApp = {
  comments: []
}
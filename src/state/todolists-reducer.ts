import {FilterValuesType, TodolistType} from "../App"
import { v1 } from "uuid"

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ActionsType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
 switch (action.type) {
     case 'REMOVE-TODOLIST': {
         return state.filter(tl => tl.id !== action.id)
     }
     case 'ADD-TODOLIST': {
         return [...state, {
             id: v1(),
             filter: "all",
             title: action.title
         }]
     }
     case 'CHANGE-TODOLIST-TITLE': {
         let todolist = state.find(tl => tl.id === action.id);
         if (todolist) {
             todolist.title = action.title;
         }
         return [...state]
     }

     case 'CHANGE-TODOLIST-FILTER': {
         let todolist = state.find(tl => tl.id === action.id);
         if (todolist) {
             todolist.filter = action.filter;
         }
         return [...state]
     }
     default:
         throw new Error("I don't understand this type")

 }
}

export default todolistReducer
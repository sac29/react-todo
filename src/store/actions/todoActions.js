import { ADD_TODO_ITEM, MARK_TODO_DONE, DELETE_TODO_ITEM, EDIT_TODO_ITEM } from './actions';

export const createTodoItem = (todo) => dispatch => {
    dispatch({
        type: ADD_TODO_ITEM,
        payload: todo
    });
};


export const markTodoAsDone = (todos) => dispatch => {
    dispatch({
        type: MARK_TODO_DONE,
        payload: todos
    });
};

export const editTodo = (todos) => dispatch => {
    dispatch({
        type: EDIT_TODO_ITEM,
        payload: todos
    });
};

export const deleteTodo = (todos) => dispatch => {
    dispatch({
        type: DELETE_TODO_ITEM,
        payload: todos
    });
};


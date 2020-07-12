import { ADD_TODO_ITEM, DELETE_TODO_ITEM, MARK_TODO_DONE, EDIT_TODO_ITEM } from '../actions/actions';

const initialState = {
    todos: [
        { id: 1, action: 'Medidate for 15 mins', dateAdded: '2020/06/12', isCompleted: false },
        { id: 2, action: 'Read newspaper', dateAdded: '2020/06/16', isCompleted: false },
        { id: 3, action: 'Prepare coffee', dateAdded: '2020/06/15', isCompleted: false }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO_ITEM:
            return {
                todos: [...state.todos, action.payload]
            }
        case MARK_TODO_DONE:
            return {
                todos: [...action.payload]
            }
        case EDIT_TODO_ITEM:
            return {
                todos: [...action.payload]
            }
        case DELETE_TODO_ITEM:
            return {
                todos: [...action.payload]
            }
        default:
            return state;
    }
};

export default reducer;
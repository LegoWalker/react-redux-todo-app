import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');

        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodosAsync',
    async (payload) => {
            const response = await fetch('http://localhost:7000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ title: payload.title })
            });

            if (response.ok) {
                const todo = await response.json();
                return { todo };
            }            
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
            const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ completed: payload.completed })
            });

            if (response.ok) {
                const todo = await response.json();
                return { id: todo.id, title: todo.title, completed: todo.completed };
            }            
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
            const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ id: payload.id })
            });

            if (response.ok) {
                const todos = await response.json();
                return { todos };
            }            
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: [
        {id: 1, title: "todo1", completed: false },
        {id: 2, title: "todo2", completed: true },
        {id: 3, title: "todo3", completed: false },
        {id: 4, title: "todo4", completed: true },
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            };
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id != action.payload.id);
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            console.log('Fetching data...');
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('Retrieved data successfully!');
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            console.log(action.payload.todo.title + ' added to list :)' );
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            console.log(`${action.payload.title} set to ${action.payload.completed}`);
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            console.log(`Todo deleted!`); //(${action.payload.id})`);
            return action.payload.todos;
            //return state.filter((todo) => todo.id != action.payload.id);
        }
    }
})

export const { addTodo, toggleComplete, deleteTodo, } = todoSlice.actions;

export default todoSlice.reducer;


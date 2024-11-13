import axios from 'axios';

export async function getTodos() {
    const response = await axios.get(
        'https://ifms-todo.fly.dev/api/todo/all'
    );

    const todos = response.data as Array<any>;

    return todos;
}

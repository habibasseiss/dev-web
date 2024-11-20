import axiosInstance from "./api/axiosInstance";


export async function getTodos() {
    const response = await axiosInstance.get(
        'https://ifms-todo.fly.dev/api/todo'
    );

    const todos = response.data as Array<any>;

    return todos;
}

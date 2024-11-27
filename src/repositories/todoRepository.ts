import { Item } from "@/types/Item";
import axiosInstance from "../api/axiosInstance";

const API_URL = 'https://ifms-todo.fly.dev/api';

export const todoRepository = {
    async getAll(): Promise<Array<Item>> {
        const response = await axiosInstance.get(`${API_URL}/todo`);

        return response.data;
    },

    async add(name: string): Promise<Item> {
        const response = await axiosInstance.post(`${API_URL}/todo`, {
            name: name,
        });

        return response.data.ops[0];
    },

    async remove(id: string): Promise<boolean> {
        const response = await axiosInstance.delete(`${API_URL}/todo/${id}`);

        return (response.status == 200);
    },

    async markAsDone(id: string, done: boolean): Promise<Item> {
        const response = await axiosInstance.put(`${API_URL}/todo/${id}`, {
            done: done,
        });

        return response.data.todo;
    }
}

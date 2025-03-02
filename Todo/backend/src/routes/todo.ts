import { Router } from 'express';
import { addTodo, deleteTodo, editTodo, getAllTodo } from '../controllers/User';

const todoRoutes = Router();

todoRoutes.post('/getAllTodo', getAllTodo);
todoRoutes.post('/addTodo', addTodo);
todoRoutes.post('/delete', deleteTodo);
todoRoutes.post('/edit', editTodo);

export default todoRoutes;

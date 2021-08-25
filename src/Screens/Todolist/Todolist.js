import React, { useEffect, useState } from 'react'
import './Todolist.css'
import ListTodo from '../../component/Todolist_Cpn/ListTodo'
import { useSelector, useDispatch } from 'react-redux';
import { getTodolistItem, getTodolistItemCompleted, data123 } from '../../actions/TodolistActions';
import ModalAddUpdate from '../../component/Modal/ModalAddUpdate';
import Navbar from '../../component/Navbar/Navbar'
import { useHistory } from 'react-router';

export default function Todolist() {
    const [Modal, setModal] = useState(false)
    const [listOnhold, setListOnhold] = useState([])
    const [listCompleted, setListCompleted] = useState([])

    const closeModal = (status) => {
        setModal(status)
    }
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo } = userSignIn
    const GetTodolist = useSelector(state => state.GetTodolist)
    const { TodoList } = GetTodolist
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history.push('/Signin')
        }
    }, [userInfo])
    // const RenderList = () => {
    //     dispatch(getTodolistItem())
    //     setListOnhold(TodoList && TodoList.filter(Todo => Todo.status != "Completed" && Todo.status != "Canceled"))
    //     setListCompleted(TodoList && TodoList.filter(Todo => Todo.status != "In Progress" && Todo.status != "Pending"))
    // }
    useEffect(() => {
        // RenderList();
        dispatch(getTodolistItem())
        return () => {

        }
    }, [])

    const TodoListOnHold = TodoList && TodoList.filter(Todo => Todo.status != "Completed" && Todo.status != "Canceled")
    const TodoListCompleted = TodoList && TodoList.filter(Todo => Todo.status != "In Progress" && Todo.status != "Pending")

    return (
        <>
            <Navbar />
            <div className="todolist">
                <div className="todolist__title">
                    <p>You’ve got <span>7 task</span> today </p>
                    <button type="button" onClick={() => setModal(true)}><i className="far fa-plus-square"></i> Add New</button>
                </div>
                <div className="todolist__onhold">
                    <div className="todolist__onHold__title">
                        <p>On Hold</p>
                    </div>
                    {TodoListOnHold.length > 0 ? TodoListOnHold.map(Todoitem =>
                        <ListTodo key={Todoitem.id} Todoitem={Todoitem} />
                    ) : <div class="loader"></div>}
                </div>
                <div className="todolist__completed">
                    <div className="todolist__completed__title">
                        <p>Completed</p>
                    </div>
                    {TodoListCompleted.length > 0 ? TodoListCompleted.map(Todoitem =>
                        <ListTodo key={Todoitem.id} Todoitem={Todoitem} />
                    ) : <div class="loader"></div>}

                </div>
                {Modal && <ModalAddUpdate modal="Add" closeModal={closeModal} />}
            </div >
        </>
    )
}

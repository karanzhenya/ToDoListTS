import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Computer", isDone: false}]
    });

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTask = [task, ...tasks];
        tasksObj[todolistId] = newTask;
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id
        );
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.title = newValue;
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolist([...todolists])
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolists);
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolist([...todolists])
        }
    }

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]);

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        };
        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let taskFortodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            taskFortodolist = taskFortodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            taskFortodolist = taskFortodolist.filter(t => t.isDone === false)
                        }
                        return <Grid item>
                            <Todolist
                                changeTaskTitle={changeTaskTitle}
                                key={tl.id}
                                id={tl.id}
                                task={taskFortodolist}
                                title={tl.title}
                                filter={tl.filter}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeTodolistTitle={changeTodolistTitle}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}/>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>)
}

export default App;
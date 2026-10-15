const cl = console.log;

const todos = [
    {todo : "HTML", id:"1"},
    {todo : "Javascript", id:"2"},
    {todo : "Css", id:"3"},
    {todo : "Angular", id:"4"}
]

const PORT = 3000;

const express = require('express')

const app = express();

app.use(express.json())

app.get('/api/todos', (req, res)=>{
    try{
        res.status(200).json({
            ok  :true,
            message: 'todos fetched successfully',
            body : todos
        })

    }catch(err){
        res.status(500).json({
            ok : false,
            message : 'something went wrong while fetching todos',
            error  : err.message
        })
    }
})

//single obj get

app.get('/api/todos/:id', (req, res)=>{
    try{
        let singleId = req.params.id;
        let body = req.body
        let singleTodo = todos.find(e => e.id === singleId)
        if(!singleTodo){
            return res.status(404).json({
                ok : false,
                message : 'todo not found'
            })
        }
        res.status(200).json({
            ok:true,
            message : 'single todo fetched successfully',
            data : singleTodo
        })

    }catch(err){
        res.status(500).json({
            ok : false,
            message : 'unable to fetch single todo',
            error : err.message
        })
    }
})

app.post('/api/todos', (req,res)=>{
    try{
        let body = req.body
        if(!body.todo){
            return res.status(400).json({
                ok : false,
                message : 'title is required',
            })
        }

        let newTodo = {
            todo : body.todo,
            id : Date.now().toString()
        }

        todos.push(newTodo)
        res.status(201).json({
            ok : true,
            message : 'new todo created successfully',
            data : newTodo
        })
    }catch(err){
        res.status(500).json({
            ok : false,
            message : 'unable to create new todo',
            error : err.message
        })
    }
})

app.patch('/api/todos/:id', (req, res)=>{
    try{
        let updateId = req.params.id;
        let body = req.body
        let update_idx = todos.findIndex(e => e.id === updateId)
        if(!update_idx === -1){
            return res.status(404).json({
                ok : false,
                message : 'todo not found',
            })
        }

        if(!body.todo){
            return res.status(400).json({
                ok : false,
                message : 'todo is required in update'
            })
        }

        let updateObj = {
            ...todos[update_idx],
            todo : body.todo
        }

        res.status(200).json({
            ok : true,
            message : 'todo updated successfully',
            data : updateObj
        })
    }catch(err){
        res.status(500).json({
            ok : false,
            message : 'error while updating the todo',
            error : err.message
        })
    }
})

app.delete('/api/todos/:id', (req, res)=>{
    try{
        let deleteId = req.params.id
        let dltIdx = todos.findIndex(e => e.id === deleteId)
        if(!dltIdx){
            return res.status(404).json({
                ok : false,
                message : 'todo not found',
            })
        }

        let dltobj = todos.splice(dltIdx,1)
        res.status(200).json({
            ok:true,
            message : 'todo deleted successfully',
            body : dltobj[0]
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message :'error while deleting todo',
            error : err.message
        })
    }
})

app.listen(PORT, ()=>{
    cl(`server is running in port ${PORT}`)
})

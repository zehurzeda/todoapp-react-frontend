import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)

        this.state = { description: '', list: []}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)

        this.refresh();
    }
    
    handleAdd(){
        const description = this.state.description
        Axios.post(URL, {description})
            .then(resp => this.refresh())
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    
    refresh(){
        Axios.get(`${URL}?sort=-createdAt`)
            .then(resp => this.setState({...this.state, descriptioin: '', list: resp.data}))
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh())
    }
    
    handleChangeState(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: !todo.done})
            .then(resp => this.refresh())
    }

    render(){
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'/>
                <TodoForm 
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}/>
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleChangeState={this.handleChangeState}/>
            </div>
        )
    }
}
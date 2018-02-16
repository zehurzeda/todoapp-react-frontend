import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import IconButton from '../template/iconButton'
import {changeDoneState, remove} from './todoActions'

const TodoList = props => {
    
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style={todo.done ? 'warning' : 'success'} 
                        icon={todo.done ? 'undo' : 'check'}
                        onClick={() => props.changeDoneState(todo)}/>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.remove(todo)}/>
                </td>
            </tr>
        ))
    }
    
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableAction'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({changeDoneState, remove}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
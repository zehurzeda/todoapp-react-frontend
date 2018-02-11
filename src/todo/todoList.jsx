import React from 'react'

import IconButton from '../template/iconButton'

export default props => {
    
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style={todo.done ? 'warning' : 'success'} 
                        icon={todo.done ? 'undo' : 'check'}
                        onClick={() => props.handleChangeState(todo)}/>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.handleRemove(todo)}/>
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
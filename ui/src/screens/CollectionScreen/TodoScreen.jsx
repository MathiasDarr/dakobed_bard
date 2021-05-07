import React, { Component } from 'react'


import AddTodo from "components/Collections/AddCollection";
import TodoList from "components/Collections/CollectionList";
import VisibilityFilters from "components/Collections/VisibilityFilters";

import Screen from 'components/Screen/Screen';


import "../../styles.css";
export class TodoScreen extends Component {
    render(){
        return(
        <Screen
        className="TodoScreen"
        title={"Collections"}  
        >
        <div className="todo-app">
                <h1>Collections</h1>
                <AddTodo />
                <TodoList />
                <VisibilityFilters />
            </div>

        </Screen>
        
        

        
        )
    }
    
}

export default TodoScreen
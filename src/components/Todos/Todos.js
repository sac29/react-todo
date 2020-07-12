import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { List, Button, Row, Col } from 'antd';
import { createTodoItem, markTodoAsDone, editTodo, deleteTodo } from '../../store/actions/todoActions';
import styles from './Todos.module.css';
import ModalDialog from '../Modal/ModalDialog';

const dateFormat = 'YYYY/MM/DD';

class Todos extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        isEdit: false,
        newTodo: {
            action: null,
            dateAdded: moment().format(dateFormat),
            isCompleted: false,
            id: null
        }
    };

    addTodo = () => {
        this.setState({
            ModalText: 'Add Todo',
            visible: true,
            newTodo: {
                action: null,
                dateAdded: moment().format(dateFormat),
                isCompleted: false,
                id: null
            }
        });
    }

    editTodo = (todo) => {
        this.setState({
            ModalText: 'Edit Todo',
            visible: true,
            newTodo: todo,
            isEdit: true
        });
    }

    deleteTodo = (todo) => {
        const todos = this.props.todos.filter(t => t.id !== todo.id);
        this.props.deleteTodo(todos);
    }

    handleChange = (e) => {
        const newTodo = { ...this.state.newTodo };
        newTodo['action'] = e.currentTarget.value;
        this.setState({ newTodo: newTodo });
    }

    handleDateChange = (date) => {
        const newTodo = { ...this.state.newTodo };
        if (date) {
            newTodo['dateAdded'] = date.format(dateFormat);
        } else {
            newTodo['dateAdded'] = null;
        }
        this.setState({ newTodo: newTodo });
    }

    handleSave = () => {
        this.setState({
            ModalText: 'Saving...',
            confirmLoading: true,
        });
        setTimeout(() => {
            if (this.state.isEdit) {
                const updatedItem = { ...this.state.newTodo }
                const todos = this.props.todos.map((todo) => { return todo.id === updatedItem.id ? { ...updatedItem } : todo });
                this.props.editTodo(todos);
            } else {
                const newTodo = { ...this.state.newTodo };
                newTodo['id'] = this.props.todos.length + 1;
                this.props.createTodoItem(newTodo);
            }
            const todo = {
                action: null,
                dateAdded: moment().format(dateFormat),
                isCompleted: false,
                id: null
            }
            this.setState({
                visible: false,
                confirmLoading: false,
                newTodo: todo,
                isEdit: false
            });
        }, 2000);
    };

    markAsDone = (todo) => {
        const updatedItem = { ...todo, isCompleted: !todo.isCompleted }
        const todos = this.props.todos.map((todo) => { return todo.id === updatedItem.id ? { ...updatedItem } : todo });
        this.props.markTodoAsDone([...todos]);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };



    render() {
        const { initLoading } = this.state;
        const { visible, confirmLoading, ModalText } = this.state

        return (
            <>
                <Row align={"middle"}>
                    <Col lg={2}>
                        <Button onClick={this.addTodo} type="primary">Add Todo</Button>
                    </Col>
                    <Col lg={22}>
                        <span className={styles.pr}>Total tasks : <span className={styles.bold}>{this.props.todos.length}</span> </span>
                        <span className={styles.pr}>Tasks Remaining : <span className={styles.bold}>{this.props.todos.filter(t => !t.isCompleted).length}</span> </span>
                        <span>Tasks Completed: <span className={styles.bold}>{this.props.todos.filter(t => t.isCompleted).length}</span></span>
                    </Col>
                </Row>
                <ModalDialog
                    handleCancel={this.handleCancel}
                    handleOk={this.handleSave}
                    confirmLoading={confirmLoading}
                    visible={visible} title={ModalText}
                    handleDateChange={this.handleDateChange}
                    handleChange={this.handleChange} todo={this.state.newTodo} />
                <List
                    className="demo-loadmore-list"
                    header={<div className={styles.container + " " + styles.heading}>
                        <div>Action    </div>
                        <div className={styles.dateadded}>Date Added</div>
                        <div>Operation</div>
                    </div>}
                    loading={initLoading}
                    itemLayout="horizontal"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.props.todos}
                    renderItem={(item, key) => (
                        <div className={styles.container}>
                            <List.Item key={key}>
                                <div className={item.isCompleted ? styles.completed : ''}>{item.action} </div>
                            </List.Item>
                            <List.Item>
                                <div>{item.dateAdded}</div>
                            </List.Item>
                            <List.Item>
                                <div className={styles.container}>
                                    <div>
                                        <a onClick={() => this.editTodo(item)}>Edit</a>
                                    </div>
                                    <div className={styles.actions}> | </div>
                                    <div>
                                        <a onClick={() => this.markAsDone(item)}>{item.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}</a>
                                    </div>
                                    <div className={styles.actions}> | </div>
                                    <div>
                                        <a onClick={() => this.deleteTodo(item)}>Delete</a>
                                    </div>
                                </div>
                            </List.Item>
                        </div>
                    )}
                />
            </>
        );
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    todos: state.todos.todos
});

export default connect(mapStateToProps, { createTodoItem, markTodoAsDone, editTodo, deleteTodo })(Todos);
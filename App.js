import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, ImageBackground, ScrollView} from 'react-native';
import {Button, Avatar} from 'react-native-elements';

import {Font} from 'expo';
import TaskList from './src/components/TaskList.js';
import Categories from './src/components/Categories.js';
import AddTaskButton from './src/components/AddTaskButton.js';
import Editor from './src/components/Editor.js';
import Fade from './src/components/Fade.js';
import styles from './src/style/styles.js';

require('datejs');

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            todo: {
                categories: [
                    {
                        title: "School",
                        subtitle: "Homework, Tests, Assignments",
                        css: styles.category,
                    },
                    {
                        title: "Shopping List",
                        subtitle: "",
                        css: styles.category,
                    },
                    {
                        title: "Lifestyle",
                        subtitle: "",
                        css: styles.category,
                    },
                    {
                        title: "Lifestyle",
                        subtitle: "",
                        css: styles.category,
                    }
                ],
                list : [
                    {
                        name : "Meeting tomorrow",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "Hello World",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "TODO",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "testing",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "TODO",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "TODO",
                        date : "June 1, 2018",
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name: "IMPORTANT",
                        date : "June 1, 2018",
                        priority : 2,
                        category: 1,
                        done : false,
                    },
                    {
                        name:"Hello",
                        date : "June 1, 2018",
                        priority: 3,
                        category: 2,
                        done : false,
                    },
                ],
                curList: [],
                currentCategory: 0,
            },
            bgImages: [
                './src/assets/images/bg1.jpg',
                './src/assets/images/bg2.jpg',
                './src/assets/images/bg3.jpg',
                './src/assets/images/bg4.jpg',
                './src/assets/images/bg5.jpg'
            ],
            fontLoaded : false,
            placeholder : "Input Task Here",
            inputVisible: false,
            swipeableToggle: false,
        }

        this.state.todo.curList = this.state.todo.list.filter(el => el.category === 0)

        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('./src/assets/fonts/Georgia.ttf'),
            'regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
            'light': require('./src/assets/fonts/Montserrat-Light.ttf'),
            'bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
            'Arial': require('./src/assets/fonts/Arial.ttf')
        });
        console.log("FONT LOADED");
        this.setState({fontLoaded: true });
        console.log(this.state.fontLoaded);
    }

    addTask(task) {
        console.log("Add Task Parent");
        console.log(task);
        let list = this.state.todo.list;
        let newList = [task].concat(list);
        console.log(newList);
        this.setState(({todo}) =>
            ({todo: {
                ...todo,
                list: newList,
                curList: newList.filter(el => el.category === this.state.todo.currentCategory)
            }})
        );
    }

    deleteTask(id) {
        console.log("DELETING " + id);
        let newList = this.state.todo.list.filter(el => el !== id);

        this.setState(({todo}) =>
            ({todo: {
                    ...todo,
                    list: newList,
                    curList: newList.filter(el => el.category === this.state.todo.currentCategory)
                }})
        );
    }

    changeInputVisible() {
        this.setState({inputVisible: !this.state.inputVisible});
    }

    changeCategoryView(index) {
        let newCurList;
        newCurList = this.state.todo.list.filter(el => el.category === index);
        this.setState({swipeableToggle: !this.state.swipeableToggle});
        this.setState(({todo}) =>
            ({todo: {
                    ...todo,
                    curList: newCurList,
                    currentCategory: index,
                }})
        );
    }

    toggleTaskDone(el) {
        let newList = this.state.todo.list;
        newList[newList.indexOf(el)].done = !newList[newList.indexOf(el)].done;

        this.setState(({todo}) =>
            ({todo: {
                    ...todo,
                    list: newList,
                    curList: newList.filter(el => el.category === this.state.todo.currentCategory)
                }})
        );
    }

    render() {
        /*DATE JS TESTING
        let d1 = new Date(Date.parse('tomorrow 8am'));
        d1.setMinutes(d1.getMinutes() - d1.getTimezoneOffset())
        console.log(d1);
        console.log(d1.getTimezone());
        */

        return (
            <View style = {styles.container}>
                {this.state.fontLoaded ?
                    <View>
                        <Categories
                            changeCategoryView={this.changeCategoryView.bind(this)}
                            categories={this.state.todo.categories}

                        />

                        <TaskList
                            deleteTask={this.deleteTask}
                            list={this.state.todo.curList}
                            toggleTaskDone={this.toggleTaskDone.bind(this)}
                            swipeableToggle = {this.state.swipeableToggle}
                        />

                        <Fade
                            visible = {this.state.inputVisible}
                            style = {styles.editorFade}
                        >
                            <Editor addTask={this.addTask} changeInputVisible = {this.changeInputVisible.bind(this)} categories = {this.state.todo.categories}/>
                        </Fade>

                        <AddTaskButton changeInputVisible={this.changeInputVisible.bind(this)}/>
                    </View> :
                <Text>Loading...</Text>
            }
            </View>
        );
    }
}
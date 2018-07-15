import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, ImageBackground, ScrollView} from 'react-native';
import {Button, Avatar} from 'react-native-elements';

import {Font} from 'expo';
import TaskList from './src/components/TaskList.js';
import Categories from './src/components/Categories.js';
import AddTaskButton from './src/components/AddTaskButton.js';
import AddTask from './src/components/AddTask.js';
import Fade from './src/components/Fade.js';
import styles from './src/style/styles.js';
import MenuButton from "./src/components/MenuButton.js";
import SideMenu from './src/components/SideMenu.js'
import Drawer from "react-native-drawer";
import AddCategory from './src/components/AddCategory.js';

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
                        bg: require('./src/assets/images/school.jpg')
                    },
                    {
                        title: "Shopping List",
                        subtitle: "",
                        css: styles.category,
                        bg: require('./src/assets/images/bg2.jpg')
                    },
                    {
                        title: "Lifestyle",
                        subtitle: "",
                        css: styles.category,
                        bg: require('./src/assets/images/bg1.jpg')
                    },
                    {
                        title: "Miscellaneous",
                        subtitle: "The odd-ball tasks",
                        css: styles.category,
                        bg: require('./src/assets/images/bg3.jpg')
                    }
                ],
                list : [
                    {
                        name : "Robotics Meeting Tomorrow",
                        date : new Date(),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "Computer Science Project",
                        date : new Date(),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "Physics Homework",
                        date : new Date(),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "Chemistry Test on Friday",
                        date : new Date(Date.parse("next friday")),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "TODO",
                        date : new Date(),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name : "TODO",
                        date : new Date(),
                        priority : 1,
                        category: 0,
                        done : false,
                    },
                    {
                        name: "IMPORTANT",
                        date : new Date(),
                        priority : 2,
                        category: 1,
                        done : false,
                    },
                    {
                        name:"Run 5k",
                        date : new Date(),
                        priority: 3,
                        category: 2,
                        done : false,
                    },
                    {
                        name:"Dinner tomorrow",
                        date : new Date(Date.parse("tomorrow")),
                        priority: 3,
                        category: 2,
                        done : false,
                    },
                    {
                        name:"Go downtown on Friday",
                        date : new Date(Date.parse("next friday")),
                        priority: 3,
                        category: 2,
                        done : false,
                    },
                    {
                        name:"Do the laundry",
                        date : new Date(Date.parse("next friday")),
                        priority: 3,
                        category: 3,
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
            inputVisibleCat: false,
            swipeableToggle: false,
            menuActive: false,
            menuCategoryIndex: 0,
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
        let list = this.state.todo.list;
        let newList = [task].concat(list);
        this.setState(({todo}) =>
            ({todo: {
                ...todo,
                list: newList,
                curList: newList.filter(el => el.category === this.state.todo.currentCategory)
            }})
        );
    }

    addCategory(category) {
        let cat = this.state.todo.categories;
        let newCat = cat.concat(category);
        console.log(newCat);
        this.setState(({todo}) =>
            ({todo: {
                    ...todo,
                    categories: newCat
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

    changeInputVisibleCat() {
        this.setState({inputVisibleCat: !this.state.inputVisibleCat});
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

    menuSelectCategory(index) {
        this.setState({menuCategoryIndex: index});
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

    toggleMenu() {
        this.setState({menuActive: true});
    }

    closeDrawer() {
        console.log("close drawer");
        this.setState({menuActive: false});
    }

    render() {
        return (
            <View style = {styles.container}>
                {this.state.fontLoaded ?
                    <View>
                        <View style={{height:'40%'}}>
                            <Drawer
                                open = {this.state.menuActive}
                                type = 'static'
                                tapToClose = {true}
                                openDrawerOffset = {0.3}
                                closedDrawerOffset = {0}
                                content={
                                    <SideMenu
                                        categories = {this.state.todo.categories}
                                        menuSelectCategory = {this.menuSelectCategory.bind(this)}
                                        active = {this.state.menuActive}
                                        changeInputVisibleCat = {this.changeInputVisibleCat.bind(this)}
                                    />
                                }
                                onClose = {this.closeDrawer.bind(this)}
                            >
                                <View style = {{flex:1}}>
                                    <Categories
                                        changeCategoryView={this.changeCategoryView.bind(this)}
                                        categories={this.state.todo.categories}
                                        index = {this.state.menuCategoryIndex}
                                    />

                                    <MenuButton
                                        toggleMenu = {this.toggleMenu.bind(this)}
                                    />
                                </View>
                            </Drawer>
                        </View>



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
                            <AddTask addTask={this.addTask} changeInputVisible = {this.changeInputVisible.bind(this)} categories = {this.state.todo.categories}/>
                        </Fade>

                        <Fade
                            visible = {this.state.inputVisibleCat}
                            style = {styles.editorFade}
                        >
                            <AddCategory addCategory={this.addCategory.bind(this)} changeInputVisibleCat = {this.changeInputVisibleCat.bind(this)} categories = {this.state.todo.categories}/>
                        </Fade>

                        <AddTaskButton changeInputVisible={this.changeInputVisible.bind(this)}/>

                    </View>
                     :
                <Text>Loading...</Text>
            }
            </View>
        );
    }
}
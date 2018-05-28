import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, Dimensions} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Swipeout from 'react-native-swipeout';
import {Font} from 'expo';

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
                    }
                ],
                list : [
                    {
                        name : "TODO",
                        priority : 1,
                        category: 0,
                    },
                    {
                        name: "IMPORTANT",
                        priority : 2,
                        category: 1,
                    },
                    {
                        name:"Hello",
                        priority: 3,
                        category: 1,
                    },
                ],
                curList: [],
                currentCategory: 0,
            },
            fontLoaded : false,
            placeholder : "Input Task Here",
            inputVisible: false,
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
        console.log("hello"+this.state.inputVisible);
        this.setState({inputVisible: !this.state.inputVisible});
    }

    changeCategoryView(index) {
        console.log(index);
        let newCurList;
        newCurList = this.state.todo.list.filter(el => el.category === index);

        this.setState(({todo}) =>
            ({todo: {
                    ...todo,
                    curList: newCurList,
                    currentCategory: index,
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

        console.log(this.state.fontLoaded);

        return (
            <View style = {styles.container}>
                {this.state.fontLoaded ?
                    <View>
                        <Categories
                            changeCategoryView={this.changeCategoryView.bind(this)}
                            categories={this.state.todo.categories}

                        />

                        <TaskList deleteTask={this.deleteTask} list={this.state.todo.curList}/>

                        <Fade
                            visible={this.state.inputVisible}
                            style={styles.inputTextStyleFade}
                        >
                            <InputTask addTask={this.addTask}/>
                        </Fade>

                        <AddTaskButton changeInputVisible={this.changeInputVisible.bind(this)}/>
                    </View> :
                <Text>Loading...</Text>
            }
            </View>
        );
    }
}

class Categories extends Component {
    changeCategoryView(index) {
        this.props.changeCategoryView(index);
    }
    render() {
        return (
            <Swiper
                showsButtons
                onIndexChanged={(index) => this.changeCategoryView(index)}
                loop={false}
            >
                {
                    this.props.categories.map((item, key) => {
                        return (
                            <View style={item.css}>
                                <Text style={styles.categoryTitle}>{item.title}</Text>
                            </View>
                        )
                    })
                }

            </Swiper>
        )
    }
}

class AddTaskButton extends Component {
    changeInputVisible() {
        console.log("Change inputVisible");
        this.props.changeInputVisible();
    }

    render() {
        return <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.changeInputVisible.bind(this)}
            title="Add Task"
            color="#6395d1"
            accessibilityLabel="Add Task"
        >
            <Image
                style={styles.imageStyle}
                source={require('./src/assets/images/plus-button.png')}
            />
        </TouchableOpacity>
    }
}

class InputTask extends Component {
    constructor() {
        super();
        this.state = {
            text : "",
        }
    }

    addTask(name) {
        let task = {
            name: name,
            priority: 4,
        };
        this.props.addTask(task);
    }

    render() {
        console.log("INPUT RENDER");
        return (
            <View>
                <TextInput
                    style={styles.inputTextStyle}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    autoFocus={true}
                />
                <Button
                    title="Add Task"
                    onPress= {this.addTask.bind(this, this.state.text)}
                />
            </View>
        )
    }
}

class TaskList extends Component {
    deleteTask(id) {
        this.props.deleteTask(id);
    }
    renderFlag(flag) {
        return (
            <View style = {{flexDirection: 'row'}}>

            </View>
        )

    }

    render() {
        let list = this.props.list;

        return (
            <FlatList
                style = {styles.listStyle}
                /*ItemSeparatorComponent={() =>
                    <View
                        style={{
                            backgroundColor: 'gray',
                            height: 0.5,
                        }}
                    />
                }*/
                data = {list}

                renderItem={({item}) => {
                    let swipeBtnsRight = [
                        {
                            text: 'Edit',
                            backgroundColor: 'orange',
                            underlayColor: 'rgba(0, 0, 0, 0.6)',
                            onPress: () => {console.log("editing " + item.name);}
                        },
                        {
                            text: 'Delete',
                            backgroundColor: 'red',
                            underlayColor: 'rgba(0, 0, 0, 0.6)',
                            onPress: () => { this.deleteTask(item) }
                        },
                    ];

                    let swipeBtnsLeft = [{
                       text: 'Edit',
                       backgroundColor: 'orange',
                       underlayColor: 'rgba(0, 0, 0, 0.6)',
                       onPress: () => {console.log("editing " + item.name);}
                    }];

                    return (
                        <View style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>

                            <Swipeout right={swipeBtnsRight}
                                    left = {swipeBtnsLeft}
                                    autoClose={true}
                                    backgroundColor= 'transparent'
                                    //backgroundColor = '#FF0000'
                                      style = {{width: '100%', height: '100%'}}
                                    //style={{height: 60, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                        >
                            <View style = {{height: '100%'}}>
                                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'regular', fontSize: 15, marginLeft: 15, color: 'gray'}}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
                                    <View style={{ backgroundColor: 'rgba(220,230,218,1)', width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
                                        <Icon
                                            name='md-arrow-dropup'
                                            color='green'
                                            size={25}
                                        />
                                        <Text style={{color: 'green', fontFamily: 'regular', fontSize: 13, marginLeft: 5}}>200</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'rgba(222,222,222,1)', width: 35, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                                        <Icon
                                            name='md-person-add'
                                            color='gray'
                                            size={20}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Swipeout>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
    inputTextStyle: {
        position: 'absolute',
        height: 40,
        width: '80%',
        top: 40,
        alignSelf:'center',
        backgroundColor: '#AAA',
    },
    inputTextStyleFade: {
        position: 'absolute',
        height: 40,
        width: '80%',
        top: 40,
        alignSelf:'center',
    },
    listStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#FAFAFA',
        paddingVertical: 8
    },
    buttonStyle: {
        position: 'absolute',
        bottom: '5%',
        right: '2%',
        //backgroundColor: '#AAA',
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    category: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});


class Fade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
        };
    };

    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.setState({ visible: true });
        }
        Animated.timing(this._visibility, {
            toValue: nextProps.visible ? 1 : 0,
            duration: 200,
        }).start(() => {
            this.setState({ visible: nextProps.visible });
        });
    }

    render() {
        console.log("FADE RENDER");
        const { visible, style, children} = this.props;

        const containerStyle = {
            opacity: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            /*transform: [
                {
                    scale: this._visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],*/
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View style={this.state.visible ? combinedStyle : containerStyle}>
                {this.state.visible ? children : null}
            </Animated.View>
        );
    }
}

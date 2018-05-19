import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, Dimensions, ScrollView} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
require('datejs');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            list : [
                {
                    name : "TODO",
                    priority : 1,
                },
                {
                    name: "IMPORTANT",
                    priority : 2,
                },
                {
                    name:"Hello",
                    priority: 3,
                },
            ],
            placeholder : "Input Task Here",
            inputVisible: false,

        }
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(task) {
        console.log("Add Task Parent");
        console.log(task);
        let list = this.state.list;
        let newList = [task].concat(list);
        console.log(newList);
        this.setState({list: newList});
    }

    deleteTask(id) {
        console.log(id);
        //let list = this.state.list;
        //list.splice(id, 1);
        //this.setState({list: list});
        this.setState(prevState => ({
            list: prevState.list.filter(el => el !== id)
        }));
    }

    changeInputVisible() {
        console.log("hello"+this.state.inputVisible);
        this.setState({inputVisible: !this.state.inputVisible});
    }

    render() {
        let d1 = new Date(Date.parse('tomorrow 8am'));
        d1.setMinutes(d1.getMinutes() - d1.getTimezoneOffset())
        console.log(d1);
        console.log(d1.getTimezone());

        return (
            <View style={styles.container}>

                <View style={{height:60, width: SCREEN_WIDTH, marginTop: 20}}>
                    <ScrollView
                        style={{flex: 1}}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                    >
                        <View style={{ marginLeft: 40, marginRight: 10}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <CustomButton title="Philosophy" selected={true} />
                                <CustomButton title="Sport" />
                                <CustomButton title="Swimming" selected={true} />
                                <CustomButton title="Religion" />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <TaskList deleteTask= {this.deleteTask} list = {this.state.list}/>
                <Fade
                    visible = {this.state.inputVisible}
                    style={styles.inputTextStyleFade}
                >
                    <InputTask addTask={this.addTask}/>
                </Fade>
                <AddTaskButton changeInputVisible={this.changeInputVisible.bind(this)}/>
            </View>
        );
    }
}

class CustomButton extends Component {
    constructor() {
        super();

        this.state = {
            selected: false
        };
    }

    componentDidMount() {
        const { selected } = this.props;

        this.setState({
            selected
        });
    }

    render() {
        const { title } = this.props;
        const { selected } = this.state;

        return (
            <Button
                title={title}
                titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
                buttonStyle={selected ? { backgroundColor: 'rgba(213, 100, 140, 1)', borderRadius: 100, width: 127 } : { borderWidth: 1, borderColor: 'white', borderRadius: 30, width: 127, backgroundColor: 'transparent' }}
                containerStyle={{ marginRight: 10 }}
                onPress={() => this.setState({ selected: !selected })}
            />
        );
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
                source={require('./src/assets/plus-button.png')}
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

    render() {
        let list = this.props.list;

        return (
            <FlatList
                style = {styles.listStyle}
                ItemSeparatorComponent={() =>
                    <View
                        style={{
                            backgroundColor: 'gray',
                            height: 0.5,
                        }}
                    />
                }
                data = {list}

                renderItem={({item}) => {
                    let swipeBtnsRight = [{
                        text: 'Delete',
                        backgroundColor: 'red',
                        underlayColor: 'rgba(0, 0, 0, 0.6)',
                        onPress: () => { this.deleteTask(item) }
                    }];

                    let swipeBtnsLeft = [{
                       text: 'Edit',
                       backgroundColor: 'orange',
                       underlayColor: 'rgba(0, 0, 0, 0.6)',
                       onPress: () => {console.log("editing " + item.name);}
                    }];

                    return (
                        <Swipeout right={swipeBtnsRight}
                                  left = {swipeBtnsLeft}
                                  autoClose={true}
                                  backgroundColor= 'transparent'
                        >
                            <ListItem
                                title={item.name}
                                subtitle="May 15, 2018"
                                hideChevron={true}
                            />

                        </Swipeout>
                )}}
            />
        );
    }
}

/*class InputTask extends Component {
    constructor() {
        super();
        this.state = {
            text : "",
            inputVisible: false,
        }
    }
    addTask(task) {
        this.props.addTask(task);
    }
    changeInputVisible() {
        this.state.inputVisible = !this.state.inputVisible;
        console.log("hello"+this.state.inputVisible);
    }

    render() {
        return  (
            <View style = {styles.inputContainer}>
                {
                    this.state.inputVisible ? <TextInput
                        style={styles.inputTextStyle}
                        onChangeText={(text) => this.setState({text})}
                        placeholder={this.props.placeholder}
                        value={this.state.text}
                    /> : null
                }

                <TouchableOpacity
                    style = {styles.buttonStyle}
                    onPress={this.changeInputVisible()}
                    title="Add Task"
                    color="#6395d1"
                    accessibilityLabel="Add Task"
                >
                <Image
                    style={styles.imageStyle}
                    source={require('./src/assets/plus-button.png')}
                />
                </TouchableOpacity>
            </View>
        )
    }
}*/

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
        backgroundColor: '#FFFFFF',
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

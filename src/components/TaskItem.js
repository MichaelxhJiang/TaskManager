import React, {Component} from "react";
import  { View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../style/styles.js';
import Swipeable from 'react-native-swipeable'


export default class TaskItem extends Component {
    state = {
        leftActionActivated: false,
        toggle: false,
        swipeableToggle: false
    };

    isSwiping() {
        console.log("Swipe Start");
        this.props.isSwiping();
    }
    notSwiping() {
        console.log("Swipe Release");
        this.props.notSwiping();
    }
    deleteTask(el) {
        this.swipeable.recenter();
        this.props.deleteTask(el);
    }
    editTask() {
        //TODO
    }

    render() {
        const {leftActionActivated, toggle} = this.state;

        return (
            <Swipeable
                onRef={ref => this.swipeable = ref}
                leftActionActivationDistance={200}
                leftContent={(
                    <View style={[styles.leftSwipeItem, {backgroundColor: 'green'}]}>
                        {leftActionActivated ?
                            <Icon
                                name='md-checkmark-circle-outline'
                                color='white'
                                size={40}
                            /> :
                            <Image
                                style={{height: 50, width: 100}}
                                source={require('../assets/images/swipeArrow.png')}
                                resizeMode="contain"
                            />
                        }
                    </View>
                )}
                onLeftActionActivate={() => this.setState({leftActionActivated: true})}
                onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
                onLeftActionComplete={() => this.props.toggleTaskDone()/*this.setState({toggle: !toggle})*/}

                rightButtons={[
                    <TouchableOpacity
                        style={[styles.rightSwipeItem, {backgroundColor: 'orange'}]}
                        onPress = {this.editTask()}
                    >
                        <Text>Edit</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity
                        style={[styles.rightSwipeItem, {backgroundColor: 'red'}]}
                        onPress = {this.deleteTask.bind(this, this.props.item)}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease={this.props.itemProps.onOpen}
                onRightButtonsCloseRelease={this.props.itemProps.onClose}
            >
                <View style={[styles.listItem, {backgroundColor: '#333'}]}>
                    <View style={{flex: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'regular', fontSize: 18, marginLeft: 15, color: this.props.item.done ? 'gray' : 'white', textDecorationLine: this.props.item.done ? 'line-through' : undefined}}>
                            {this.props.item.name}
                        </Text>
                        <Text style={{fontSize: 15, marginLeft: 15, color: 'gray'}}>
                            {this.props.item.date}
                        </Text>
                    </View>
                    {/*<View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
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
                    </View>*/}
                </View>
            </Swipeable>
        );
    }
}
import React, {Component} from "react";
import  { View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../style/styles.js';
import Swipeable from 'react-native-swipeable'


export default class TaskItem extends Component {
    state = {
        leftActionActivated: false,
        toggle: false,
        swipeableToggle: false,
        weekday : [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Sunday",
        ],
        month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
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
        this.props.itemProps.onClose();
        this.props.deleteTask(el);
    }
    editTask() {
        //TODO
    }

    render() {
        const {leftActionActivated, toggle} = this.state;
        const {date} = this.props.item;

        let dateFormat = date ? this.state.weekday[date.getDay()] + ", " + this.state.month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() : "";

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
                            {dateFormat}
                        </Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
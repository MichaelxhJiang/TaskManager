import React, {Component} from "react";
import {StyleSheet, FlatList, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-swipeable';
import TaskItem from './TaskItem.js';
//import styles from '../style/styles.js';

export default class TaskList extends Component {

    state = {
        currentlyOpenSwipeable: null,
        isSwiping: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.swipeableToggle !== this.props.swipeableToggle) {
            let cos = this.state.currentlyOpenSwipeable;
            if (cos) {
                cos.recenter();
            }
        }
    }

    isSwiping() {
        //this.setState({isSwiping: true});
        console.log("TRUE " + this.state.isSwiping);
    }

    notSwiping() {
        //this.setState({isSwiping: false});
        console.log("FALSE " + this.state.isSwiping);
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };

    toggleTaskDone(el) {
        this.props.toggleTaskDone(el);
    }

    render() {
        let list = this.props.list;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
                let currentlyOpenSwipeable = this.state.currentlyOpenSwipeable;

                if (currentlyOpenSwipeable !== null) {
                    currentlyOpenSwipeable.recenter();
                }

                this.setState({currentlyOpenSwipeable: swipeable});
            },
            onClose: () => {
                this.setState({currentlyOpenSwipeable: null})
            }
        };

        return (
            <FlatList
                onScroll={this.handleScroll}
                data = {list}
                scrollEnabled={!this.state.isSwiping}

                renderItem={({item, index}) => {
                    return (
                        <View style={{ marginHorizontal: 0, marginTop: 5, backgroundColor: 'black', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                            <TaskItem
                                itemProps = {itemProps}
                                isSwiping={this.isSwiping.bind(this)}
                                notSwiping={this.notSwiping.bind(this)}
                                item = {item}
                                toggleTaskDone={this.toggleTaskDone.bind(this, item)}
                                deleteTask = {this.props.deleteTask}
                            />

                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}
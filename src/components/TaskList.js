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
        console.log("INDEX IS " + el);
        this.props.toggleTaskDone(el);
    }

    render() {
        let list = this.props.list;

        const {currentlyOpenSwipeable} = this.state;
        const itemProps = {
            onOpen: (event, gestureState, swipeable) => {
                if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                    currentlyOpenSwipeable.recenter();
                }

                this.setState({currentlyOpenSwipeable: swipeable});
            },
            onClose: () => this.setState({currentlyOpenSwipeable: null})
        };

        return (
            <FlatList
                onScroll={this.handleScroll}
                style={styles.container}
                data = {list}
                scrollEnabled={!this.state.isSwiping}

                renderItem={({item, index}) => {
                    return (
                        <View style={{height: 60, marginHorizontal: 0, marginTop: 5, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                            <TaskItem
                                itemProps = {itemProps}
                                isSwiping={this.isSwiping.bind(this)}
                                notSwiping={this.notSwiping.bind(this)}
                                item = {item}
                                toggleTaskDone={this.toggleTaskDone.bind(this, item)}/>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

class Example3 extends Component {

    state = {
        leftActionActivated: false,
        toggle: false
    };

    isSwiping() {
        console.log("Swipe Start");
        this.props.isSwiping();
    }
    notSwiping() {
        console.log("Swipe Release");
        this.props.notSwiping();
    }

    deleteTask(id) {
        this.props.deleteTask(id);
    }

    //TODO
    renderFlag(flag) {
        return (
            <View style = {{flexDirection: 'row'}}>

            </View>
        )

    }

    render() {
        const {leftActionActivated, toggle} = this.state;

        return (

            <Swipeable
                leftActionActivationDistance={100}
                leftContent={(
                    <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue'}]}>
                        {leftActionActivated ?
                            <Text>release!</Text> :
                            <Text>keep pulling!</Text>}
                    </View>
                )}
                onLeftActionActivate={() => this.setState({leftActionActivated: true})}
                onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
                onLeftActionComplete={() => this.setState({toggle: !toggle})}

                rightButtons={[
                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
                        <Text>1</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
                        <Text>2</Text>
                    </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease={this.props.itemProps.onOpen}
                onRightButtonsCloseRelease={this.props.itemProps.onClose}

                onSwipeMove={this.isSwiping()}
                onSwipeComplete={this.notSwiping()}
            >
                <View style={[styles.listItem, {backgroundColor: toggle ? 'thistle' : 'darkseagreen'}]}>
                    <Text>Example 3</Text>
                </View>
            </Swipeable>
        );
    }

    /*
    state = {
        leftActionActivated: false,
        toggle: false,
        currentlyOpenSwipeable: null,
        isSwiping: false,
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;

        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };



    isSwiping() {
        //this.setState({isSwiping: true});
        console.log("TRUE " + this.state.isSwiping);
    }

    notSwiping() {
        //this.setState({isSwiping: false});
        console.log("FALSE " + this.state.isSwiping);
    }

    handleScroll() {
        const {currentlyOpenSwipeable} = this.state;

        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };

    render() {
        let list = this.props.list;

        return (
            <FlatList
                style = {styles.listStyle}
                data = {list}
                scrollEnabled={!this.state.isSwiping}
                onScroll={this.handleScroll}

                renderItem={({item}) => {
                    return (
                        <View style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
                            <TaskItem isSwiping = {this.isSwiping.bind(this)} notSwiping={this.notSwiping.bind(this)} item = {item}/>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />

        );
    }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    listItem: {
        height: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },

});
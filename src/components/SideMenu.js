import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, Animated, ImageBackground, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';

export default class SideMenu extends Component {
    menuSelectCategory(id) {
        this.props.menuSelectCategory(id);
    }

    changeInputVisibleCat() {
        console.log("Change inputVisible");
        this.props.changeInputVisibleCat();
    }

    render() {
        return (
            <View style = {{flex:1, backgroundColor:'#000'}}>
                <ScrollView style={{flex:1}}>
                    {
                        this.props.categories.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style = {{marginTop:5, top:10}}
                                    onPress = {this.props.menuSelectCategory.bind(this, index)}
                                    key={index}
                                >
                                    <View
                                        style={{
                                            height: 50,
                                            width:'100%',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            backgroundColor: '#444'
                                        }}
                                    >
                                        <Text style={{left:5,fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold', color:'white', width:'100%'}}>
                                            {item.title}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>

                <Button
                    titleStyle={{
                        fontFamily: 'bold',
                        fontSize: 18,
                        width:'100%'
                    }}
                    buttonStyle={{
                        backgroundColor: '#005aaa',
                    }}
                    title="Add New"
                    onPress= {this.changeInputVisibleCat.bind(this)}
                />
            </View>
        )
    }
}
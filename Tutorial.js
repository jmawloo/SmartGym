import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';

const Tutorial = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.circle}>
                <Image style={styles.emoticon} source={props.image}/>
            </TouchableOpacity>
            <Text style={styles.itemText}>{props.text}</Text>
            <Text style={styles.learnMoreButton}>Learn More</Text>
            </View>
            <View color="red" style={styles.status}></View>
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius:30,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection:'row',
        alignItems: 'center',
        flexWrap:'wrap'
    },
    circle: {
        width:50,
        height:50,
        backgroundColor:'#E7E7E7',
        borderRadius: 30,
        marginRight:15,

    },
    itemText: {
        maxWidth: '80%'
    },
    status: {},
    emoticon: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        flexDirection: 'row'
    },
    itemText: {
        maxWidth: '80%',
    },
    learnMoreButton:{
        fontSize:12.5,
        flex: 2,
        marginTop:20,
        flexDirection: 'column',
        // alignSelf: 'flex-end',
        textAlign: 'right',
        color: '#00ABB3',
        justifyContent:'flex-end'

    }
    
    
});

export default Tutorial;
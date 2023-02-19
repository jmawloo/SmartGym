import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Machine = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.circle}>
                <Image style={styles.emoticon} source={props.image}/>
            </TouchableOpacity>
            <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View backgroundColor={props.statusColor} borderColor={props.statusColor} style={styles.status}></View>
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius:30,
        flexDirection:'row',
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
    status: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderRadius:10,

    },
    emoticon: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        flexDirection: 'row'
    },
    
});

export default Machine;
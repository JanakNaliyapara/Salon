import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";


const Button = ({ label, onPress, innerContainerStyle, isLoading }) => {
    
    return (
        <>
            <Pressable onPress={onPress} style={[styles.button, { ...innerContainerStyle }]}>
                {!!isLoading ? <ActivityIndicator size={'large'} color={colors.white} />
                    : <Text style={styles.text_button}>{label}</Text>
                }
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 55,
        backgroundColor: colors.yellow_dark,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.70,
        elevation: 3,
    },
    text_button: {
        fontFamily: fonts.semiBold,
        fontSize: 22,
        color: colors.white
    }
})

export default Button;
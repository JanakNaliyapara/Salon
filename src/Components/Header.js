import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Svg from "../assets/Svg/svgs";
import colors from "../utils/colors";
import fonts from "../utils/fonts";


const Header = ({ leftIcon, label, onPress }) => {

    const Svgs = Svg[leftIcon];

    return (
        <>

            <Pressable
                onPress={onPress}
                style={styles.header}>
                {leftIcon && <Svgs width={20} height={20} />}
                <Text style={styles.labels}>{label}</Text>
            </Pressable>
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    labels: {
        color: colors.black,
        fontFamily: fonts.medium,
        fontSize: 24,
        paddingLeft: 20
    }

})

export default Header;

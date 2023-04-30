import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Image, ImageBackground } from "react-native";
import colors from "../../utils/colors";
import images from "../../utils/images";




const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('ServiceCreate');
        }, 3000);
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Image source={images.logo} resizeMode="contain" style={styles.image} />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white_light
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    image: {
        width: 400,
        height: 400,
        tintColor: colors.yellow_dark
    }
})

export default Splash
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ScrollView, Platform } from "react-native";
import Button from "../../../Components/Buttons";
import Input from "../../../Components/Input";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import fonts from "../../../utils/fonts";
import Header from "../../../Components/Header";



const serviceCreate = ({ navigation }) => {


    return (

        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />

            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.mainContainer}>

                        <Header
                            onPress={() => navigation.goBack('')}
                            label={constants?.ServiceCreate}
                            leftIcon={"BackArrow"} />

                        <View style={styles.divider} />

                        <Input
                            label={constants?.title}
                            leftIcon={"Title"}
                            placeholder={constants?.title}

                        />
                        <Input
                            inputContainerStyle={{ height: 80 }}
                            label={constants?.short_description}
                            leftIcon={"Description"}
                            placeholder={constants?.short_description}
                            nol={2}
                            multiline={true}
                        />
                        <Input
                            inputContainerStyle={{ height: 80 }}
                            label={constants?.long_description}
                            leftIcon={"Description"}
                            placeholder={constants?.long_description}
                            nol={4}
                            multiline={true}
                        />
                        <Input
                            label={constants?.price}
                            placeholder={constants?.price}
                            leftIcon={"Price"}
                            keyboardType={"number-pad"}
                        />

                    </View>

                </ScrollView>

                <Button
                    onPress={() => navigation.navigate('ServiceImageUpload')}
                    innerContainerStyle={{ width: '90%', marginBottom: Platform.OS == "android" ? 10 : 5, marginTop: 10, alignSelf: "center" }}
                    label={constants?.Next} />
            </View>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginVertical: 30,
    },
    divider: {
        marginVertical: 10
    }
})

export default serviceCreate;
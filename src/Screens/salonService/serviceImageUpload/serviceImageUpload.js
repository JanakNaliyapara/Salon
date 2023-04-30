import React, { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import Header from "../../../Components/Header";
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import Button from "../../../Components/Buttons";

const ServiceImageUpload = ({ navigation }) => {

    const [image, setImage] = useState();

    const chooseImage = async () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option',
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        const response = await MultipleImagePicker.openPicker(options);
        console.log("Result :::", response);
        setImage(response?.assets[0])
    }



    return (
        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />

            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.mainContainer}>

                        <Header
                            onPress={() => navigation.goBack('')}
                            label={constants?.service_ImageUpload}
                            leftIcon={"BackArrow"} />

                        <View style={styles.divider} />

                        <Button
                            onPress={chooseImage}
                            label={"Service Image Upload"} />
                    </View>

                </ScrollView>

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


export default ServiceImageUpload;
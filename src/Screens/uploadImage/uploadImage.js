import React, { useState } from "react";

import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import colors from "../../utils/colors";
import * as Svg from "../../assets/Svg/svgs"
import fonts from "../../utils/fonts";
import { constants } from "../../utils/constants";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import images from "../../utils/images";
import { useDispatch } from "react-redux";
import { uploadLogo } from "../../redux/commonSlice";


const { width, height } = Dimensions.get('window');

const uploadImage = ({ navigation }) => {

    const dispatch = useDispatch();
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
        const result = await launchImageLibrary(options);
        console.log("Result :::", result);
        setImage(result?.assets[0])
    }


    const uploadImg = () => {
        let formData = new FormData();
        formData.append('logo', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
        });
        dispatch(uploadLogo(formData))
        console.log("Upload on Data ::", formData);
    }

    return (
        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />
            <View style={styles.container}>

                <View style={styles.mainContainer}>

                    <View style={{ flexDirection: "row", paddingTop: 20, alignItems: "center" }}>
                        <Pressable
                            style={styles.back_arrow}
                            onPress={() => navigation.goBack()}>
                            <Svg.BackArrow width={30} height={30} />
                        </Pressable>
                        <Text style={styles.businesstext}>{constants?.fillProfile}</Text>
                    </View>

                    <Pressable
                        onPress={chooseImage}
                        style={styles.imageUpload}>
                        {image ? (
                            <Image source={{ uri: image?.uri }} style={{ width: '100%', height: '100%' }} resizeMode={"cover"} />
                        ) : (
                            <>
                                <Image source={images.imageUpload} style={{ width: 50, height: 50 }} resizeMode={"contain"} />
                                <Text
                                    style={[styles.txt, { fontSize: 20, marginTop: 20 }]}
                                >
                                    {"Logo"}
                                </Text>
                                <Text
                                    style={[styles.txt, { width: '80%', marginTop: 10, textAlign: 'center', color: colors.gray }]}
                                >
                                    {"Upload your brand logo here"}
                                </Text>
                            </>
                        )}
                    </Pressable>
                </View>



            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 20 }}>
                <Pressable
                    onPress={() => navigation.navigate('SalonTime')}
                    style={styles.skipBtn}>
                    <Text
                        style={styles.txt}>
                        {"SKIP"}
                    </Text>
                </Pressable>

                <View style={{ width: 15 }} />
                <Pressable
                    onPress={uploadImg}
                    style={styles.nextBtn}>
                    <Text
                        style={[styles.txt, { color: colors.white }]}>
                        {"NEXT"}
                    </Text>
                </Pressable>
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
    back_arrow: {
        width: 70,
        height: 40,
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingTop: 10
    },
    businesstext: {
        fontFamily: fonts.medium,
        color: colors.black,
        fontSize: 20,
        textAlign: "center"
    },
    imageUpload: {
        width: 200,
        height: 200,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.gray,
        alignSelf: "center",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: 'dotted',
    },
    skipBtn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.yellow_dark,
        borderWidth: 1,
        backgroundColor: 'transparent',
        elevation: 0
    },
    nextBtn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.yellow_dark,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    txt: {
        fontFamily: fonts.semiBold,
        color: colors.black,
        fontSize: 15,
    }

})

export default uploadImage
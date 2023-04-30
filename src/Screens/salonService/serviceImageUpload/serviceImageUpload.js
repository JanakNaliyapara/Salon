import React, { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import Header from "../../../Components/Header";
import { openPicker } from "@baronha/react-native-multiple-image-picker";
import Button from "../../../Components/Buttons";
import * as Svg from "../../../assets/Svg/svgs"


const { width } = Dimensions.get('window');

const IMAGE_WIDTH = (width - 15) / 3;
const ServiceImageUpload = ({ navigation }) => {

    const [image, setImage] = useState([]);

    const chooseImage = async () => {
        const response = await openPicker({
            selectedAssets: image,
            isExportThumbnail: true,
            usedCameraButton: true,
            isCrop: true,
            isCropCircle: true,
            maxSelectedAssets: 6,
        });;
        console.log('response: ', response);
        setImage(response);
    }

    const onDelete = value => {
        console.log('value on ::', value);
        const data = image.filter(
            item =>
                item?.localIdentifier &&
                item?.localIdentifier !== value?.localIdentifier,
        );
        console.log('data delete ::', data);
        setImage(data);
    };

    const renderItem = ({ item, index }) => {
        return (
            <>
                <View style={{ marginTop: 20, flex: 1, }}>

                    <Image
                        resizeMode="center"
                        source={{
                            uri: item?.filename ?? item?.path,
                        }}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: width,
                            height: 200,
                            borderWidth: 1,
                        }}
                    />
                    <Pressable
                        onPress={() => onDelete(item)}
                        style={{
                            width: 25,
                            height: 25,
                            backgroundColor: colors.light_Yellow,
                            elevation: 5,
                            borderRadius: 20,
                            position: "absolute",
                            top: 0,
                            right: 0,
                            // left: 0,
                            bottom: 10,
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                        <Svg.Close width={20} height={20} />
                    </Pressable>

                </View>

            </>
        );
    };

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

                        {image.length == 2 ?
                            <FlatList
                                numColumns={1}
                                data={image}
                                keyExtractor={(item, index) =>
                                    (item?.filename ?? item?.path) + index
                                }
                                renderItem={renderItem}
                                style={{ marginHorizontal: 10 }}

                            />
                            :

                            <FlatList
                                numColumns={2}
                                data={image}
                                keyExtractor={(item, index) =>
                                    (item?.filename ?? item?.path) + index
                                }
                                renderItem={renderItem}
                                style={{ marginHorizontal: 10 }}

                            />
                        }

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
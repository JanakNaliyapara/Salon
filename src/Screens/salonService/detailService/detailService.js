import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Platform, FlatList, Image, TouchableOpacity, Pressable } from "react-native";
import Button from "../../../Components/Buttons";
import Input from "../../../Components/Input";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import Header from "../../../Components/Header";
import fonts from "../../../utils/fonts";
import images from "../../../utils/images";



const Detail_Service = ({ navigation }) => {


    return (

        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />

            <View style={styles.container}>



                <ScrollView>


                    <View style={styles.mainContainer}>

                        <Header
                            onPress={() => navigation.goBack('')}
                            label={constants?.Detail_Service}
                            leftIcon={"BackArrow"} />

                        <View style={styles.divider} />

                        <View style={styles.ImageView}>
                            <Image
                                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={[styles.title, { color: colors.yellow_dark }]}>
                                {'Title: '}<Text style={[styles.description]}>
                                    {'Hair Cut'}
                                </Text>
                            </Text>

                            <Text style={[styles.title, { color: colors.yellow_dark }]}>
                                {'Short Description: '}<Text style={[styles.description]}>
                                    {constants?.S_description}
                                </Text>
                            </Text>

                            <Text style={[styles.title, { color: colors.yellow_dark }]}>
                                {'Long Description: '}<Text style={[styles.description]}>
                                    {constants?.description}
                                </Text>
                            </Text>

                            <Text style={[styles.title, { color: colors.yellow_dark }]}>
                                {'Price: '}<Text style={[styles.description]}>
                                ₹ {'543.67'}
                                </Text>
                            </Text>
                        </View>


                    </View>

                    <Button
                        onPress={() => navigation.goBack('')}
                        innerContainerStyle={{ width: '90%', alignSelf: 'center' }}
                        label={"Save"} />

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
    },
    ImageView: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.black,
        borderStyle: "dotted",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        overflow: "hidden"
    },
    title: {
        color: colors.black,
        fontFamily: fonts.medium,
        fontSize: 20,
        marginTop: 10
    },
    description: {
        color: colors.black,
        fontFamily: fonts.regular,
        fontSize: 15
    }


})

export default Detail_Service;
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Platform,
    FlatList,
    Image,
    TouchableOpacity,
    Pressable
} from "react-native";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import Header from "../../../Components/Header";
import fonts from "../../../utils/fonts";
import images from "../../../utils/images";



const listView = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);


    return (

        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />

            <View style={styles.container}>



                <ScrollView>


                    <View style={styles.mainContainer}>

                        <Header
                            onPress={() => navigation.goBack('')}
                            label={constants?.Service}
                            leftIcon={"BackArrow"} />

                        <View style={styles.divider} />

                        <FlatList
                            data={"listView"}
                            renderItem={({ index, item }) => {
                                return (
                                    <>
                                        <Pressable
                                            onPress={() => navigation.navigate('DetailSrvice')}
                                            style={styles.listView}>
                                            <Image
                                                source={{ uri: index % 2 == 0 ? 'https://picsum.photos/seed/picsum/200/300' : 'https://picsum.photos/200/300?random=1' }}
                                                style={{ width: 80, height: 80, borderRadius: 4 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ flex: 1, marginLeft: 8 }}>
                                                <Text
                                                    style={styles.titleName}>
                                                    {'Hair Cut'}
                                                </Text>
                                                <Text
                                                    ellipsizeMode="tail"
                                                    numberOfLines={2}
                                                    style={[styles.shortName]}>
                                                    {constants?.S_description}
                                                </Text>
                                                <Text
                                                    style={styles.price}>
                                                    ₹ {'543.67'}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </>
                                )
                            }}
                        />
                    </View>

                </ScrollView>

                <Pressable
                    onPress={() => navigation.navigate('ServiceCreate')}
                    style={styles.floatingView}>
                    <Image source={images.plus} resizeMode="contain" style={styles.plusImg} />
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
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginVertical: 30,
    },
    divider: {
        marginVertical: 10
    },
    listView: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginBottom: 14,
        borderWidth: 1.5,
        borderColor: colors.light_Yellow,
    },
    titleName: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.semiBold,
    },
    shortName: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.gray,
        marginTop: 5
    },
    price: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.yellow_dark,
        marginTop: 5
    },
    floatingView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 50,
        backgroundColor: colors.yellow_dark,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    plusImg: {
        width: 25,
        height: 25,
        tintColor: colors.white
    }
})

export default listView;
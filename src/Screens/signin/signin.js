import React, { useState } from "react";
import { View, SafeAreaView, Pressable, StyleSheet, Text, ScrollView, Image, Platform } from "react-native";
import colors from "../../utils/colors";
import * as Svg from "../../assets/Svg/svgs"
import { constants } from "../../utils/constants";
import fonts from "../../utils/fonts";
import Input from "../../Components/Input";
import Button from "../../Components/Buttons";
import { generateOtp } from "../../redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";


const Signin = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userdata, isLoading } = useSelector(state => state.auth);

    const [errors, setErrors] = useState(true);

    const [value, setValue] = useState({
        mobile_number: ''
    });

    const onSigin = () => {
        let isValid = true;
        if (!value.mobile_number) {
            handleError('please enter mobileNumber', 'mobile_number'),
                isValid = false;
        }
        console.log(isValid, value);
        if (isValid) {
            const formData = {
                ...value
            }
            dispatch(generateOtp(formData))
        }
    }

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const handleOnChange = (text, input) => {
        setValue({ ...value, [input]: text });
    };


    return (

        <>
            <View style={styles.container}>
                <ScrollView >
                    <SafeAreaView style={{ backgroundColor: colors.yellow_dark }} />
                    <View style={{ width: '100%', paddingLeft: 30, paddingBottom: 30, justifyContent: 'flex-end', height: 300, backgroundColor: colors.yellow_dark }} >
                        <Image source={require('../../assets/Image/b4.png')} resizeMode="contain" style={{ width: 150, height: 150, top: 20, left: -20 }} />
                        <View style={styles.brandtxt}>
                            <Text style={styles.txt}>{constants?.Login_Account}</Text>
                        </View>
                    </View>

                    <View style={styles.mainContainer} >

                        <View style={styles.divider} />

                        <Input
                            label={constants?.Phone}
                            placeholder={constants?.Phone}
                            keyboardType={'number-pad'}
                            leftIcon={'Phone'}
                            onFocus={() => handleError(null, 'mobile_number ')}
                            onChangeText={(text) => handleOnChange(text, 'mobile_number')}
                            error={errors.mobile_number}
                        />


                        <View style={styles.divider} />

                        <Button
                            onPress={onSigin}
                            label={constants?.getOtp}
                            isLoading={isLoading}
                        />

                        <View style={styles.divider} />

                    </View>
                </ScrollView>

                <Pressable
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={[{ color: colors.gray, textAlign: "center", fontFamily: fonts.light, marginBottom: Platform.OS == "android" ? 10 : 0 }]}>
                        {"Don't have an account? "}
                        <Text style={{ color: colors.yellow_dark, fontFamily: fonts.bold }}>{constants?.SignUp}</Text>
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
    divider: {
        marginVertical: 10
    },
    brandtxt: {
        maxWidth: '60%',
        // top: 40,

    },
    txt: {
        color: colors.white,
        fontFamily: fonts.medium,
        fontSize: 35
    },
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginVertical: 50,

    },
    forgot: {
        color: colors.yellow_dark,
        fontFamily: fonts.semiBold,
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 10
    }
})


export default Signin;
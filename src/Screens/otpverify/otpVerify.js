import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Pressable } from "react-native";
import * as Svg from "../../assets/Svg/svgs"
import colors from "../../utils/colors";
import fonts from "../../utils/fonts";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from "../../Components/Buttons";
import { constants } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpData } from "../../redux/commonSlice";


const CELL_COUNT = 6;
const otpVerify = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const { userdata, isLoading } = useSelector(state => state.auth);
    const navRef = useRef();
    const { mobile_number, initialOtp } = route?.params

    const [value, setValue] = useState(initialOtp);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const onOtp = async () => {
        let isValid = true;
        if (!value) {
            isValid = false;
        }
        if (isValid) {
            console.log("PARAMS DATA ::", isValid, route?.params?.mobile_number, formData);
            const mobile_number = route?.params?.mobile_number
            const formData = {
                mobile_number: mobile_number,
                otp: value,
                device_id: '',
                device_token: '',
                device_type: '',

            }
            dispatch(verifyOtpData(formData))
        }
    }

    return (
        <>

            <SafeAreaView style={styles.container}>

                <View style={{ padding: 10, paddingVertical: 20 }}>
                    <View style={styles.divider} />
                    <Text style={styles.text}>{"Code has been send to +91 "}{mobile_number}</Text>
                </View>



                <View
                    style={{
                        padding: 20,
                    }}>
                    <CodeField
                        ref={ref}
                        {...props}
                        cellCount={CELL_COUNT}
                        value={value}
                        onChangeText={setValue}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                    <View style={styles.divider} />

                    <Text style={styles.txt_line}>{'Didn’t get OTP yet?  '}
                        <Text style={[styles.txt_line, { fontFamily: fonts.bold, color: colors.yellow_dark }]}>
                            {'Resend OTP'}
                        </Text></Text>

                </View>



            </SafeAreaView>

            <Button
                innerContainerStyle={{ width: '90%', alignSelf: "center", bottom: 30 }}
                onPress={onOtp}
                label={constants?.verify}
                isLoading={isLoading}
            />


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: colors.black,
        fontFamily: fonts.medium,
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    divider: {
        marginVertical: 10
    },
    codeFieldRoot: {
        marginTop: 20,
    },
    cell: {
        width: 58,
        height: 57,
        borderRadius: 8,
        textAlign: 'center',
        color: colors.black,
        fontSize: 24,
        padding: 10,
        backgroundColor: '#E4E4E4',
        alignItems: 'center',
    },
    focusCell: {
        borderWidth: 1,
        borderBottomWidth: 4,
        borderBottomColor: colors.yellow_dark,
        borderColor: colors.light_Yellow,
    },
    txt_line: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.medium,
        textAlign: 'center',
    },
})

export default otpVerify;
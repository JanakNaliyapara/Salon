import React from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import images from "../utils/images";
import * as Svgs from "../assets/Svg/svgs"


const Input = ({
    inputContainerStyle,
    placeholder,
    defaultValue,
    value,
    leftIcon,
    keyboardType,
    rightIcon,
    label,
    maxLength,
    nol,
    multiline,
    labelStyle,
    onChangeText,
    onFocus,
    error
}) => {
    const [isFocused, setIsFocused] = React.useState(false);


    const Svgleft = Svgs[leftIcon];
    return (
        <>

            <View style={{ flexDirection: "column", flex: 1, marginVertical: 10, width: '100%', height: 'auto' }}>

                <Text style={[styles.label,
                { ...labelStyle, color: error ? colors.red : isFocused ? colors.black : colors.black }]}>
                    {label}
                </Text>
                <View style={[styles.inputView, {
                    ...inputContainerStyle, borderColor:
                        error ? colors.red : isFocused ? colors.yellow_dark : colors.yellow_dark,
                }]}>
                    {leftIcon && <Svgleft width={20} height={20} />}
                    <TextInput
                        defaultValue={defaultValue}
                        value={value}
                        style={styles.textInput}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        placeholderTextColor={'#a1a1a1'}
                        maxLength={maxLength}
                        multiline={multiline}
                        numberOfLines={nol}
                        onChangeText={onChangeText}
                        onFocus={onFocus}

                    />
                </View>
                {error && (
                    <Text
                        style={[
                            styles.label,
                            { marginTop: 7, color: colors.red, fontSize: 12 },
                        ]}>
                        {error}
                    </Text>
                )}
            </View>

        </>
    )

}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        borderRadius: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderColor: colors.yellow_dark,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,

    },
    textInput: {
        flex: 1,
        fontFamily: fonts.regular,
        color: '#000',
        marginLeft: 5,

    },
    label: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: colors.black,
        paddingLeft: 5,
        marginBottom: 3
    },
})

export default Input;
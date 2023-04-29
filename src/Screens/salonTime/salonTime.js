import React, { useState } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Pressable, ScrollView, } from "react-native";
import colors from "../../utils/colors";
import { constants } from "../../utils/constants";
import * as Svg from "../../assets/Svg/svgs"
import fonts from "../../utils/fonts";
import DatePicker from "react-native-date-picker"
import Input from "../../Components/Input";
import Button from "../../Components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { salonsTime } from "../../service/CommonServices";
import { salonTimedata } from "../../redux/commonSlice";

const salonTime = ({ navigation }) => {

    const dispatch = useDispatch();
    const { userdata, isLoading } = useSelector(state => state.auth);
    const [errors, setErrors] = useState(true);

    const [value, setValue] = useState({
        "from_time": new Date(),
        "to_time": new Date(),
        "interval": 30,
        "lunch_time": [new Date(), new Date()],
        "max_appointments": ""
    });

    const onSubmit = () => {
        let isValid = true;
        if (moment(value.from_time).format("HH:MM") >= moment(value.to_time).format("HH:MM")) {
            isValid = false;
            handleError('Please check From time should not equal or bigger than To time', 'to_time')
        }
        if (moment(value.lunch_time[0]).format("HH:MM") >= moment(value.lunch_time[1]).format("HH:MM")) {
            isValid = false;
            handleError('Please check From time should not equal or bigger than To time', 'lunch_to_time')
        }
        if (!value.interval) {
            isValid = false;
            handleError('please enter intervals in minutes.', 'interval')
        }
        if (!value.max_appointments) {
            isValid = false;
            handleError('please enter max_appointments', 'max_appointments')
        }
        if (isValid) {
            const formData = {
                "from_time": moment(value.from_time).format("HH:MM"),
                "to_time": moment(value.to_time).format("HH:MM"),
                "interval": JSON.parse(value.interval),
                "lunch_time": [moment(value.lunch_time[0]).format("HH:MM"), moment(value.lunch_time[1]).format("HH:MM")],
                "max_appointments": JSON.parse(value.max_appointments)
            }
            console.log("Form Fata :: ", formData);
            dispatch(salonTimedata(formData))
        }
    }

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const handleOnChange = (input, text) => {
        setValue({ ...value, [input]: text });
    };


    return (
        <>

            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: "row", paddingHorizontal: 30, alignItems: 'center' }}>
                    <Pressable
                        style={styles.back_arrow}
                        onPress={navigation.goBack}>
                        <Svg.BackArrow width={25} height={25} />
                    </Pressable>
                    <Text style={[styles.businesstext, { marginLeft: 50 }]}>{constants?.salonTimeSloat}</Text>
                </View>

                <ScrollView style={styles.container}>

                    <View style={styles.mainContainer}>

                        <View style={styles.divider} />

                        <Text style={styles.label}>{constants?.DayTime}</Text>
                        <View style={styles.timeSloat}>
                            <Text style={{ color: colors.white, fontFamily: fonts.semiBold, fontSize: 18 }}>{"From Time"}</Text>
                            <DatePicker
                                is24hourSource="locale"
                                mode="time"
                                date={value.from_time}
                                textColor={colors.white}
                                fadeToColor="none"
                                dividerHeight={2}
                                androidVariant="iosClone"
                                onDateChange={e => handleOnChange("from_time", e)}
                            />
                        </View>

                        <View style={styles.divider} />


                        <Text style={styles.label}>{constants?.EndTime}</Text>
                        <View style={styles.timeSloat}>
                            <Text style={{ color: colors.white, fontFamily: fonts.semiBold, fontSize: 18 }}>{"To Time"}</Text>
                            <DatePicker
                                mode="time"
                                date={value.to_time}
                                textColor={colors.white}
                                fadeToColor="none"
                                dividerHeight={2}
                                androidVariant="iosClone"
                                onDateChange={e => handleOnChange("to_time", e)}
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                { marginTop: 7, color: colors.red, fontSize: 12 },
                            ]}>
                            {errors.to_time}
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.label}>{constants?.Lunch}</Text>

                        <View style={styles.rowDateContainer}>
                            <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }} >
                                <DatePicker
                                    mode="time"
                                    date={value?.lunch_time[0]}
                                    textColor={colors.white}
                                    fadeToColor="none"
                                    dividerHeight={2}
                                    onDateChange={e => {
                                        let lunchTime = [e, value.lunch_time[1]]
                                        setValue({ ...value, lunch_time: lunchTime })
                                    }}
                                />
                            </View>

                            <Text style={{ color: colors.white, fontFamily: fonts.semiBold, fontSize: 18, marginHorizontal: 10 }}>
                                {"to"}
                            </Text>

                            <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }} >
                                <DatePicker
                                    mode="time"
                                    date={value.lunch_time[1]}
                                    textColor={colors.white}
                                    fadeToColor="none"
                                    dividerHeight={2}
                                    onDateChange={e => {
                                        let lunchTime = [value.lunch_time[0], e]
                                        setValue({ ...value, lunch_time: lunchTime })
                                    }}
                                />
                            </View>
                        </View>
                        <Text
                            style={[
                                styles.label,
                                { marginTop: 7, color: colors.red, fontSize: 12 },
                            ]}>
                            {errors.lunch_to_time}
                        </Text>

                        <View style={styles.divider} />

                        <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", }}>
                            <View>
                                <Input
                                    keyboardType={"number-pad"}
                                    label={constants?.Interval + " in minutes..."}
                                    placeholder={"30"}
                                    onChangeText={e => handleOnChange("interval", e)}
                                />
                                <Text
                                    style={[
                                        styles.label,
                                        { marginTop: 7, color: colors.red, fontSize: 12 },
                                    ]}>
                                    {errors.interval}
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 15 }} />
                            <View>
                                <Input
                                    keyboardType={"number-pad"}
                                    label={constants?.Max_Appointments}
                                    placeholder={"5 per intervals..."}
                                    onChangeText={e => handleOnChange("max_appointments", e)}
                                />
                                <Text
                                    style={[
                                        styles.label,
                                        { marginTop: 7, color: colors.red, fontSize: 12 },
                                    ]}>
                                    {errors.max_appointments}
                                </Text>
                            </View>
                        </View>


                    </View>


                </ScrollView>

                <Button
                    innerContainerStyle={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}
                    label={constants?.continue}
                    onPress={onSubmit}
                />

            </SafeAreaView >


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingTop: 10
    },
    businesstext: {
        fontFamily: fonts.medium,
        color: colors.black,
        fontSize: 20,
    },
    divider: {
        marginVertical: 15
    },
    timeSloat: {
        width: 380,
        height: 120,
        borderRadius: 8,
        backgroundColor: colors.yellow_dark,
        borderWidth: 2,
        borderColor: colors.white,
        elevation: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        overflow: "hidden",
    },
    label: {
        color: colors.black,
        fontSize: 15,
        fontFamily: fonts.regular,
        marginLeft: 5
    },
    rowDateContainer: {
        width: '100%',
        height: 100,
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: colors.yellow_dark,
        elevation: 3,
        alignItems: "center",
        flexDirection: "row"
    }
})


export default salonTime;
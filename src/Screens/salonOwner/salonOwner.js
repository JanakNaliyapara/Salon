import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ScrollView, Platform } from "react-native";
import Button from "../../Components/Buttons";
import Input from "../../Components/Input";
import colors from "../../utils/colors";
import { constants } from "../../utils/constants";
import fonts from "../../utils/fonts";
import { useDispatch, useSelector } from "react-redux";
import { salonOwner } from "../../redux/commonSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";



const SalonOwner = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userdata, isLoading } = useSelector(state => state.auth);

    const [value, setValue] = useState({
        name: '',
        address: '',
        city: '',
        pin_code: '',
        state: '',
        country: '',
    })
    const [errors, setErrors] = React.useState(true);
    const { token } = useSelector(state => state.auth)
    const getData = async () => {
        await AsyncStorage.setItem('token_data', JSON.stringify(token));
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                console.log("Tok :: ", value);
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onSalonOwner = () => {
        let isValid = true;
        console.log("TRUE && FALSE ::", isValid);
        if (!value.name) {
            console.log("AAA");
            handleError('Please Enter Salon name', 'name');
            isValid = false;
        }
        if (!value.address) {
            console.log("B");
            handleError('Please Enter address', 'address');
            isValid = false;
        }
        if (!value.city) {
            console.log("C");
            handleError('Please Enter city', 'city');
            isValid = false;
        }
        if (!value.pin_code) {
            console.log("D");
            handleError('Please Enter pin_code', 'pin_code');
            isValid = false;
        }
        if (!value.state) {
            console.log("E");
            handleError('Please Enter state', 'state');
            isValid = false;
        }
        if (!value.country) {
            console.log("F");
            handleError('Please Enter country', 'country');
            isValid = false;
        }
        if (isValid) {
            const formData = {
                ...value
            }
            console.log("Is Data ::", isValid);
            console.log("Form Data on :::", formData);
            dispatch(salonOwner(formData))
        }
    }


    console.log("Token Login && Not:::", token);

    const handleOnChange = (text, input) => {
        console.log("text : ", text, input);
        setValue(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (

        <>

            <SafeAreaView style={{ backgroundColor: colors.white }} />

            <View style={styles.container}>

                <ScrollView>
                    <Text style={styles.hedertext}>{constants?.salonOwer}</Text>
                    <Text style={styles.businesstext}>{'Create and take your business to new heights!'}</Text>
                    <View style={styles.mainContainer}>

                        <Input
                            label={"Salon Name"}
                            leftIcon={"User"}
                            placeholder={'Salon Name'}
                            onFocus={() => handleError(null, 'name')}
                            onChangeText={(text) => handleOnChange(text, 'name')}
                            error={errors.name}
                        />
                        <Input
                            label={"Address"}
                            leftIcon={"Address"}
                            placeholder={'address'}
                            nol={4}
                            multiline={true}
                            onFocus={() => handleError(null, 'address')}
                            onChangeText={(text) => handleOnChange(text, 'address')}
                            error={errors.address}
                        />
                        <Input
                            label={"City"}
                            leftIcon={"City"}
                            placeholder={'City'}
                            onFocus={() => handleError(null, 'city')}
                            onChangeText={(text) => handleOnChange(text, 'city')}
                            error={errors.city}
                        />
                        <Input
                            leftIcon={"Pin"}
                            label={"Pin Code"}
                            placeholder={'Pin Code'}
                            keyboardType={"number-pad"}
                            onFocus={() => handleError(null, 'pin_code')}
                            onChangeText={(text) => handleOnChange(text, 'pin_code')}
                            error={errors.pincode}
                        />

                        <Input
                            leftIcon={"State"}
                            label={"State"}
                            placeholder={'State'}
                            onFocus={() => handleError(null, 'state')}
                            onChangeText={(text) => handleOnChange(text, 'state')}
                            error={errors.state}
                        />
                        <Input
                            leftIcon={"Country"}
                            label={"country"}
                            placeholder={'country'}
                            onFocus={() => handleError(null, 'country')}
                            onChangeText={(text) => handleOnChange(text, 'country')}
                            error={errors.country}
                        />

                    </View>

                </ScrollView>

                <Button
                    onPress={onSalonOwner}
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
    hedertext: {
        fontFamily: fonts.semiBold,
        fontSize: 25,
        color: colors.black,
        textAlign: "center",
        paddingTop: 32
    },
    businesstext: {
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: 20,
        textAlign: "center",
        paddingTop: 26,
        maxWidth: '60%',
        alignSelf: "center"
    },
    mainContainer: {
        paddingHorizontal: 25,
        backgroundColor: colors.white,
        marginVertical: 50,
    },
    divider: {
        marginVertical: 10
    }
})

export default SalonOwner;
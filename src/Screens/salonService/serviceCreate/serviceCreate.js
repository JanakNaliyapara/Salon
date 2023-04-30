import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ScrollView, Platform } from "react-native";
import Button from "../../../Components/Buttons";
import Input from "../../../Components/Input";
import colors from "../../../utils/colors";
import { constants } from "../../../utils/constants";
import fonts from "../../../utils/fonts";
import Header from "../../../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { salonsService } from "../../../redux/commonSlice";



const serviceCreate = ({ navigation }) => {
    const dispatch = useDispatch();
    const { serviceData, isLoading } = useSelector(state => state.auth);

    const [value, setValue] = useState({
        title: '',
        short_description: '',
        long_description: '',
        price: 0,
    });

    const [errors, setErrors] = useState(true);
    const { token } = useSelector(state => state.auth)

    const getData = async () => {
        await AsyncStorage.setItem('token_data', JSON.stringify(token));
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                console.log("Tokens :: ", value);

            }
        } catch (e) {

        }
    }
    useEffect(() => {
        getData()
    }, [])

    const onCreateService = () => {
        let isValid = true;
        console.log("TRUE && FALSE ::", isValid);
        if (!value.title) {
            handleError('Please Enter Salon Title', 'title');
            isValid = false;
        }
        if (!value.short_description) {
            handleError('Please Enter Short Description', 'short_description');
            isValid = false;
        }
        if (!value.long_description) {
            handleError('Please Enter long Description', 'long_description');
            isValid = false;
        }
        if (!value.price) {
            console.log("price");
            handleError('Please Enter Price', 'price');
            isValid = false;
        }
        if (isValid) {
            const formData = {
                ...value
            }
            console.log("Is Valid on Data :::", isValid);
            console.log("Form Data on :::", formData);
            dispatch(salonsService(formData))
        }
    }

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

                    <View style={styles.mainContainer}>

                        <Header
                            onPress={() => navigation.goBack('')}
                            label={constants?.ServiceCreate}
                            leftIcon={"BackArrow"} />

                        <View style={styles.divider} />

                        <Input
                            label={constants?.title}
                            leftIcon={"Title"}
                            placeholder={constants?.title}
                            onFocus={() => handleError(null, 'title')}
                            onChangeText={(text) => handleOnChange(text, 'title')}
                            error={errors.title}

                        />
                        <Input
                            inputContainerStyle={{ height: 80 }}
                            label={constants?.short_description}
                            leftIcon={"Description"}
                            placeholder={constants?.short_description}
                            nol={2}
                            multiline={true}
                            onFocus={() => handleError(null, 'short_description')}
                            onChangeText={(text) => handleOnChange(text, 'short_description')}
                            error={errors.short_description}
                        />
                        <Input
                            inputContainerStyle={{ height: 80 }}
                            label={constants?.long_description}
                            leftIcon={"Description"}
                            placeholder={constants?.long_description}
                            nol={4}
                            multiline={true}
                            onFocus={() => handleError(null, 'long_description')}
                            onChangeText={(text) => handleOnChange(text, 'long_description')}
                            error={errors.long_description}
                        />
                        <Input
                            label={constants?.price}
                            placeholder={constants?.price}
                            leftIcon={"Price"}
                            keyboardType={"number-pad"}
                            onFocus={() => handleError(null, 'price')}
                            onChangeText={(text) => handleOnChange(text, 'price')}
                            error={errors.price}
                        />

                    </View>

                </ScrollView>

                <Button
                    onPress={onCreateService}
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
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginVertical: 30,
    },
    divider: {
        marginVertical: 10
    }
})

export default serviceCreate;
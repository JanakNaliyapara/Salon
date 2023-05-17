import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSalon, otpVerify, registerUser, salonData, salonsTime, services, uploadLogoImage, verifyOtp } from "../service/CommonServices";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showError, showSucess } from "../utils/helperFunction";
import { serviceCreate } from "../service/CommonServices";


export const register = createAsyncThunk(
    'auth/register',
    async (userData, { dispatch, fulfillWithValue, rejectWithValue }) => {
        const response = await registerUser(userData);
        console.log("Response from Register :: ", response);
        if (response?.status === 201) {
            let otpData = { mobile_number: JSON.stringify(response?.data?.data?.mobile_number) }
            dispatch(generateOtp(otpData));
            showSucess(response?.data?.message)
            return fulfillWithValue(response?.data?.data)
        } else {
            console.log("delete error case", response);
        }
        return rejectWithValue(response?.response?.data?.Error);
    }
)

export const generateOtp = createAsyncThunk(
    'auth/generate-otp',
    async (otpData, { fulfillWithValue, rejectWithValue }) => {
        const response = await otpVerify(otpData);
        if (response?.status === 201) {
            navigate("OtpVerify", { mobile_number: otpData.mobile_number, initialOtp: response?.data?.data });
            showSucess(response?.data?.message)
            return fulfillWithValue(response?.data?.data);
        } else {
            showError(response?.response?.data?.message)
        }
        return rejectWithValue(response?.response?.data?.Error);
    }
)

export const verifyOtpData = createAsyncThunk(
    'auth/login',
    async (otpData, { fulfillWithValue, rejectWithValue }) => {
        const response = await verifyOtp(otpData);
        console.log("Response on login api token :::", response);
        if (response?.status === 200) {
            navigate("SalonOwner");
            // navigate("UploadImage");
            showSucess(response?.data?.message)
            await AsyncStorage.setItem("token", response?.data?.data?.access_token)
            return fulfillWithValue(response?.data?.data?.access_token);
        } else {
            showError(response?.response?.data?.message);
            console.log("Error in verify Otp :: ", response);
        }
        return rejectWithValue(response?.response?.data?.Error);
    }
)


// salon Create
export const salonOwner = createAsyncThunk(
    'auth/salons',
    async (salonDetails, { fulfillWithValue, rejectWithValue }) => {
        console.log("Salon :: ", salonDetails);
        const response = await createSalon(salonDetails)
        if (response?.status === 200) {
            navigate("UploadImage");
            showSucess(response?.data?.message)
            return fulfillWithValue(response?.data?.data)
        } else {
            showError(response?.response?.data?.message)
            console.log("Error Create Salon owner :: ", response);
        }
        return rejectWithValue(response?.response?.data?.error);
    }
)


// Salon upload Logo
export const uploadLogo = createAsyncThunk(
    'auth/salons',
    async (logoFormData, { fulfillWithValue, rejectWithValue }) => {
        const response = await uploadLogoImage(logoFormData)
        if (response?.status === 200) {
            navigate("SalonTime")
            showSucess(response?.data?.message)
            return fulfillWithValue(response?.data?.data)
        } else {
            showError(response?.response?.data?.message)
            console.log("Error Upload logo Salon owner :: ", response);
        }
        return rejectWithValue(response?.response?.data?.error);
    }
)


// Salons Times
export const salonTimedata = createAsyncThunk(
    'auth/salons/timings',
    async (salonTimes, { fulfillWithValue, rejectWithValue }) => {

        const res = await salonsTime(salonTimes);
        console.log("Respnse on salon details", response, salonDetails);
        if (res?.status === 201) {
            showSucess(response?.data?.message);
            navigate("ServiceCreate")
            return fulfillWithValue(res?.data?.data)
        } else {
            showError(response?.response?.data?.message)
            console.log("delete error case", res);
        }
        return rejectWithValue(res?.res?.data?.Error);

    }
)

// Create Salons Service   
export const salonsService = createAsyncThunk(
    'auth/salons/services',
    async (servicesDetails, { fulfillWithValue, rejectWithValue }) => {
        const response = await serviceCreate(servicesDetails)
        if (response?.status === 201) {
            // navigate("UploadImage");
            showSucess(response?.data?.message)
            // await AsyncStorage.setItem("token", response?.data?.data?.access_token)
            return fulfillWithValue(response?.data?.data)
        } else {
            showError(response?.response?.data?.message)
            console.log("Error salons services Details :: ", response?.response?.data?.message);
        }
        return rejectWithValue(response?.response?.data?.error);
    }
)

// ListView

export const serviceListView = createAsyncThunk(
    'auth/salons/services/owner',
    async (serviceList, { fulfillWithValue, rejectWithValue }) => {
        const response = await services(serviceList)
        if (response?.status === 201) {
            showSucess(response?.data?.message)
            console.log("Response on data ::", response?.data?.data);
            return fulfillWithValue(response?.data?.data)
        } else {
            showError(response?.response?.data?.data)
            console.log("Error Service List :: ", response?.response?.data?.message);
        }
        return rejectWithValue(response?.response?.data?.error)
    }
)
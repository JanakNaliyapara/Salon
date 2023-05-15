import { createSlice } from "@reduxjs/toolkit";
import { generateOtp, otp, register, salonOwner, salonsService, serviceListView, verifyOtpData, } from "./commonSlice";


const initialState = {
    userdata: '',
    isLoading: false,
    errorData: null,
    token: null,
    salonDetails: null,
    salonsServices: null,
    serviceList: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userdata = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register on 
            .addCase(register.pending, (state) => {
                state.userdata = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log("Payload", action.payload);
                state.isLoading = false;
                state.userdata = action.payload;
                state.errorData = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.userdata = null
                state.errorData = action.payload;
            })

            // Genrate Otp
            .addCase(generateOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(generateOtp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(generateOtp.rejected, (state) => {
                state.isLoading = false;
            })

            // Verify OTP
            .addCase(verifyOtpData.pending, (state) => {
                state.token = null;
            })
            .addCase(verifyOtpData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
            })
            .addCase(verifyOtpData.rejected, (state, action) => {
                state.isLoading = false;
                state.token = null
                state.errorData = action.payload;
            })

            // salon Details
            .addCase(salonOwner.pending, (state) => {
                state.isLoading = true,
                    state.salonDetails = null
            })
            .addCase(salonOwner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.salonDetails = action.payload;
                state.errorData = null;
            })
            .addCase(salonOwner.rejected, (state, action) => {
                state.isLoading = false;
                state.salonDetails = null;
                state.errorData = action.payload;
            })

            // salons Service Details
            .addCase(salonsService.pending, (state) => {
                state.isLoading = true,
                    state.salonsServices = null
            })
            .addCase(salonsService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.salonsServices = action.payload;
                state.errorData = null;
            })
            .addCase(salonsService.rejected, (state, action) => {
                state.isLoading = false;
                state.salonsServices = null;
                state.errorData = action.payload;
            })

            // ServiceList

            .addCase(serviceListView.pending, (state) => {
                state.isLoading = true,
                    state.salonsServices = null
            })
            .addCase(serviceListView.fulfilled, (state, action) => {
                state.isLoading = false;
                state.serviceList = action.payload;
                state.errorData = null;
            })
            .addCase(serviceListView.rejected, (state, action) => {
                state.isLoading = false;
                state.serviceList = null;
                state.errorData = action.payload;
            })
    }
})

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
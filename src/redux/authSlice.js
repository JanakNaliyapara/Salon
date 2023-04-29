import { createSlice } from "@reduxjs/toolkit";
import { generateOtp, otp, register, salonOwner, verifyOtpData, } from "./commonSlice";


const initialState = {
    userdata: '',
    isLoading: false,
    errorData: null,
    token: null,
    salonDetails: null
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

            .addCase(generateOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(generateOtp.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(generateOtp.rejected, (state) => {
                state.isLoading = false;
            })


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
    }
})

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import otpVerify from "../Screens/otpverify/otpVerify";
import SalonOwner from "../Screens/salonOwner/salonOwner";
import salonTime from "../Screens/salonTime/salonTime";
import Signin from "../Screens/signin/signin";
import Signup from "../Screens/signup/signup";
import Splash from "../Screens/splash/splash";
import uploadImage from "../Screens/uploadImage/uploadImage";
import OnboardingScreen from "../Screens/welcome/onboardingScreen";

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    console.log("In IF INNN", name, params, navigationRef.isReady());
    if (navigationRef.isReady()) {
        console.log("In IF", name, params);
        navigationRef.navigate(name, params);
    }
}



export default function Routes() {

    const stack = createNativeStackNavigator();

    return (
        <>

            <NavigationContainer ref={navigationRef}>
                <stack.Navigator screenOptions={{ headerShown: false }}>
                    <stack.Screen name="Splash" component={Splash} />
                    <stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
                    <stack.Screen name="Signin" component={Signin} />
                    <stack.Screen name="Signup" component={Signup} />
                    <stack.Screen name="OtpVerify" component={otpVerify} />
                    <stack.Screen name="SalonOwner" component={SalonOwner} />
                    <stack.Screen name="UploadImage" component={uploadImage} />
                    <stack.Screen name="SalonTime" component={salonTime} />
                </stack.Navigator>
            </NavigationContainer>


        </>
    )




}
import React from 'react';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width, height } = Dimensions.get('window');


const slides = [
    {
        id: '1',
        image: require('../../assets/Image/Welcome2.png'),
        title: 'Find Barber and Salons Easily in Your Hans',
    },
    {
        id: '2',
        image: require('../../assets/Image/Welcome1.png'),
        title: 'Book Your Favorite Barber and Salon Quickly ',
    },
    {
        id: '3',
        image: require('../../assets/Image/Welcome3.png'),
        title: 'Come be handsome and beautiful with us right now!',
    },
];

const OnboardingScreen = ({ navigation }) => {

    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();

    const skip = () => {
        setCurrentSlideIndex(slides.length - 1);
        ref.current.goToSlide(slides.length - 1);
    };

    const onNext = () => {
        ref.current.goToSlide(currentSlideIndex + 1);
        setCurrentSlideIndex(currentSlideIndex + 1);
    }

    const Footer = () => {
        return (
            <View
                style={{
                    width: width,
                    height: height * 0.25,
                    justifyContent: 'space-between',
                    paddingHorizontal: 20
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: '#000',
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Render buttons */}
                <View style={{ marginBottom: 20 }}>
                    {currentSlideIndex == slides.length - 1 ? (
                        <View style={{ width: '100%', height: 50 }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.replace('Signin')}>
                                <Text style={{ fontFamily: fonts.semiBold, color: colors.black, fontSize: 15 }}>
                                    {"GET STARTED"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.btn,
                                    {
                                        borderColor: colors.yellow_dark,
                                        borderWidth: 1,
                                        backgroundColor: 'transparent',
                                        elevation: 0
                                    },
                                ]}
                                onPress={skip}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: fonts.semiBold,
                                        color: '#000',
                                    }}>
                                    {"SKIP"}
                                </Text>
                            </TouchableOpacity>
                            <View style={{ width: 15 }} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={onNext}
                                style={styles.btn}>
                                <Text
                                    style={{
                                        fontFamily: fonts.semiBold,
                                        color: colors.black,
                                        fontSize: 15,
                                    }}>
                                    {"NEXT"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };


    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: width, alignItems: 'center' }}>
                <Image source={item.image} style={{ width: width, resizeMode: 'contain' }} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <AppIntroSlider
                ref={ref}
                data={slides}
                renderItem={_renderItem}
                showsHorizontalScrollIndicator={false}
                bottomButton={false}
                renderPagination={() => <></>}
                onSlideChange={(e) => setCurrentSlideIndex(e)}
            />
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 23,
        maxWidth: '70%',
        fontFamily: fonts.medium,
        textAlign: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    indicator: {
        height: 2.5,
        width: 12,
        backgroundColor: colors.gray,
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.yellow_dark,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
});
export default OnboardingScreen;
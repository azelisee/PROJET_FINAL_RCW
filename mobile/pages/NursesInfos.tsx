import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const NursesInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Nurses</Text>
            <Text style={styles.paragraph}>
                Our nursing staff is the backbone of our hospital, providing compassionate care and support to our patients around the clock...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/n1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/n2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/n3.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vn.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.video}
                    useNativeControls
                />
            </View>
            <Text style={styles.paragraph}>
                Our nurses are trained in the latest patient care techniques and are dedicated to ensuring that each patient receives the best possible care.
                They are available 24/7 to assist with patient needs and collaborate with doctors and other healthcare professionals.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    infosContainer: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 20,
    },
    imageGallery: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    image: {
        width: Dimensions.get('window').width / 3 - 20,
        height: 100,
    },
    videoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    video: {
        width: Dimensions.get('window').width - 40,
        height: 200,
    },
});

export default NursesInfos;

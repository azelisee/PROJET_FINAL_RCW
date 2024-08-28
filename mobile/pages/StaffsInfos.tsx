import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const StaffInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Staff</Text>
            <Text style={styles.paragraph}>
                Beyond our medical professionals, our hospital is supported by a dedicated staff that ensures everything runs smoothly...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/i-s1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-s2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-s3.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vs.mp4')}
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
                From administrators to technicians, our staff members work behind the scenes to ensure that the hospital operates efficiently. Their dedication and hard work make it possible for us to provide top-quality care to our patients.
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

export default StaffInfos;

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const DepartmentsInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Departments</Text>
            <Text style={styles.paragraph}>
                Our hospital's departments are equipped with state-of-the-art facilities and staffed by highly trained professionals...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/i-d1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-d2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-d3.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vd.mp4')}
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
            <Text style={styles.infoParagraph}>
                Each department is dedicated to providing the best care possible, with a focus on patient safety and outcomes. From cardiology to neurology, our specialists are here to help.
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
        textAlign: 'center',
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
    infoParagraph: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DepartmentsInfos;

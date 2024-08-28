import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const PatientInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Patients</Text>
            <Text style={styles.paragraph}>
                We are committed to providing the highest level of care to our patients. Here, you can learn more about the patient services we offer and how we support patient well-being...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/i-p1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-p2.png')} style={styles.image} />
                <Image source={require('../assets/images/i-p3.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vp.mp4')}
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
                Our patients are at the center of everything we do. We offer a range of services designed to support their recovery and well-being, from personalized treatment plans to comprehensive aftercare.
            </Text>
            <Text style={styles.paragraph}>
                We believe in treating each patient with dignity, respect, and compassion, ensuring that they have access to the best possible care. Our team works closely with patients and their families to address any concerns and provide the support they need.
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

export default PatientInfos;

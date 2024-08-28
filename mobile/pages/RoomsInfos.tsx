import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const RoomsInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Rooms</Text>
            <Text style={styles.paragraph}>
                Our hospital rooms are designed to ensure patient comfort and safety, with all the necessary amenities to support recovery...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/room2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/room3.jpg')} style={styles.image} />
                <Image source={require('../assets/images/room6.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vr.mp4')}
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
                Our rooms are equipped with the latest medical technology and designed with the patient's comfort in mind. We offer private rooms, ICU facilities, and specialized rooms for children and their families.
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

export default RoomsInfos;

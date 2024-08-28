import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const DoctorsInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Doctors</Text>
            <Text style={styles.paragraph}>
                Meet our teams of highly qualified doctors who are experts in their respective fields and dedicated to providing the best care...
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/i-doc1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-doc2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-doc3.jpg')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vdoc.mp4')}
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
                Our doctors are leaders in their fields, committed to ongoing education and research to stay at the forefront of medical advancements. They work closely with patients to create personalized treatment plans.
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

export default DoctorsInfos;

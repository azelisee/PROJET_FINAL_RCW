import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const TransfersInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Patient Transfers</Text>
            <Text style={styles.paragraph}>
                At our healthcare facilities, patient transfers are managed with the utmost precision and care, ensuring that every transition is as seamless and stress-free as possible. Below, we provide detailed insights into our transfer protocols and procedures.
            </Text>
            <View style={styles.imageGallery}>
                <Image source={require('../assets/images/i-t1.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-t2.jpg')} style={styles.image} />
                <Image source={require('../assets/images/i-t3.png')} style={styles.image} />
            </View>
            <View style={styles.videoContainer}>
                <Video
                    source={require('../assets/videos/vt.mp4')}
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
                We prioritize patient safety and comfort during every transfer, whether it involves moving between departments within the same facility or transferring to another hospital. Our comprehensive protocols ensure that all medical records, necessary equipment, and support staff are in place to provide continuity of care.
            </Text>
            <Text style={styles.paragraph}>
                Our dedicated team of healthcare professionals coordinates every aspect of the transfer, from initial assessment to the handover at the receiving facility. We work closely with transport services to ensure timely and efficient transfers, minimizing wait times and reducing the potential for complications.
            </Text>
            <Text style={styles.paragraph}>
                By maintaining clear communication and thorough documentation throughout the transfer process, we ensure that patients receive the highest standard of care, regardless of their location. This commitment to excellence is reflected in our meticulous attention to detail and our unwavering focus on patient well-being.
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

export default TransfersInfos;

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import { Video } from 'expo-av';

const HospitalsInfos = () => {
    return (
        <ScrollView contentContainerStyle={styles.infosContainer}>
            <Text style={styles.title}>Our Hospitals</Text>
            <Text style={styles.paragraph}>
                Our hospitals are equipped with state-of-the-art facilities and offer a wide range of medical services to meet the needs of our patients.
                From emergency care to specialized treatments, our hospitals are committed to providing the highest quality care in a compassionate
                and supportive environment.
            </Text>

            <View style={styles.infoSection}>
                <Text style={styles.subTitle}>Our Facilities</Text>
                <Text style={styles.paragraph}>
                    We offer modern facilities that are designed to ensure patient comfort and safety. Our hospitals include advanced diagnostic
                    and treatment equipment, spacious patient rooms, and comfortable waiting areas for families and visitors.
                </Text>
                <View style={styles.imageGallery}>
                    <Image source={require('../assets/images/h1.jpg')} style={styles.image} />
                    <Image source={require('../assets/images/h2.webp')} style={styles.image} />
                    <Image source={require('../assets/images/h3.jpg')} style={styles.image} />
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.subTitle}>Services Offered</Text>
                <Text style={styles.paragraph}>
                    Our hospitals provide a wide range of services, including:
                </Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Emergency and trauma care</Text>
                    <Text style={styles.listItem}>• Outpatient services</Text>
                    <Text style={styles.listItem}>• Surgical services</Text>
                    <Text style={styles.listItem}>• Maternity and neonatal care</Text>
                    <Text style={styles.listItem}>• Cardiology and heart surgery</Text>
                    <Text style={styles.listItem}>• Orthopedic services</Text>
                    <Text style={styles.listItem}>• Cancer treatment and chemotherapy</Text>
                    <Text style={styles.listItem}>• Physical therapy and rehabilitation</Text>
                    <Text style={styles.listItem}>• Laboratory and imaging services</Text>
                    <Text style={styles.listItem}>• And many others</Text>
                </View>
                <View style={styles.imageGallery}>
                    <Image source={require('../assets/images/h4.jpg')} style={styles.image} />
                    <Image source={require('../assets/images/h5.webp')} style={styles.image} />
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.subTitle}>Patient Testimonials</Text>
                <Text style={styles.paragraph}>
                    Our patients are at the heart of everything we do. Here’s what some of them have to say about their experience at our hospitals:
                </Text>
                <View style={styles.blockquoteContainer}>
                    <Text style={styles.blockquote}>"The care I received was outstanding. The staff were compassionate, and the facilities were top-notch."</Text>
                    <Text style={styles.footer}>- Patient A</Text>
                </View>
                <View style={styles.blockquoteContainer}>
                    <Text style={styles.blockquote}>"I felt safe and well-cared for throughout my treatment. I couldn't have asked for better care."</Text>
                    <Text style={styles.footer}>- Patient B</Text>
                </View>
                <View style={styles.blockquoteContainer}>
                    <Text style={styles.blockquote}>"The hospital provided excellent service, and the staff made sure I was comfortable at all times."</Text>
                    <Text style={styles.footer}>- Patient C</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.subTitle}>Watch Our 3D Virtual Tour</Text>
                <Text style={styles.paragraph}>
                    Take a virtual tour of our facilities to see where you'll be receiving care. This video showcases our state-of-the-art technology, patient rooms, and much more.
                </Text>
                <View style={styles.videoContainer}>
                    <Video
                        source={require('../assets/videos/vh2.mp4')}
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
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.subTitle}>Contact Us</Text>
                <Text style={styles.paragraph}>
                    For more information about our hospitals or to schedule a visit, please contact us:
                </Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem} onPress={() => Linking.openURL('mailto:azoumakokou@teccart.online')}>Email: azoumakokou@teccart.online</Text>
                    <Text style={styles.listItem}>Phone: (438)-456-7890</Text>
                </View>
            </View>
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
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
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
    listContainer: {
        marginVertical: 10,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    blockquoteContainer: {
        marginBottom: 10,
    },
    blockquote: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    footer: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
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

export default HospitalsInfos;

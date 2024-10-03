import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation()
    const [selectedGender, setSelectedGender] = useState(null);
    const [height, setHeight] = useState(189);
    const [weight, setWeight] = useState(40);
    const [age, setAge] = useState(18);

    const incrementWeight = () => setWeight(prev => prev + 1);
    const decrementWeight = () => setWeight(prev => (prev > 5 ? prev - 1 : 5));
    const incrementAge = () => setAge(prev => prev + 1);
    const decrementAge = () => setAge(prev => (prev > 18 ? prev - 1 : 18));

    // Calculate BMI
    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(2); // Limiting to 2 decimal places
    };

    const navigateToBmiResult = () => {
        const bmi = calculateBMI();
        navigation.navigate('BmiResultScreen', { bmi });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.headingContainer}>
                <Text style={styles.bmiText}>BMI CALCULATOR</Text>
            </View>

            <View style={styles.genderContainer}>
                <TouchableOpacity
                    style={[
                        styles.genderBox,
                        selectedGender === 'male' && styles.selectedBox,
                    ]}
                    onPress={() => setSelectedGender('male')}
                >
                    <Image
                        source={require('../assets/male.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>MALE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.genderBox,
                        selectedGender === 'female' && styles.selectedBox,
                    ]}
                    onPress={() => setSelectedGender('female')}
                >
                    <Image
                        source={require('../assets/female.png')} // Replace with actual image URL or local file path
                        style={styles.icon}
                    />
                    <Text style={styles.text}>FEMALE</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.heightContainer}>
                <View style={styles.heightBox}>
                    <Text style={styles.text}>HEIGHT</Text>
                    <Text style={styles.heightText}>{height} cm</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={100}
                        maximumValue={250}
                        step={1}
                        value={height}
                        onValueChange={(value) => setHeight(value)}
                        minimumTrackTintColor="#FF0066"
                        maximumTrackTintColor="#FFFFFF"
                        thumbTintColor="#FF0066"
                    />
                </View>
            </View>


            <View style={styles.rowContainer}>
                <View style={styles.attributeBox}>
                    <Text style={styles.text}>WEIGHT</Text>
                    <Text style={styles.valueText}>{weight} kg</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.circleButton} onPress={decrementWeight}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleButton} onPress={incrementWeight}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.attributeBox}>
                    <Text style={styles.text}>AGE</Text>
                    <Text style={styles.valueText}>{age}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.circleButton} onPress={decrementAge}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleButton} onPress={incrementAge}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <TouchableOpacity style={styles.bmiButton} onPress={navigateToBmiResult}>
                <Text style={styles.bmiText}>CALCULATE YOUR BMI</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101538',
    },
    headingContainer: {
        marginTop:50,
        width:'100%',
        padding:10,
        backgroundColor:'#272B4D',
        alignItems:'center'
    },
    genderContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    genderBox: {
        backgroundColor: '#282B4E',
        width: '40%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    selectedBox: {
        backgroundColor: '#FF0066',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    heightContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    heightBox: {
        backgroundColor: '#282B4E',
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    heightText: {
        color: 'white',
        fontSize: rf(5),
        fontWeight: 'bold',
        marginVertical: 10,
    },
    slider: {
        width: '80%',
        height: 40,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
    },
    attributeBox: {
        backgroundColor: '#282B4E',
        width: '40%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    valueText: {
        color: 'white',
        fontSize: rf(5),
        fontWeight: 'bold',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    circleButton: {
        backgroundColor: '#FF0066',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bmiButton: {
        width:'90%',
        backgroundColor:'#FF0066',
        marginTop:20,
        padding:10,
        borderRadius:10,
        alignItems:'center',
        alignSelf:'center'
    },
    bmiText: {
        color:'white',
        fontWeight:'bold',
        fontSize:rf(2.5)
    }
});

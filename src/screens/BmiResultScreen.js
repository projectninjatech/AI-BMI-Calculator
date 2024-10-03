import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import React from 'react'
import { fetchAISuggestion } from '../api/AISuggest';

export default function BmiResultScreen({ route }) {
    const { bmi } = route.params;

    const [recipes, setRecipes] = React.useState([]);
    const [exercises, setExercises] = React.useState([]);
    const [expandedRecipe, setExpandedRecipe] = React.useState(null);
    const [expandedExercise, setExpandedExercise] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true); // Add loading state

    React.useEffect(() => {
        const apiCall = async () => {
            try {
                const aiSuggestionData = await fetchAISuggestion(bmi)
                setRecipes(aiSuggestionData?.data?.recipes)
                setExercises(aiSuggestionData?.data?.exercises)

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false when data fetching is complete
            }

        }

        apiCall()

    }, [bmi])

    // Function to toggle the expanded state of a recipe
    const toggleRecipe = (index) => {
        setExpandedRecipe(expandedRecipe === index ? null : index);
    };

    // Function to toggle the expanded state of an exercise
    const toggleExercise = (index) => {
        setExpandedExercise(expandedExercise === index ? null : index);
    };

    const getBMISuggestion = (bmi) => {
        if (bmi < 18.5) {
            return "Your BMI is below normal. Consider increasing your calorie intake with a balanced diet.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return "Great! Keep maintaining a balanced diet and regular exercise.";
        } else if (bmi >= 25 && bmi <= 29.9) {
            return "Your BMI is slightly above normal. Consider incorporating more exercise and mindful eating.";
        } else {
            return "Your BMI is in the overweight range. It's recommended to consult with a healthcare professional for a personalized plan.";
        }
    };

    const getBMIStatus = (bmi) => {
        if (bmi < 18.5) {
            return { status: "UNDERWEIGHT", color: "yellow" };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return { status: "NORMAL", color: "lightgreen" };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return { status: "OVERWEIGHT", color: "orange" };
        } else {
            return { status: "OBESE", color: "red" };
        }
    };


    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.headingContainer}>
                <Text style={styles.bmiHeadingText}>BMI CALCULATOR</Text>
            </View>

            <View style={styles.bmiStatusContainer}>
                <Text style={[styles.bmiStatus, { color: getBMIStatus(bmi).color }]}>{getBMIStatus(bmi).status}</Text>
            </View>

            <View style={styles.bmiContainer}>
                <Text style={styles.bmiText}>{bmi}</Text>
            </View>

            <View style={styles.normalBmiContainer}>
                <Text style={styles.normalBmiText}>Normal BMI range: 18.5 - 24.9</Text>
            </View>

            <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{getBMISuggestion(bmi)}</Text>
            </View>


            {/* Show ActivityIndicator when loading */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="lightgreen" />
                </View>
            ) : (
                <>
                    {/* Render Recipes as buttons */}

                    < View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Healthy Recipes (AI-Powered)</Text>
                        {recipes.map((recipe, index) => (
                            <View key={index} style={styles.recipeContainer}>
                                <TouchableOpacity
                                    style={styles.recipeButton}
                                    onPress={() => toggleRecipe(index)} // Toggle recipe details on press
                                >
                                    <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                                </TouchableOpacity>
                                {expandedRecipe === index && ( // Show details if recipe is expanded
                                    <View style={styles.recipeDetailsContainer}>
                                        <Text style={styles.recipeDetails}>
                                            <Text style={styles.subtitleText}>Calories: </Text>
                                            {recipe.recipeCalories}
                                        </Text>
                                        <Text style={styles.recipeDetails}>
                                            <Text style={styles.subtitleText}>Benefits: </Text>
                                            {recipe.recipeBenefits}
                                        </Text>
                                        <Text style={styles.recipeSubTitle}>Ingredients:</Text>
                                        {recipe.recipeItems.map((item, i) => (
                                            <Text key={i} style={styles.recipeItem}>{item}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>






                    {/* Render Exercises as buttons  */}
                    <View style={styles.exerciseSectionContainer}>
                        <Text style={styles.sectionTitle}>Recommended Exercises</Text>
                        {exercises.map((exercise, index) => (
                            <View key={index} style={styles.exerciseContainer}>
                                <TouchableOpacity
                                    style={styles.exerciseButton}
                                    onPress={() => toggleExercise(index)} // Toggle exercise details on press
                                >
                                    <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
                                </TouchableOpacity>
                                {expandedExercise === index && ( // Show details if exercise is expanded
                                    <View style={styles.exerciseDetailsContainer}>
                                        <Text style={styles.exerciseDetails}>
                                            <Text style={styles.subtitleText}>How to Perform: </Text>
                                            {exercise.exercisePerform}
                                        </Text>

                                        <Text style={styles.exerciseDetails}>
                                            <Text style={styles.subtitleText}>Benefits: </Text>
                                            {exercise.exerciseBenefits}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </>
            )}

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#101538',
    },
    headingContainer: {
        marginTop: 50,
        width: '100%',
        padding: 10,
        backgroundColor: '#272B4D',
        alignItems: 'center'
    },
    bmiHeadingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: rf(2.5)
    },
    bmiStatusContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    bmiStatus: {
        fontSize: rf(2),
        fontWeight: 'bold',
        letterSpacing: 2,
        // color: 'lightgreen',
    },
    bmiContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    bmiText: {
        fontSize: rf(10),
        fontWeight: 'bold',
        color: 'white',
    },
    normalBmiContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    normalBmiText: {
        color: 'lightgray',
        fontSize: rf(2),
    },
    suggestionContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    suggestionText: {
        color: 'white',
        fontSize: rf(2),
        textAlign: 'center',
    },





    sectionContainer: {
        marginTop: 50,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: 'lightgreen',
        fontSize: rf(2.5),
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recipeContainer: {
        marginBottom: 20,
    },
    recipeButton: {
        width: '100%',
        backgroundColor: '#272B4D',
        padding: 15,
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: 10,
    },
    recipeName: {
        color: 'white',
        fontSize: rf(2.2),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    recipeDetailsContainer: {
        backgroundColor: '#1F2340',
        padding: 10,
        borderRadius: 8,
    },
    recipeDetails: {
        color: 'lightgray',
        fontSize: rf(2),
        marginBottom: 5,
    },
    recipeSubTitle: {
        color: 'lightgreen',
        fontSize: rf(2),
        fontWeight: 'bold',
        marginTop: 5,
    },
    recipeItem: {
        color: 'lightgray',
        fontSize: rf(1.8),
        marginLeft: 10,
    },
    exerciseSectionContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    exerciseContainer: {
        marginBottom: 20,
    },
    exerciseButton: {
        width: '100%',
        backgroundColor: '#272B4D',
        padding: 15,
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: 10,
    },
    exerciseName: {
        color: 'white',
        fontSize: rf(2.2),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exerciseDetailsContainer: {
        backgroundColor: '#1F2340',
        padding: 10,
        borderRadius: 8,
    },
    exerciseDetails: {
        color: 'lightgray',
        fontSize: rf(2),
        marginBottom: 5,
    },
    subtitleText: {
        color: 'lightgreen',
        fontWeight: 'bold', // Optional: To make the label bold
    }
})
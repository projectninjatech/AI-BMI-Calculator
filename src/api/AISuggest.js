export const fetchAISuggestion = async (bmi) => {
    try {
        const response = await fetch('http://192.168.0.100:3000/generate-recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bmi }), // Send BMI in the request body
        });
        const result = await response.json();
        console.log("Result json",result)
        return result
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};
# BMI Calculator App with AI-Generated Health Tips

This React Native app allows users to calculate their Body Mass Index (BMI) and get personalized health tips. The app integrates with an API that uses Google's Generative AI to recommend healthy recipes and exercises based on the user's BMI.

## Features

- Calculate BMI based on height and weight.
- Displays the user's BMI along with the status (Underweight, Normal, Overweight, or Obese).
- Sends the BMI to a backend API, which generates 3 healthy recipes and 3 recommended exercises.
- Receives and displays AI-generated health tips in the app.

## Prerequisites

- **Node.js** (version 12 or higher)
- **React Native CLI** or **Expo CLI** (depending on your setup)
- **API Backend** running (see [Gemini-AI-Health-Tips API](https://github.com/projectninjatech/Gemini-AI-Health-Tips))
- Android/iOS Simulator or physical device for testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/projectninjatech/AI-BMI-Calculator.git
   cd bmi-calculator-app

2. Install packages:

    ```bash
    npm install

3. Setup the API Server: [Gemini-AI-Health-Tips API](https://github.com/projectninjatech/Gemini-AI-Health-Tips)
// Wait for the page to load before running any script
document.addEventListener('DOMContentLoaded', () => {

    // Get all the HTML elements we need
    const generateBtn = document.getElementById('generate-btn');
    const questionInput = document.getElementById('question');
    const contextInput = document.getElementById('context');
    const resultSqlOutput = document.getElementById('result-sql');
    const loadingSpinner = document.getElementById('loading-spinner');

    // The URL of our local Flask API
    const API_URL = 'http://127.0.0.1:5000/generate-sql';

    // Add a click listener to the button
    generateBtn.addEventListener('click', async () => {
        
        // 1. Get the values from the text boxes
        const question = questionInput.value;
        const context = contextInput.value;

        if (!question || !context) {
            alert('Please fill out both the question and context fields.');
            return;
        }

        // 2. Show loading spinner and clear old results
        loadingSpinner.classList.remove('hidden');
        resultSqlOutput.textContent = '...';
        generateBtn.disabled = true;

        try {
            // 3. Send the request to the API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    context: context
                }),
            });

            const data = await response.json();

            // 4. Check for errors from the API
            if (data.error) {
                resultSqlOutput.textContent = `Error: ${data.error}`;
            } else {
                // 5. Display the successful result
                resultSqlOutput.textContent = data.generated_sql;
            }

        } catch (error) {
            // Handle network errors
            console.error('Fetch Error:', error);
            resultSqlOutput.textContent = 'Error: Could not connect to the API. Is it running?';
        } finally {
            // 6. Hide loading spinner and re-enable button
            loadingSpinner.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });
});
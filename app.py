from flask import Flask, request, jsonify
from transformers import AutoModelForSeq2SeqLM, T5Tokenizer
from flask_cors import CORS

# 1. Initialize our Flask app
app = Flask(__name__)
CORS(app)

# --- MODEL LOADING (Done only once at startup) ---
print("--- Loading model and tokenizer... ---")
model_path = "./my_final_text_to_sql_model"
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
prefix = "translate to SQL: "
print("--- Model loaded successfully! ---")
# --------------------------------------------------

# 2. Define our API endpoint
@app.route('/generate-sql', methods=['POST'])
def generate_sql():
    try:
        # 2a. Get the JSON data from the request
        data = request.get_json()
        question = data['question']
        context = data['context'] # e.g., "CREATE TABLE ..."

        # 2b. Format the input just like in training
        input_text = f"{prefix}question: {question} | context: {context}"

        # 2c. Tokenize
        input_ids = tokenizer(
            input_text, 
            return_tensors="pt", 
            max_length=512, 
            truncation=True
        ).input_ids

        # 2d. Generate the SQL
        outputs = model.generate(
            input_ids,
            max_length=128,
            num_beams=4,
            early_stopping=True
        )

        # 2e. Decode and return
        predicted_sql = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({"generated_sql": predicted_sql})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 3. Run the app
if __name__ == '__main__':
    # You can change port=5001 if 5000 is in use
    app.run(debug=True, port=5000)
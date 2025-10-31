# Text-to-SQL 

This project is a full-stack implementation of a Text-to-SQL translator. It uses a fine-tuned T5 Transformer model to convert natural language questions into executable SQL queries. The model is served via a Python (Flask) API and is interactive through a simple web interface.
This project was developed as a prototype to explore the practical application of modern NLP techniques, specifically Supervised Fine-Tuning (SFT), as discussed in research papers like "Text-to-SQL Empowered by Large Language Models: A Benchmark Evaluation".

- **Model**: t5-small (Fine-Tuned)
- **Training**: Google Colab (T4 GPU)
- **Dataset**: b-mc2/sql-create-context dataset - 78,000+ question-schema-query triplets.
- **Performance Metrics** - BLEU Score - 88.37 - test set of 7,858 unseen examples.
- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript

## Setup & Installation

**1. Clone the repository:**
```
git clone https://github.com/19rishabh/text2sql.git
cd text2sql
```
**2. Create and activate a Python virtual environment:**
```
python -m venv venv
.\venv\Scripts\activate
```
**3. Install dependencies:**
```
pip install -r requirements.txt
```
**4. Get the Trained Model:**
```
Train the model using model generation.ipynb on collab using T4 gpu.
Copy the zipped model from collab to local environment.
Unzip the file.
Make sure the resulting folder is named my_final_text_to_sql_model and is located in the root of the project.
```
**5. Add Model to .gitignore:**
Make sure your .gitignore file contains the following lines to avoid committing the large model files:
```
venv/
my_final_text_to_sql_model/
my_model.zip
__pycache__/
```

## How to Run
This application requires two terminals running simultaneously.(Make sure your venv is active)

**Terminal 1: Run the Backend API**
```
python app.py
```
**Terminal 2: Run the Frontend Server**
```
python -m http.server 8000
```
Access the Application at http://localhost:8000

**Future Work:**
- Data Augmentation: The #1 priority. The training data must be expanded to include examples of JOIN, GROUP BY, ORDER BY, LIKE, and other common SQL patterns.
- Model Scaling: Fine-tune a larger base model (like t5-base) that may have a better capacity to generalize.
- Execution Accuracy: The true test of success is not "Exact Match" but "Execution Accuracy." The next step is to build an evaluation pipeline that actually runs the generated SQL against a real database and compares the results.

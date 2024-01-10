from flask import Flask, request, jsonify ,send_from_directory
from flask_cors import CORS
import pandas as pd
import tabula
import os
from werkzeug.utils import secure_filename
from camelot1 import append_table_to_excel

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def index():
    return "hello"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file
    upload_folder = 'uploads/'
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    # Run the Python script
    pdf_file_path = os.path.join(upload_folder, file.filename)

    # Use the filename (without extension) for the output Excel file
    # output_excel_filename = os.path.splitext(file.filename)[0] + 'output.xlsx'
    output_excel_filename = 'output.xlsx'
    output_excel_path = 'static/output/'+output_excel_filename
    print(output_excel_path)
    # Call the function to extract and append tables to Excel
    # append_table_to_excel(pdf_file_path, output_output_excel_path)
    try:
        existing_data = pd.read_excel(output_excel_path)
    except FileNotFoundError:
        # If the file doesn't exist, create an empty DataFrame
        existing_data = pd.DataFrame()

    # Extract tables from the PDF
    tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)

    # Iterate through tables and append them to the existing data
    for i, table in enumerate(tables):
        if not existing_data.empty:
            # Append the table to the existing data
            existing_data = pd.concat([existing_data, table], ignore_index=True)
        else:
            # If there is no existing data, use the table directly
            existing_data = table

    # Write the combined data to the Excel file
    existing_data.to_excel(output_excel_path, index=False)

    # Signal to the frontend that the file has been processed successfully
    response_data = {'message': 'File processed successfully. Do you want to download the file?', 'output_excel_path': output_excel_path}
    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS
import dotenv
import json
import os
import logging
from db import db_utils

app = Flask(__name__)  # Create Flask instance
api = Api(app)  # API router
CORS(app)

@app.route('/card_access', methods=['POST', 'GET', 'PUT'])
def card_access():
    if request.method == 'PUT':
        content_type = request.headers.get('Content-Type')  
        if (content_type == 'application/json'):
            try:    
                json_data = request.get_json()
            except Exception as e:
                print(e)
                return jsonify({'error': 'Issue getting json data', "status": 415})
        else:
            return 'Content-Type not supported!'
        json_data = request.get_json()
        dirId = json_data['cardId']
        newPriority = json_data['newPriority']
        db_utils.exec_commit("UPDATE directive SET priority = %s WHERE id = %s", (newPriority, dirId))
        return jsonify({"message": "Post request received", "status": 200})
    elif request.method == 'GET':
        try:
            cardId = request.args.get('id', default=-1)
            if cardId == -1:
                cards = db_utils.exec_get_all("SELECT name, description, priority, link, id FROM directive", (cardId,))
            else:
                cards = db_utils.exec_get_all("SELECT name, description, priority, link, id FROM directive WHERE id = %s", (cardId,))
            formattedDirectives = db_utils.format_directives(cards)
            print(formattedDirectives)  
            return jsonify({"message": "GET request successful", "cards": formattedDirectives, "status": 200}) 
        except Exception as e:
            print(e)
            return jsonify({"message": "Error retrieving cards ", "status": 500})
    elif request.method == 'POST':
        # try:
        content_type = request.headers.get('Content-Type')  
        if (content_type == 'application/json'):
            try:    
                json_data = request.get_json()
            except Exception as e:
                print("Failed to get json data")
                print(e)
                return jsonify({'error': 'Issue getting json data', "status": 415})
        else:
            return 'Content-Type not supported!'
        json_data = request.get_json()
        prioritiy = json_data['priority']
        name = json_data['name']
        description = json_data['description']
        link = json_data['link']
        db_utils.exec_commit("INSERT INTO directive (priority, name, description, link) VALUES (%s, %s, %s, %s)", (prioritiy, name, description, link))
        return jsonify({"message": "PUT request received", "status": 200})
        # except Exception as e:
        #     print("Card Upload Failed")
        #     return jsonify({"message": "Error inserting card ", "status": 500})
    

if __name__ == "__main__":
    # credential file exists two levels up
    # from the current file
    dotenv.load_dotenv(".env")
    app.run(debug=True)  # Starts Flask

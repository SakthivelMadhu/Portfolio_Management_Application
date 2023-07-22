# project_prism/backend/app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/project_prism_db'
db = SQLAlchemy(app)
api = Api(app)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for frontend integration

# Default route
@app.route('/')
def index():
    return "Welcome to the Portfolio Management Application!"



if __name__ == '__main__':
    app.run(debug=True)

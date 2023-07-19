from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
# Import ObjectID from bson for handling MongoDB IDs
from bson import ObjectId


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/portfolio_management'
mongo = PyMongo(app)

# Helper function to convert MongoDB objects to JSON
def convert_to_json(data):
    return jsonify(data) if data else jsonify({})

def serialize_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc


# Default route
@app.route('/')
def index():
    return "Welcome to the Portfolio Management Application!"


# Define the API endpoints for each entity
# Portfolio Manager Endpoints
@app.route('/api/portfolio-managers', methods=['GET'])
def get_portfolio_managers():
    portfolio_managers = mongo.db.portfolio_managers.find()
    return convert_to_json(portfolio_managers)

@app.route('/api/portfolio-managers/<string:id>', methods=['GET'])
def get_portfolio_manager(id):
    portfolio_manager = mongo.db.portfolio_managers.find_one({'_id': id})
    return convert_to_json(portfolio_manager)

# Create a new Portfolio Manager
@app.route('/api/portfolio-managers', methods=['POST'])
def create_portfolio_manager():
    new_manager = request.get_json()
    result = mongo.db.portfolio_managers.insert_one(new_manager)
    return convert_to_json({'inserted_id': str(result.inserted_id)})

# Update an existing Portfolio Manager by ID
@app.route('/api/portfolio-managers/<string:id>', methods=['PUT'])
def update_portfolio_manager(id):
    updated_manager = request.get_json()
    result = mongo.db.portfolio_managers.update_one({'_id': id}, {'$set': updated_manager})
    return convert_to_json({'modified_count': result.modified_count})

# Delete a Portfolio Manager by ID
@app.route('/api/portfolio-managers/<string:id>', methods=['DELETE'])
def delete_portfolio_manager(id):
    result = mongo.db.portfolio_managers.delete_one({'_id': id})
    return convert_to_json({'deleted_count': result.deleted_count})





# Project Endpoints
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = mongo.db.projects.find()
    return convert_to_json(projects)

@app.route('/api/projects/<string:id>', methods=['GET'])
def get_project(id):
    project = mongo.db.projects.find_one({'_id': id})
    return convert_to_json(project)

# Create a new Project
@app.route('/api/projects', methods=['POST'])
def create_project():
    new_project = request.get_json()
    result = mongo.db.projects.insert_one(new_project)
    return convert_to_json({'inserted_id': str(result.inserted_id)})

# Update an existing Project by ID
@app.route('/api/projects/<string:id>', methods=['PUT'])
def update_project(id):
    updated_project = request.get_json()
    result = mongo.db.projects.update_one({'_id': id}, {'$set': updated_project})
    return convert_to_json({'modified_count': result.modified_count})

# Delete a Project by ID
@app.route('/api/projects/<string:id>', methods=['DELETE'])
def delete_project(id):
    result = mongo.db.projects.delete_one({'_id': id})
    return convert_to_json({'deleted_count': result.deleted_count})





# Task Endpoints
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = mongo.db.tasks.find()
    return convert_to_json(tasks)

@app.route('/api/tasks/<string:id>', methods=['GET'])
def get_task(id):
    task = mongo.db.tasks.find_one({'_id': id})
    return convert_to_json(task)

# Create a new Task
@app.route('/api/tasks', methods=['POST'])
def create_task():
    new_task = request.get_json()
    result = mongo.db.tasks.insert_one(new_task)
    return convert_to_json({'inserted_id': str(result.inserted_id)})

# Update an existing Task by ID
@app.route('/api/tasks/<string:id>', methods=['PUT'])
def update_task(id):
    updated_task = request.get_json()
    result = mongo.db.tasks.update_one({'_id': id}, {'$set': updated_task})
    return convert_to_json({'modified_count': result.modified_count})

# Delete a Task by ID
@app.route('/api/tasks/<string:id>', methods=['DELETE'])
def delete_task(id):
    result = mongo.db.tasks.delete_one({'_id': id})
    return convert_to_json({'deleted_count': result.deleted_count})




# Resource Endpoints
@app.route('/api/resources', methods=['GET'])
def get_resources():
    resources = mongo.db.resources.find()
    return convert_to_json(resources)

@app.route('/api/resources/<string:id>', methods=['GET'])
def get_resource(id):
    resource = mongo.db.resources.find_one({'_id': id})
    return convert_to_json(resource)

# Create a new Resource
@app.route('/api/resources', methods=['POST'])
def create_resource():
    new_resource = request.get_json()
    result = mongo.db.resources.insert_one(new_resource)
    return convert_to_json({'inserted_id': str(result.inserted_id)})

# Update an existing Resource by ID
@app.route('/api/resources/<string:id>', methods=['PUT'])
def update_resource(id):
    updated_resource = request.get_json()
    result = mongo.db.resources.update_one({'_id': id}, {'$set': updated_resource})
    return convert_to_json({'modified_count': result.modified_count})

# Delete a Resource by ID
@app.route('/api/resources/<string:id>', methods=['DELETE'])
def delete_resource(id):
    result = mongo.db.resources.delete_one({'_id': id})
    return convert_to_json({'deleted_count': result.deleted_count})


if __name__ == '__main__':
    app.run(debug=True)

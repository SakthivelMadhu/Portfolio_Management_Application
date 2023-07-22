# project_prism/backend/routes.py
from flask_restful import Resource, reqparse, marshal, fields
from app import api, db
from models import PortfolioManager, Project, Task, Resource
from models import User
from flask_login import login_user, logout_user, login_required, current_user

portfolio_manager_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'status': fields.Boolean,
    'role': fields.String,
    'bio': fields.String,
    'start_date': fields.Date
}

project_fields = {
    'id': fields.Integer,
    'project_name': fields.String,
    'status': fields.String,
    'start_date': fields.Date,
    'end_date': fields.Date,
    'portfolio_manager_id': fields.Integer
}

task_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'status': fields.String,
    'project_id': fields.Integer
}

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'task_id': fields.Integer
}

class SignupResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        username = args['username']
        password = args['password']

        # Check if the username already exists
        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists'}, 400

        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return {'message': 'User successfully registered'}, 201


class LoginResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        username = args['username']
        password = args['password']

        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return {'message': 'Invalid credentials'}, 401

        login_user(user)
        return {'message': 'Login successful'}, 200


class LogoutResource(Resource):
    @login_required
    def post(self):
        logout_user()
        return {'message': 'Logout successful'}, 200


class PortfolioManagerResource(Resource):
    def get(self, portfolio_manager_id=None):
        if portfolio_manager_id:
            portfolio_manager = PortfolioManager.query.get(portfolio_manager_id)
            if not portfolio_manager:
                return {'message': 'Portfolio Manager not found'}, 404
            return marshal(portfolio_manager, portfolio_manager_fields), 200
        else:
            portfolio_managers = PortfolioManager.query.all()
            return marshal(portfolio_managers, portfolio_manager_fields), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('status', type=bool, default=True)
        parser.add_argument('role', type=str, required=True)
        parser.add_argument('bio', type=str)
        parser.add_argument('start_date', type=str, required=True)
        args = parser.parse_args()

        portfolio_manager = PortfolioManager(
            name=args['name'],
            status=args['status'],
            role=args['role'],
            bio=args['bio'],
            start_date=args['start_date']
        )
        db.session.add(portfolio_manager)
        db.session.commit()

        return marshal(portfolio_manager, portfolio_manager_fields), 201

    def put(self, portfolio_manager_id):
        portfolio_manager = PortfolioManager.query.get(portfolio_manager_id)
        if not portfolio_manager:
            return {'message': 'Portfolio Manager not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('status', type=bool, required=True)
        parser.add_argument('role', type=str, required=True)
        parser.add_argument('bio', type=str)
        parser.add_argument('start_date', type=str, required=True)
        args = parser.parse_args()

        portfolio_manager.name = args['name']
        portfolio_manager.status = args['status']
        portfolio_manager.role = args['role']
        portfolio_manager.bio = args['bio']
        portfolio_manager.start_date = args['start_date']

        db.session.commit()

        return marshal(portfolio_manager, portfolio_manager_fields), 200

    def delete(self, portfolio_manager_id):
        portfolio_manager = PortfolioManager.query.get(portfolio_manager_id)
        if not portfolio_manager:
            return {'message': 'Portfolio Manager not found'}, 404

        db.session.delete(portfolio_manager)
        db.session.commit()

        return {'message': 'Portfolio Manager deleted successfully'}, 200


class ProjectResource(Resource):
    def get(self, project_id=None):
        if project_id:
            project = Project.query.get(project_id)
            if not project:
                return {'message': 'Project not found'}, 404
            return marshal(project, project_fields), 200
        else:
            projects = Project.query.all()
            return marshal(projects, project_fields), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('project_name', type=str, required=True)
        parser.add_argument('status', type=str, required=True)
        parser.add_argument('start_date', type=str, required=True)
        parser.add_argument('end_date', type=str)
        parser.add_argument('portfolio_manager_id', type=int, required=True)
        args = parser.parse_args()

        project = Project(
            project_name=args['project_name'],
            status=args['status'],
            start_date=args['start_date'],
            end_date=args['end_date'],
            portfolio_manager_id=args['portfolio_manager_id']
        )
        db.session.add(project)
        db.session.commit()

        return marshal(project, project_fields), 201

    def put(self, project_id):
        project = Project.query.get(project_id)
        if not project:
            return {'message': 'Project not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('project_name', type=str, required=True)
        parser.add_argument('status', type=str, required=True)
        parser.add_argument('start_date', type=str, required=True)
        parser.add_argument('end_date', type=str)
        parser.add_argument('portfolio_manager_id', type=int, required=True)
        args = parser.parse_args()

        project.project_name = args['project_name']
        project.status = args['status']
        project.start_date = args['start_date']
        project.end_date = args['end_date']
        project.portfolio_manager_id = args['portfolio_manager_id']

        db.session.commit()

        return marshal(project, project_fields), 200

    def delete(self, project_id):
        project = Project.query.get(project_id)
        if not project:
            return {'message': 'Project not found'}, 404

        db.session.delete(project)
        db.session.commit()

        return {'message': 'Project deleted successfully'}, 200


class TaskResource(Resource):
    def get(self, task_id=None):
        if task_id:
            task = Task.query.get(task_id)
            if not task:
                return {'message': 'Task not found'}, 404
            return marshal(task, task_fields), 200
        else:
            tasks = Task.query.all()
            return marshal(tasks, task_fields), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('status', type=str, required=True)
        parser.add_argument('project_id', type=int, required=True)
        args = parser.parse_args()

        task = Task(
            name=args['name'],
            status=args['status'],
            project_id=args['project_id']
        )
        db.session.add(task)
        db.session.commit()

        return marshal(task, task_fields), 201

    def put(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return {'message': 'Task not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('status', type=str, required=True)
        parser.add_argument('project_id', type=int, required=True)
        args = parser.parse_args()

        task.name = args['name']
        task.status = args['status']
        task.project_id = args['project_id']

        db.session.commit()

        return marshal(task, task_fields), 200

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return {'message': 'Task not found'}, 404

        db.session.delete(task)
        db.session.commit()

        return {'message': 'Task deleted successfully'}, 200


class ResourceResource(Resource):
    def get(self, resource_id=None):
        if resource_id:
            resource = Resource.query.get(resource_id)
            if not resource:
                return {'message': 'Resource not found'}, 404
            return marshal(resource, resource_fields), 200
        else:
            resources = Resource.query.all()
            return marshal(resources, resource_fields), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('task_id', type=int, required=True)
        args = parser.parse_args()

        resource = Resource(
            name=args['name'],
            task_id=args['task_id']
        )
        db.session.add(resource)
        db.session.commit()

        return marshal(resource, resource_fields), 201

    def put(self, resource_id):
        resource = Resource.query.get(resource_id)
        if not resource:
            return {'message': 'Resource not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('task_id', type=int, required=True)
        args = parser.parse_args()

        resource.name = args['name']
        resource.task_id = args['task_id']

        db.session.commit()

        return marshal(resource, resource_fields), 200

    def delete(self, resource_id):
        resource = Resource.query.get(resource_id)
        if not resource:
            return {'message': 'Resource not found'}, 404

        db.session.delete(resource)
        db.session.commit()

        return {'message': 'Resource deleted successfully'}, 200

api.add_resource(SignupResource, '/api/signup')
api.add_resource(LoginResource, '/api/login')
api.add_resource(LogoutResource, '/api/logout')
api.add_resource(PortfolioManagerResource, '/api/portfolio_managers', '/api/portfolio_managers/<int:portfolio_manager_id>')
api.add_resource(ProjectResource, '/api/projects', '/api/projects/<int:project_id>')
api.add_resource(TaskResource, '/api/tasks', '/api/tasks/<int:task_id>')
api.add_resource(ResourceResource, '/api/resources', '/api/resources/<int:resource_id>')

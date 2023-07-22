# project_prism/backend/config.py
# Example configuration settings for the Flask application

# Enable debugging mode (only for development, should be set to False in production)
DEBUG = True

# Secret key for session management (keep this secure and unique in production)
SECRET_KEY = '1234'

# Database configuration
DB_USERNAME = 'root'
DB_PASSWORD = 'Sakthivel1402!'
DB_HOST = 'localhost'
DB_NAME = 'project_prism_db'
DB_URI = f'mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'

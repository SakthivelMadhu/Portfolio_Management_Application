# Project Prism - Portfolio Management Application Documentation
# Overview

Project Prism is a Portfolio Management Application designed to streamline the process of project and task management for portfolio managers. This web application provides a user-friendly interface for managing portfolio manager profiles, projects, tasks, and resources efficiently. It allows users to perform CRUD (Create, Read, Update, Delete) operations on these entities, manage relationships between them and provides advanced features such as pagination, filtering, and sorting.

# Technology Stack
* Frontend: HTML, CSS, JavaScript, React
* Backend: Python, Flask (RESTful API)
* Database: MySQL

# Installation and Setup
1. Clone the repository from GitHub:
git clone https://github.com/your_username/project_prism.git

3. Backend Setup:<br>
* Navigate to the backend directory: <br> 
  cd project_prism/backend
* Install Python dependencies from requirements.txt:  <br>
  pip install -r requirements.txt
* Run the backend server:  <br>
  python app.py

3. Frontend Setup:

* Navigate to the frontend/portfolio-management-app directory: <br>
cd project_prism/frontend/portfolio-management-app
* Install Node.js dependencies: <br>
npm install
* Run the frontend React application: <br>
  npm start
4. Access the application at http://localhost:3000/ in your web browser.


# Features : 
## Portfolio Managers:

Add new portfolio managers with Name, Status, Role, Bio, and Start Date.
View a list of existing portfolio managers.
## Projects:

Add new projects with Project Name, Status, Start Date, and End Date.
View a list of existing projects associated with their respective portfolio managers.
## Tasks:

Add new tasks with Task Name, Status, and associated Project ID.
View a list of existing tasks associated with their respective projects.
## Resources:

Add new resources with Resource Name and associated Task ID.
View a list of existing resources associated with their respective tasks.
## Advanced Features:

Pagination: The Project listing page supports pagination to view projects in smaller chunks.
Filtering: Projects can be filtered by the Status and Portfolio Manager.
Sorting: Projects can be sorted by Status and Start Date.

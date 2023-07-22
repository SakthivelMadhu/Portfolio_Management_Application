GET /api/portfolio_managers: Fetch all portfolio managers.
POST /api/portfolio_managers: Add a new portfolio manager.
GET /api/projects: Fetch all projects.
POST /api/projects: Add a new project.
GET /api/tasks: Fetch all tasks.
POST /api/tasks: Add a new task.
GET /api/resources: Fetch all resources.
POST /api/resources: Add a new resource.

API Documentation
Base URL
The base URL for all API requests is: http://localhost:5000/api

Authentication
The API endpoints do not require authentication for this version of the application.

Endpoints
Portfolio Managers
GET /portfolio_managers
Fetch all portfolio managers.

Response
Status Code: 200 OK
Response Body:
 
 
[
  {
    "id": 1,
    "name": "John Doe",
    "status": "Active",
    "role": "Administrator",
    "bio": "Experienced portfolio manager with a strong track record.",
    "start_date": "2023-07-01"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "status": "Inactive",
    "role": "Viewer",
    "bio": "Aspiring portfolio manager looking for new opportunities.",
    "start_date": "2023-07-05"
  },
  ...
]
POST /portfolio_managers
Add a new portfolio manager.

Request Body
JSON Payload:
json
 
{
  "name": "John Doe",
  "status": "Active",
  "role": "Administrator",
  "bio": "Experienced portfolio manager with a strong track record.",
  "start_date": "2023-07-01"
}
Response
Status Code: 201 Created
Response Body:
json
 
{
  "id": 3,
  "name": "John Doe",
  "status": "Active",
  "role": "Administrator",
  "bio": "Experienced portfolio manager with a strong track record.",
  "start_date": "2023-07-01"
}
Projects
GET /projects
Fetch all projects.

Response
Status Code: 200 OK
Response Body:
json
 
[
  {
    "id": 1,
    "project_name": "Project A",
    "status": "Planned",
    "start_date": "2023-08-01",
    "end_date": "2023-09-30",
    "portfolio_manager_id": 1
  },
  {
    "id": 2,
    "project_name": "Project B",
    "status": "In Progress",
    "start_date": "2023-09-15",
    "end_date": "2023-11-30",
    "portfolio_manager_id": 2
  },
  ...
]
POST /projects
Add a new project.

Request Body
JSON Payload:
json
 
{
  "project_name": "Project A",
  "status": "Planned",
  "start_date": "2023-08-01",
  "end_date": "2023-09-30",
  "portfolio_manager_id": 1
}
Response
Status Code: 201 Created
Response Body:
json
 
{
  "id": 3,
  "project_name": "Project A",
  "status": "Planned",
  "start_date": "2023-08-01",
  "end_date": "2023-09-30",
  "portfolio_manager_id": 1
}
Tasks
GET /tasks
Fetch all tasks.

Response
Status Code: 200 OK
Response Body:
json
 
[
  {
    "id": 1,
    "task_name": "Task 1",
    "status": "To Do",
    "project_id": 1
  },
  {
    "id": 2,
    "task_name": "Task 2",
    "status": "In Progress",
    "project_id": 1
  },
  ...
]
POST /tasks
Add a new task.

Request Body
JSON Payload:
 
 
{
  "task_name": "Task 1",
  "status": "To Do",
  "project_id": 1
}
Response
Status Code: 201 Created
Response Body:
 
 
{
  "id": 3,
  "task_name": "Task 1",
  "status": "To Do",
  "project_id": 1
}
Resources
GET /resources
Fetch all resources.

Response
Status Code: 200 OK
Response Body:
 
 
[
  {
    "id": 1,
    "resource_name": "Resource A",
    "task_id": 1
  },
  {
    "id": 2,
    "resource_name": "Resource B",
    "task_id": 1
  },
  ...
]
POST /resources
Add a new resource.

Request Body
JSON Payload:

 
{
  "resource_name": "Resource A",
  "task_id": 1
}
Response
Status Code: 201 Created
Response Body:

{
  "id": 3,
  "resource_name": "Resource A",
  "task_id": 1
}
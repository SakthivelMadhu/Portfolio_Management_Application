-- SQL script to insert sample data into the Portfolio Management Application tables

-- Insert sample portfolio managers
INSERT INTO portfolio_managers (name, status, role, bio, start_date) VALUES
('John Doe', 'Active', 'Administrator', 'Experienced portfolio manager with a strong track record.', '2023-07-01'),
('Jane Smith', 'Inactive', 'Viewer', 'Aspiring portfolio manager looking for new opportunities.', '2023-07-05');

-- Insert sample projects
INSERT INTO projects (project_name, status, start_date, end_date, portfolio_manager_id) VALUES
('Project A', 'Planned', '2023-08-01', '2023-09-30', 1),
('Project B', 'In Progress', '2023-09-15', '2023-11-30', 2);

-- Insert sample tasks
INSERT INTO tasks (task_name, status, project_id) VALUES
('Task 1', 'To Do', 1),
('Task 2', 'In Progress', 1),
('Task 3', 'Completed', 2);

-- Insert sample resources
INSERT INTO resources (resource_name, task_id) VALUES
('Resource A', 1),
('Resource B', 1),
('Resource C', 2);

-- SQL script to create tables for the Portfolio Management Application

-- Create Portfolio Managers table
CREATE TABLE portfolio_managers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  status ENUM('Active', 'Inactive') NOT NULL,
  role ENUM('Administrator', 'Viewer') NOT NULL,
  bio TEXT,
  start_date DATE NOT NULL
);

-- Create Projects table
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(255) NOT NULL,
  status ENUM('Planned', 'In Progress', 'Completed') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  portfolio_manager_id INT NOT NULL,
  FOREIGN KEY (portfolio_manager_id) REFERENCES portfolio_managers (id)
);

-- Create Tasks table
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  status ENUM('To Do', 'In Progress', 'Completed') NOT NULL,
  project_id INT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id)
);

-- Create Resources table
CREATE TABLE resources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource_name VARCHAR(255) NOT NULL,
  task_id INT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks (id)
);

const inquirer = require('inquirer');
const Role = require('./Role');

class Employee {
    static async addEmployee(db) {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee you would like to add?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the last name of the employee you would like to add?',
                name: 'employeeLastName',
            },
            {
                type: 'input',
                message: 'What is the role of the employee you would like to add?',
                name: 'employeeRole',
            },
            {
                type: 'input',
                message: 'Who is the manager of the employee you would like to add?',
                name: 'employeeManager',
            },
        ]);

        // find role record
        const result = await db.query('SELECT * FROM roles WHERE title=?', [answer.employeeRole]);
        const roles = result[0];
        if (roles.length === 0){
            console.log('Failed to add role')
            console.log(`Role does not exist: ${answer.employeeRole}`);
            return;
        }
        const role = roles[0]; // {id, title, salary, department_id}
        const roleId = role.id;
        // getting manager info
        let managerId;
        if (answer.employeeManager === '') {
            // manager was not given
            managerId = null;
        } else {
            // manager was given
            // when manager is given, split the first and last name from the manager input
            const name = answer.employeeManager.split(' ');
            const managerFirstName = name[0];
            const managerLastName = name[1];

            // query the db to check that the manager exists
            const result = await db.query('SELECT * FROM employees WHERE first_name = ? AND last_name = ?', [managerFirstName, managerLastName]);
            const managers = result[0];
            // when manager doesn't exist in the db, output to the user invalid manager
            if (managers.length === 0){
                console.log('Failed to add employee');
                console.log(`Manager does not exist: ${answer.employeeManager}`);
                return;
            }
            // when manager exists, get the employee id of that manager
            const manager = managers[0]; // {id, first_name, last_name, role_id, manager_id}
            managerId = manager.id;
        }
        await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.employeeFirstName, answer.employeeLastName, roleId, managerId]);
    }

    static async getEmployees(db) {
        const result = await db.query('SELECT * FROM employees;');
        const employees = result[0];
        return employees;
    }

    static async viewEmployees(db) {
        const employeesResult = await db.query(`SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary, departments.name AS department_name FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id`);
        const managersResult = await db.query(`SELECT managers.id, managers.first_name, managers.last_name FROM employees INNER JOIN employees AS managers ON employees.manager_id=managers.id;`);
        const managers = managersResult[0];
        const employees = employeesResult[0];
        const employeesInfo = employees.map(employee => {
            const manager = managers.find(manager => manager.id === employee.manager_id);
            return {
                'First Name': employee.first_name,
                'Last Name': employee.last_name,
                'Role Title': employee.role_title,
                'Role Salary': parseFloat(employee.salary),
                'Department Name': employee.department_name,
                'Manager': manager ? `${manager.first_name} ${manager.last_name}` : 'No Manager',
            };
        });
        console.table(employeesInfo, ['First Name', 'Last Name', 'Role Title', 'Role Salary', 'Department Name', 'Manager']);   
    }

    static async updateEmployeeRole(db) {
        const employeeList = await Employee.getEmployees(db);
        const rolesList = await Role.getRoles(db);
        const answer = await inquirer.prompt([
            {
                type: 'list',
                message: 'Select the employee you would like to update.',
                name: 'selectedEmployeeId',
                choices: employeeList.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`, value: employee.id
                })),
            },
            {   
                type: 'list',
                message: 'Select the role you would like to apply.',
                name: 'selectedRoleId',
                choices: rolesList.map(role => ({
                    name: role.title, value: role.id
                })),
            },
        ]);
        const {selectedEmployeeId, selectedRoleId} = answer;
        await db.query(
            'UPDATE employees SET role_id = ? WHERE id = ?', [selectedRoleId, selectedEmployeeId]
        );
        console.log('Role updated!');
    } 
}





module.exports = Employee;
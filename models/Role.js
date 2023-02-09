const inquirer = require ("inquirer");
const Department = require("./Department");

class Role { 
    static async addRole(db) {
        const departmentsList = await Department.getDepartments(db);
        const answer = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role you would like to add?',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'What is the department id of the role you would like to add?',
                name: 'departmentId',
                choices: departmentsList.map(department => ({
                    name: department.name, value: department.id
                })),
            },
        ]);
        try {
            await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', [answer.roleName, parseFloat(answer.roleSalary), parseInt(answer.departmentId)])
            console.log('Role added!');
        } catch(error) {
            console.log('Failed to add a Role');
        }
        
    }
    static async getRoles (db) {
        const result = await db.query('SELECT * FROM roles')
        const roles = result[0];
        return roles; 
    }
}

module.exports = Role; 

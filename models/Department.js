const inquirer = require('inquirer');

class Department { 
    static async addDepartment (db) {
        // Step 1: Get neccessary data from user
        const answer = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department you would like to add?',
                name: 'departmentName',
            },
        ]);
        
        // Step 2: create the department record in the db
        try{
            await db.query('INSERT INTO departments (name) VALUES (?);', [answer.departmentName]);
            console.log('Department Added!');
        } catch(err) {
            console.log("Failed to add department");
        }

        
        
    }
    static async getDepartments (db) {
        const result = await db.query('SELECT * FROM departments;');
        const departments = result[0];
        return departments; // [{id: 1, name: 'Sales'}, {id: 2, name: 'Engineering'}}]
    }
}
module.exports = Department;

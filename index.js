const inquirer = require('inquirer');
const { connectToDb } = require('./config/connection');
const Department = require('./models/Department');
const Role = require("./models/Role");
const Employee = require('./models/Employee')


const initTables = async (dbConnection) => {
    // read the .sql file

    // fs.readFile('./db/schema.sql', 'utf8', (err, data) => {
    // run the .sql file with the db exec method
}

const seedDb = async (dbConnection) => {}

const main = async () => {
    const db = await connectToDb();
    // seed the database
    await initTables(db);
    await seedDb(db);
    console.log("app is running!");
    while (true) {
        // start prompting the user
        const answer = await inquirer.prompt ([
            {
                type: 'list',
                message: 'What would you  like to do?',
                name: 'actionType',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit'],
            },
        ]);
        switch (answer.actionType) {
            case 'view all departments':
                const departments = await Department.getDepartments(db);
                console.table(departments, ['id', 'name']);
                break;
            case 'add a department':
                await Department.addDepartment(db);
                console.log('Department added!');
                break;
            case 'view all roles':
                const roles = await Role.getRoles(db);
                console.table(roles, ['id', 'title', 'salary', 'department_id']);
                break;
            case 'add a role':
                await Role.addRole(db);
                break;
            case 'add an employee':
                await Employee.addEmployee(db);
                console.log('Employee added!');
                break;
            case 'view all employees':
                await Employee.viewEmployees(db);
                break;
            case 'update an employee role':
                await Employee.updateEmployeeRole(db);
                break;
            case 'exit':
                console.log('Goodbye!');
                process.exit(0);
                     
        }
    }
}
main();

//TODO:
//install inquirer and import it 
//create a function that will prompt the user with a list of options
// set up three classes/files in models for each table in the database




static async addEmployee () {
    const newEmployee = await inquirer.prompt([
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
};
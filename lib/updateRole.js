

static async updateRole () {
    const updateRole = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update?',
            name: 'employeeName',
            choices: ['John Doe', 'Jane Doe', 'Joe Doe', 'Jill Doe'],
        },
        {
            type: 'input',
            message: 'What is the new role of the employee?',
            name: 'newEmployeeRole',
        },
    ]);



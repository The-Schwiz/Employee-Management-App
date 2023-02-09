

static async addRole () {
    const role = await inquirer.prompt([
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
            type: 'input',
            message: 'What is the department of the role you would like to add?',
            name: 'roleDepartment',
        },
    ]);
}
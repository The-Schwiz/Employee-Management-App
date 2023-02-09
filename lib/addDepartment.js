


static async addDepartment () {
    const department = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'departmentName',
        },
]);
}

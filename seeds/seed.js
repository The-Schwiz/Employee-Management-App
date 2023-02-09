const { connectToDb } = require('../config/connection');

async function seedDb() {
    const db = await connectToDb();

    // cleanup previous data
    await db.query('DELETE FROM employees');
    await db.query('DELETE FROM roles');
    await db.query('DELETE FROM departments');

    // create departments
    const salesDepartmentResult = await db.query('INSERT INTO departments (name) VALUES (?);', ['Sales']);
    const salesDepartmentId = salesDepartmentResult[0].insertId;
    const marketingDepartmentResult = await db.query('INSERT INTO departments (name) VALUES (?);', ['Marketing']);
    const marketingDepartmentId = marketingDepartmentResult[0].insertId;
    const itDepartmentResult = await db.query('INSERT INTO departments (name) VALUES (?);', ['IT']);
    const itDepartmentId = itDepartmentResult[0].insertId;
    const hrDepartmentResult = await db.query('INSERT INTO departments (name) VALUES (?);', ['HR']);
    const hrDepartmentId = hrDepartmentResult[0].insertId;
    // create roles
    const salesRoleResult = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', ['SDR', 50000.00, salesDepartmentId]);
    const salesRoleId = salesRoleResult[0].insertId;
    // marketing manager roles
    const marketingManagerRoleResult = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', ['Marketing Manager', 100000.00, marketingDepartmentId]);
    const marketingManagerRoleId = marketingManagerRoleResult[0].insertId;

    const marketingRoleResult = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', ['PR Representative', 50000.00, marketingDepartmentId]);
    const marketingRoleId = marketingRoleResult[0].insertId;
    const itRoleResult = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', ['IT', 50000.00, itDepartmentId]);
    const itRoleId = itRoleResult[0].insertId;
    const hrRoleResult = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', ['HR Representative', 60000.00, hrDepartmentId]);
    const hrRoleId = hrRoleResult[0].insertId;
    // create employees
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Jason', 'Monaco', salesRoleId, null]);
    const marketingManagerResult = await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['David', 'Wharf', marketingManagerRoleId, null]);
    const marketingManagerId = marketingManagerResult[0].insertId;
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Serena', 'Miles', marketingRoleId, marketingManagerId]);
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Misty', 'Wilfred', hrRoleId, null]);
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Sean', 'Marks', itRoleId, null]);

    console.log('Database seeded!');
    process.exit(0);
}

seedDb();
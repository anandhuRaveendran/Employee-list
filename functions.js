const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

let employees = [];
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employees.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add', (req, res) => {
    const { name, role , doj } = req.body;
    const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    const newEmployee = { id, name, role ,doj };
    employees.push(newEmployee);
    console.log(employees);
    res.redirect('/index');

});
app.put('/update', (req, res) => {
    console.log(req.body.id)
    const id= req.body.id
    const employee = employees.find(e => e.id === parseInt(id));
    if (employee) {
        const { name, role, doj } = req.body;
        if (!name || !role || !doj) {
            return res.status(400).send('All fields are required');
        }
        employee.name = name;
        employee.role = role;
        employee.doj = doj;
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
});

app.delete('/delete/:id', (req, res) => {
    let id=req.params.id
    id=id.split(':')
    const index = employees.findIndex(e => e.id === parseInt(id[1]));
    if (index !== -1) {
        employees.splice(index, 1);
        res.send('Employee deleted');
    } else {
        
        res.status(404).send('Employee not found');
    }
});
app.get('/employee/:id', (req, res) => {

    res.json(employees);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
#!/usr/bin/env ts-node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blueBright("\n \t Welcome to the Student Management System!"));
const studentId = Math.floor(10000 + Math.random() * 9000); // No decimals 
let balance = 0;
const answers = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: "Enter student's name: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a valid name!";
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Select a course: ",
        choices: ['GenAI', 'Next.js', 'DevOps', 'AI/ML', 'JavaScript']
    }
]);
let tuitionFees = {
    "GenAI": 1200, // $ Dollar
    "Next.js": 1500, // $ Dollar
    "DevOps": 1800, // $ Dollar
    "AI/ML": 2100, // $ Dollar
    "JavaScript": 1000 // $ Dollar
};
console.log(`\n Tuition Fees: ${tuitionFees[answers.courses]}`);
console.log(" Balance: ", balance);
const paymentAnswers = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method: ",
        choices: [
            'Visa Card',
            'JazzCash',
            'Bank Transfer'
        ]
    },
    {
        name: "amount",
        type: "input",
        message: "Enter the payment amount: ",
        validate: function (value) {
            if (!isNaN(parseFloat(value)) && parseFloat(value) > 0) {
                return true;
            }
            return chalk.red("Please enter a valid amount!");
        }
    }
]);
console.log(`\n Payment method: ${paymentAnswers.payment}`);
const tuitionfees = tuitionFees[answers.courses];
// A function that parses a string into floating number
const paymentAmount = parseFloat(paymentAnswers.amount); // User amount (number)
if (tuitionfees === paymentAmount) {
    console.log(chalk.greenBright("Hurray! You have successfully enrolled in ", answers.courses));
}
else {
    console.log(chalk.red("Invalid amount due to course \n"));
}
let ans = await inquirer.prompt({
    name: "select",
    type: "list",
    message: "What would you like to do next?",
    choices: ["View Status", "Exit"]
});
if (ans.select === "View Status") {
    console.log(chalk.bgBlue.bold("<-------- Status -------->"));
    console.log("Student Name: ", answers.student);
    console.log("Student ID: ", studentId);
    console.log("Course Enrolled: ", answers.courses);
    console.log("Tution Fees Paid: ", paymentAmount);
    console.log("Balance: ", balance += paymentAmount);
}
else {
    console.log(chalk.yellowBright("\n \t Exiting Student Management System... \t"));
}

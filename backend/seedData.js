require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Income = require("./models/Income");
const Expense = require("./models/Expense");

const seedData = async () => {
    console.log("Starting seeding process...");
    try {
        console.log("Connecting to MongoDB...");
        await connectDB();
        console.log("Connected Successfully.");

        const email = "john@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found. Please register the user first.`);
            process.exit(1);
        }

        const userId = user._id;

        // Clear existing data for this user for the last 30 days to avoid duplicates
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        await Income.deleteMany({ userId, date: { $gte: thirtyDaysAgo } });
        await Expense.deleteMany({ userId, date: { $gte: thirtyDaysAgo } });

        console.log("Cleared existing data for the last 30 days.");

        const expenses = [];
        const incomes = [];

        const categories = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Health", "Shopping"];
        const incomeSources = ["Salary", "Freelance", "Investment", "Gift"];

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            // Add an expense for almost every day
            expenses.push({
                userId,
                category: categories[Math.floor(Math.random() * categories.length)],
                amount: Math.floor(Math.random() * 50) + 10,
                description: `Daily expense for ${date.toDateString()}`,
                date,
                icon: "💰"
            });

            // Add an income every week (approx)
            if (i % 7 === 0) {
                incomes.push({
                    userId,
                    source: incomeSources[Math.floor(Math.random() * incomeSources.length)],
                    amount: Math.floor(Math.random() * 1000) + 500,
                    description: `Weekly income for ${date.toDateString()}`,
                    date,
                    icon: "💵"
                });
            }
        }

        await Expense.insertMany(expenses);
        await Income.insertMany(incomes);

        console.log(`Successfully seeded 30 days of data for ${email}`);
        console.log(`Added ${expenses.length} expenses and ${incomes.length} incomes.`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();

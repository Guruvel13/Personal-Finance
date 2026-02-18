import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../components/layouts/Modal";
import AddBudgetForm from "../../components/Budget/AddBudgetForm";
import BudgetOverview from "../../components/Budget/BudgetOverview";
import BudgetList from "../../components/Budget/BudgetList";
import BudgetChart from "../../components/Budget/BudgetChart";
import toast from "react-hot-toast";

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [budgetRes, expenseRes] = await Promise.all([
                axiosInstance.get(API_PATHS.BUDGET.GET_BUDGETS),
                axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSE),
            ]);

            setBudgets(budgetRes.data);

            // Normalize expense categories to match budget categories
            const normalizedExpenses = (expenseRes.data.expense || []).map(exp => {
                let category = exp.category;
                if (category === "Food & Drink" || category === "Groceries") category = "Food";
                if (category === "Transportation") category = "Transport";
                return { ...exp, category };
            });

            setExpenses(normalizedExpenses);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load budget data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddBudget = async (budgetData) => {
        try {
            await axiosInstance.post(API_PATHS.BUDGET.ADD_BUDGET, budgetData);
            toast.success("Budget added successfully");
            setOpenAddBudgetModal(false);
            fetchData();
        } catch (error) {
            console.error("Error adding budget:", error);
            toast.error("Failed to add budget");
        }
    };

    return (
        <DashboardLayout activeMenu="Budget">
            <div className="my-8 mx-auto px-2 md:px-4">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
                        <p className="text-gray-500 text-sm mt-1">Track your spending and save more.</p>
                    </div>
                    <button
                        onClick={() => setOpenAddBudgetModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-95"
                    >
                        <IoMdAdd size={20} /> Set New Budget
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-primary animate-pulse">Loading Budgets...</div>
                    </div>
                ) : (
                    <>
                        <BudgetOverview budgets={budgets} expenses={expenses} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Budget Categories</h3>
                                {budgets.length > 0 ? (
                                    <BudgetList budgets={budgets} expenses={expenses} />
                                ) : (
                                    <div className="bg-white p-6 rounded-2xl text-center text-gray-500 border border-gray-100">
                                        No budgets set. Click "Set New Budget" to get started.
                                    </div>
                                )}
                            </div>
                            <div className="lg:col-span-1">
                                <BudgetChart budgets={budgets} expenses={expenses} />
                            </div>
                        </div>
                    </>
                )}

                {/* Add Budget Modal */}
                <Modal
                    isOpen={openAddBudgetModal}
                    onClose={() => setOpenAddBudgetModal(false)}
                    title="Set New Budget"
                >
                    <AddBudgetForm
                        onAddBudget={handleAddBudget}
                        onClose={() => setOpenAddBudgetModal(false)}
                    />
                </Modal>

            </div>
        </DashboardLayout>
    );
};

export default Budget;

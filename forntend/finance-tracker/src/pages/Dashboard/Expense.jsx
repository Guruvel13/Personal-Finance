import React from "react";
import { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useEffect } from "react";
import ExpenseOverview from "../../components/Expense/ExpenseOverview"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/layouts/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/layouts/DeleteAlert";


const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

    const fetchExpenseDetails = async () => {
        if (loading) return
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_EXPENSE}`
            )
            if (response.data) {
                console.log(response.data)
                setExpenseData(response.data.expense)
            }
        } catch (error) {
            console.log("Something went wrong. Please try again ", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
        if (!category.trim()) {
            toast.error("Source is required")
            return
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount Should be a valid number")
            return
        }
        if (!date) {
            toast.error("Date is required")
            return
        }
        if (!icon) {
            toast.error("Icon is required")
            return
        }
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon
            });
            setOpenAddExpenseModal(false)
            toast.success("Expense added successfully")
            fetchExpenseDetails()
        }
        catch (error) {
            console.log("Something went wrong. Please try again ", error.response?.data?.message || error.message);

        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
            setOpenDeleteAlert({ show: false, data: null })
            toast.success("Expense deleted successfully")
            fetchExpenseDetails()
        } catch (error) {
            console.log("Something went wrong. Please try again ", error.response?.data?.message || error.message);
        }
    }

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                {
                    responseType: "blob",
                }
            )
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Something went wrong. Please try again ", error.response?.data?.message || error.message);
            toast.error("Failed to download expense details")
        }

    }
    useEffect(() => {
        fetchExpenseDetails()

        return () => { };
    }, [])


    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => { setOpenDeleteAlert({ show: true, data: id }) }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>
                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout >
    )
}
export default Expense;
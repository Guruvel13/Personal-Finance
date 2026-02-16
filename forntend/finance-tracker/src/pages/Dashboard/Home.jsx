import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard, IoMdAdd } from "react-icons/io";
import { LuArrowUp, LuArrowDown } from "react-icons/lu";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import SpendingTrends from "../../components/Dashboard/SpendingTrends";
import TopCategories from "../../components/Dashboard/TopCategories";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import toast from "react-hot-toast";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response?.data) {
        setDashboardData(response.data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon, title } = expense;
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
        description: title,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="text-lg font-semibold animate-pulse text-primary">
            Loading Dashboard...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-8 mx-auto px-2 md:px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
            <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening with your money.</p>
          </div>
          <button
            onClick={() => setOpenAddExpenseModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-95"
          >
            <IoMdAdd size={20} /> Add Transaction
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="text-primary bg-purple-50"
            percentage={2.5}
          />
          <InfoCard
            icon={<LuArrowUp />}
            label="Monthly Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="text-green-500 bg-green-50"
            percentage={10.2}
          />
          <InfoCard
            icon={<LuArrowDown />}
            label="Monthly Expenses"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="text-red-500 bg-red-50"
            percentage={-5.4}
          />
        </div>

        {/* Middle Section: Trends & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SpendingTrends data={dashboardData?.last30DaysExpenses?.transactions || []} />
          </div>
          <div className="lg:col-span-1">
            {/* Aggregate transactions for Top Categories */}
            <TopCategories
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            />
          </div>
        </div>

        {/* Bottom Section: Recent Transactions */}
        <RecentTransactions
          transactions={dashboardData?.recentTransactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        {/* Modals */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Transaction"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Home;

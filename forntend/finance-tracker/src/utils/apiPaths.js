// Support dynamically switching between Node (8000) and Java (8080) backends
export const getBaseUrl = () => {
    const selectedBackend = localStorage.getItem('selectedBackend') || 'node';
    if (selectedBackend === 'java') {
        return import.meta.env.VITE_JAVA_API_BASE_URL || 'http://localhost:8080';
    }
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
};

export const BASE_URL = getBaseUrl();

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getuser",
        CHANGE_PASSWORD: "/api/v1/auth/change-password",
        UPDATE_USER: "/api/v1/auth/update-profile",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/download",
        GET_SOURCES: "/api/v1/income/sources",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/download",
        GET_CATEGORIES: "/api/v1/expense/categories",
    },
    BUDGET: {
        ADD_BUDGET: "/api/v1/budget/add-budget",
        GET_BUDGETS: "/api/v1/budget/get-budgets",
        DELETE_BUDGET: (budgetId) => `/api/v1/budget/delete-budget/${budgetId}`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
};

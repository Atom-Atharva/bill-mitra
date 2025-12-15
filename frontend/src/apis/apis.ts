function getEnv(key: string) {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing Environment Variable : ${key}`);
    }
    return value;
}

export const API = {
    // Authentication APIs
    AUTH: {
        login: getEnv("VITE_API_AUTH_LOGIN"),
        registerStore: getEnv("VITE_API_AUTH_REGISTER_STORE"),
        logout: getEnv("VITE_API_AUTH_LOGOUT"),
        registerUser: getEnv("VITE_API_AUTH_REGISTER_USER"),
    },
    // User APIs
    USER: {
        currentUserInfo: getEnv("VITE_API_USER_CURRENT"),
        getAllEmployees: getEnv("VITE_API_ALL_EMPLOYEES"),
        deleteUser: getEnv("VITE_API_DELETE_USER"),
        changePassword: getEnv("VITE_API_CHANGE_PASSWORD"),
    },
    // Category APIs
    CATEGORY: {
        getAllCategories: getEnv("VITE_API_ALL_CATEGORIES"),
        addCategory: getEnv("VITE_API_ADD_CATEGORY"),
        deleteCategory: getEnv("VITE_API_DELETE_CATEGORY"),
    },
    // Items APIs
    ITEMS: {
        getAllItems: getEnv("VITE_API_ALL_ITEMS"),
        addItem: getEnv("VITE_API_ADD_ITEM"),
        deleteItem: getEnv("VITE_API_DELETE_ITEM"),
    },
    // Order APIs
    ORDER: {
        placeOrder: getEnv("VITE_API_PLACE_ORDER"),
        verifySignature: getEnv("VITE_API_VERIFY_SIGNATURE"),
        salesData: getEnv("VITE_API_SALES_DATA"),
        hardworkingEmployee: getEnv("VITE_API_HARDWORKING_EMPLOYEE"),
        mostSellableItem: getEnv("VITE_API_MOST_SELLABLE_ITEM"),
        employeeSales: getEnv("VITE_API_EMPLOYEE_SALES"),
        salesTimeline: getEnv("VITE_API_SALES_TIMELINE"),
        allOrders: getEnv("VITE_API_ALL_ORDERS"),
    },
};

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
    },
    // User APIs
    USER: {
        currentUserInfo: getEnv("VITE_API_USER_CURRENT"),
        getAllEmployees: getEnv("VITE_API_ALL_EMPLOYEES")
    },
};

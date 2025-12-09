export const canDeleteEmployee = (employee: any, currentUser: any): boolean => {
    if (!currentUser) return false;

    const myRole = currentUser.role;
    const myEmail = currentUser.email;

    if (employee.email === myEmail) return false; // cannot delete yourself

    if (myRole === "OWNER") return true; // owner can delete all except themselves

    if (myRole === "MANAGER") {
        return employee.role === "EMPLOYEE"; // manager can only delete employees
    }

    return false; // employee cannot delete anyone
};

import { fetchAllEmployees } from "@/apis/fetchAllEmployees"
import { addAllEmployees } from "@/store/employeeSlice"
import type { RootState } from "@/store/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomEmployeesTable from "./CustomEmployeesTable"

const ManageEmployeeTab = () => {
    const employees = useSelector((state: RootState) => state.employee.employees)
    const dispatch = useDispatch();

    useEffect(() => {
        if (employees.length > 0) {
            return;
        }

        // Fetch all Employees
        const fetchEmployees = async () => {
            try {
                const fetchedEmployees = await fetchAllEmployees();
                if (fetchedEmployees) {
                    dispatch(addAllEmployees(fetchedEmployees));
                }
            } catch (e) {
                console.log("Failed Fetching All Users.")
            }
        }

        fetchEmployees();
    }, [employees])

    return (
        <div>
            <CustomEmployeesTable />
        </div>
    )
}

export default ManageEmployeeTab
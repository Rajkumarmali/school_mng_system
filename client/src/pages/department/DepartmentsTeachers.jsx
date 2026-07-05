import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getDepartmentTeacher } from '../../state/department/Action';
import './DepartmentsTeachers.css'

const DepartmentsTeachers = ({ departmentId }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "teacher";
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10

    const dispatch = useDispatch();
    const department = useSelector((state) => state.department)

    const totalPages = department?.departmentsTeachers?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pageNumber - 1);
                i <= Math.min(totalPages - 1, pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setSearchParams({
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        dispatch(getDepartmentTeacher(departmentId, pageNumber, pageSize))
    }, [dispatch, departmentId, pageNumber, pageSize])

    return (
        <div>
            <div className="department-teacher-header">
                <div>
                    <h2>Teachers</h2>
                </div>
            </div>
            <table className="table department-teacher-table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        department?.departmentsTeachers?.content?.length > 0 ?
                            department?.departmentsTeachers?.content?.map((teacher, index) =>
                                <tr key={teacher.id}>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{teacher.employeeId}</td>
                                    <td>{teacher.firstName}{" "}{teacher.lastName}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.phoneNumber}</td>
                                    <td>{teacher.gender}</td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No Teacher Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{department?.departmentsTeachers?.totalElements || 0}</strong>
                </div>
                <div className="page-size-selector">
                    <label>Show :</label>
                    <select
                        value={pageSize}
                        onChange={handleChangePageSize}
                    >
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <ul className="custom-pagination">
                    <li>
                        <button
                            onClick={handleGetPerviousPageData}
                            disabled={pageNumber === 1}
                        >
                            &laquo;
                        </button>
                    </li>
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <li key={index} className="dots">
                                ...
                            </li>
                        ) : (
                            <li key={index}>
                                <button
                                    className={pageNumber === page ? "active-page" : ""}
                                    onClick={() => handleGetPageNumberData(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        )
                    )}
                    <li>
                        <button
                            onClick={handleGetNextPageData}
                            disabled={pageNumber === totalPages}
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DepartmentsTeachers

import React, { useEffect } from 'react'
import './DepartmentsClasses.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentClass } from '../../state/department/Action';

const DepartmentsClasses = ({ departmentId }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "class";
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10

    const dispatch = useDispatch();
    const department = useSelector((state) => state.department)

    const totalPages = department?.departmentsClasses?.totalPages || 0;
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
        dispatch(getDepartmentClass(departmentId, pageNumber, pageSize))
    }, [dispatch, departmentId, pageNumber, pageSize])


    return (
        <div>
            <div className="department-teacher-header">
                <div>
                    <h2>Classes</h2>
                </div>
            </div>
            <table className="table department-teacher-table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Code</th>
                        <th>Name </th>
                        <th>Academic Year</th>
                        <th>Semester</th>
                        <th>Status</th>
                        <th>Class Teacher</th>
                        <th>Class Teacher Email</th>
                        <th>Class Teacher Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        department?.departmentsClasses?.content?.length > 0 ?
                            department?.departmentsClasses?.content?.map((clas, index) =>
                                <tr key={clas.id}>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{clas.classCode}</td>
                                    <td>{clas.name}</td>
                                    <td>{clas.academicYear}</td>
                                    <td>{clas.semester}</td>
                                    <td>{clas.classStatus}</td>
                                    <td>{clas.classTeacherName}</td>
                                    <td>{clas.classTeacherEmail}</td>
                                    <td>{clas.classTeacherPhoneNumber}</td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No Classes Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{department?.departmentsClasses?.totalElements || 0}</strong>
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

export default DepartmentsClasses

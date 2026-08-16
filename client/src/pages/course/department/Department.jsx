import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getDepartmentByCourseId, getDepartmentByCourseIdForCollege } from '../../../state/course/Action';
import './Department.css'
import { jwtDecode } from 'jwt-decode';

const Department = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isSuperAdmin = roles.includes("SUPER_ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const courseId = searchParams.get("courseId")
    const tab = searchParams.get("tab")

    const dispatch = useDispatch();
    const course = useSelector((state) => state.course)

    const totalPages = isSuperAdmin ?
        course?.courseDepartments?.totalPages || 0
        :
        course?.courseDepartmentsForCollege.totalPages || 0

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
            courseId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        isSuperAdmin ?
            dispatch(getDepartmentByCourseId(courseId, pageNumber, pageSize))
            :
            dispatch(getDepartmentByCourseIdForCollege(courseId, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, courseId, isSuperAdmin]);

    return (
        <div>
            <div>
                <table className="table course-department-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Code</th>
                            <th>Name</th>
                            {
                                isSuperAdmin &&
                                <th>College</th>
                            }
                            <th>HodName</th>
                            <th>HodEmail</th>
                            <th>HodPhoneNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ((isSuperAdmin && course?.courseDepartments?.content?.length === 0) || (course?.courseDepartmentsForCollege?.content?.length === 0)) ?
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No Department Found
                                    </td>
                                </tr>
                                :
                                (
                                    isSuperAdmin ?
                                        (course?.courseDepartments?.content)
                                        :
                                        (course?.courseDepartmentsForCollege?.content)
                                )?.map((department, index) =>
                                    <tr>
                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                        <td>{department.code}</td>
                                        <td>{department.name}</td>
                                        {
                                            isSuperAdmin &&
                                            <td>{department.collegeName ? department.collegeName : "-"}</td>
                                        }

                                        <td>{department.hodName}</td>
                                        <td>{department.hodEmail}</td>
                                        <td>{department.hodPhoneNumber}</td>
                                    </tr>
                                )

                        }
                    </tbody>
                </table>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : {
                            isSuperAdmin ?
                                <strong>{course?.courseDepartments?.totalElements || 0}</strong>
                                :
                                <strong>{course?.courseDepartmentsForCollege?.totalElements || 0}</strong>
                        }

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
        </div>
    )
}

export default Department

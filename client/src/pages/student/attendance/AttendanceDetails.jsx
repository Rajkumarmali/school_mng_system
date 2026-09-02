import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getStudentAttendance } from '../../../state/student/Action';

const AttendanceDetails = () => {

    const dispatch = useDispatch();
    const student = useSelector((state) => state.student)

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1
    const size = Number(searchParams.get("size")) || 10;
    const studentSubjectId = searchParams.get("studentSubjectId")
    const pageNumber = Number(searchParams.get('pageNumber')) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const totalPages = student?.studentAttendances?.totalPages || 0;
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
            page,
            size,
            studentSubjectId,
            pageNumber: 1,
            pageSize,
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page,
            size,
            studentSubjectId,
            pageNumber: pageNumber - 1,
            pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page,
            size,
            studentSubjectId,
            pageNumber: pageNumber + 1,
            pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page,
            size,
            studentSubjectId,
            pageNumber,
            pageSize,
        })
    }

    useEffect(() => {
        dispatch(getStudentAttendance(studentSubjectId, pageNumber, pageSize))
    }, [dispatch, studentSubjectId, pageNumber, pageSize]);

    return (
        <div>
            <table className="table student-attendances-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student?.studentAttendances?.content?.length > 0 ?
                            student?.studentAttendances?.content?.map((attendance, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{attendance.date}</td>
                                    <td>{attendance.status}</td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="8" className="text-center">
                                    Not Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{student?.studentAttendances.totalElements || 0}</strong>
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

export default AttendanceDetails

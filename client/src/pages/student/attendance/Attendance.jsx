import React, { useEffect } from 'react'
import './Attendance.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentSubjects } from '../../../state/student/Action'
import AttendanceDetails from './AttendanceDetails'

const Attendance = () => {

    const dispatch = useDispatch()
    const student = useSelector((state) => state.student)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentSubjectId = searchParams.get("studentSubjectId")

    const totalPages = student?.studentSubjects?.subjectResponses?.totalPages || 0;
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
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        dispatch(getStudentSubjects(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className='student-attendance-container'>
            <div className="student-attendances-card">
                {
                    studentSubjectId ?
                        <div>
                            <AttendanceDetails />
                        </div>
                        :
                        <div>
                            <div>
                                <div className="stats-container">
                                    <div className="stat-card">
                                        <i className="bi bi-calendar-check-fill"></i>
                                        <h3>{student?.studentSubjects?.totalPresent + student?.studentSubjects?.totalAbsent}</h3>
                                        <span>Total Classes</span>
                                    </div>
                                    <div className="stat-card">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <h3>{student?.studentSubjects?.totalPresent}</h3>
                                        <span>Total Present</span>
                                    </div>
                                    <div className="stat-card">
                                        <i className="bi bi-x-circle-fill"></i>
                                        <h3>{student?.studentSubjects?.totalAbsent}</h3>
                                        <span>Total Absent</span>
                                    </div>
                                    <div className="stat-card">
                                        <h5>{((student?.studentSubjects?.totalPresent) / (student?.studentSubjects?.totalPresent + student?.studentSubjects?.totalAbsent) * 100).toFixed(2)}%</h5>
                                        <span>Attendance</span>
                                        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar bg-success" style={{ width: `${((student?.studentSubjects?.totalPresent) / (student?.studentSubjects?.totalPresent + student?.studentSubjects?.totalAbsent) * 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <table className="table student-attendances-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Subject Code</th>
                                            <th>Name</th>
                                            <th>Subject Type</th>
                                            <th>Attendance(P/A)</th>
                                            <th>Attendance(%)</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            student?.studentSubjects?.subjectResponses?.content?.length > 0 ?
                                                student?.studentSubjects?.subjectResponses?.content?.map((subject, index) =>
                                                    <tr>
                                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                        <td>{subject?.code}</td>
                                                        <td>{subject?.shortName}</td>
                                                        <td>{subject?.subjectType}</td>
                                                        <td>{subject?.totalPresent}P {subject?.totalAbsent}A</td>
                                                        <td>{(((subject?.totalPresent) / (subject?.totalPresent + subject?.totalAbsent)) * 100).toFixed(2)}%</td>
                                                        <td className='text-center'>
                                                            <button
                                                                className="btn btn-sm custom-reset-btn me-2"
                                                                onClick={() => setSearchParams({ page: pageNumber, size: pageSize, studentSubjectId: subject.studentSubjectId })}
                                                            >
                                                                <i class="bi bi-eye"></i>
                                                            </button>
                                                        </td>
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
                                        Total : <strong>{student?.studentSubjects?.subjectResponses?.totalElements || 0}</strong>
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
                }
            </div>

        </div>
    )
}

export default Attendance

import React, { useEffect } from 'react'
import './Attendance.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentSubjectBySectionIdAndStudentId } from '../../../../state/section/Action'

const Attendance = () => {

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const tab = searchParams.get("tab")
    const page = Number(searchParams.get('page')) || 1
    const size = Number(searchParams.get("size")) || 10;
    const studentId = searchParams.get("studentId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get('pageNumber')) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const totalPages = section?.studentSubjects?.subjectResponse?.totalPages || 0;
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
            sectionId,
            tab,
            page,
            size,
            studentId,
            action,
            pageNumber: 1,
            pageSize: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            studentId,
            action,
            pageNumber: pageNumber - 1,
            pageSize: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            studentId,
            action,
            pageNumber: pageNumber + 1,
            pageSize: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            studentId,
            action,
            pageNumber,
            pageSize
        })
    }

    useEffect(() => {
        dispatch(getStudentSubjectBySectionIdAndStudentId(sectionId, studentId, pageNumber, pageSize))
    }, [dispatch, sectionId, studentId, pageNumber, pageSize]);

    return (
        <div>
            <div>
                <div className="stats-container">
                    <div className="stat-card">
                        <i className="bi bi-calendar-check-fill"></i>
                        <h3>{section?.studentSubjects?.totalPresent + section?.studentSubjects?.totalAbsent}</h3>
                        <span>Total Classes</span>
                    </div>
                    <div className="stat-card">
                        <i className="bi bi-check-circle-fill"></i>
                        <h3>{section?.studentSubjects?.totalPresent}</h3>
                        <span>Total Present</span>
                    </div>
                    <div className="stat-card">
                        <i className="bi bi-x-circle-fill"></i>
                        <h3>{section?.studentSubjects?.totalAbsent}</h3>
                        <span>Total Absent</span>
                    </div>
                    <div className="stat-card">
                        <h5>{((section?.studentSubjects?.totalPresent) / (section?.studentSubjects?.totalPresent + section?.studentSubjects?.totalAbsent) * 100).toFixed(2)}%</h5>
                        <span>Attendance</span>
                        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-success" style={{ width: `${((section?.studentSubjects?.totalPresent) / (section?.studentSubjects?.totalPresent + section?.studentSubjects?.totalAbsent) * 100)}%` }}></div>
                        </div>
                    </div>
                </div>

                <table className="table attendances-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Subject Code</th>
                            <th>Name</th>
                            <th>Subject Type</th>
                            <th>Attendance(P/A)</th>
                            <th>Attendance(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            section?.studentSubjects?.subjectResponse?.content?.length > 0 ?
                                section?.studentSubjects?.subjectResponse?.content?.map((attendance, index) =>
                                    <tr>
                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                        <td>{attendance?.code}</td>
                                        <td>{attendance?.shortName}</td>
                                        <td>{attendance?.subjectType}</td>
                                        <td>{attendance?.totalPresent}P {" "} {attendance?.totalAbsent}A</td>
                                        <td>{(((attendance?.totalPresent) / (attendance?.totalPresent + attendance?.totalAbsent)) * 100).toFixed(2)}%</td>
                                    </tr>
                                )
                                :
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        Not Found
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{section?.studentSubjects?.subjectResponse?.totalElements || 0}</strong>
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

export default Attendance

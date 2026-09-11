import React, { useEffect } from 'react'
import "./Student.css"
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getStudentUniversityExamsByUniversityExamId } from '../../../state/universityExam/Action';
import StudentDetail from './StudentDetail';

const Student = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const studentExamId = searchParams.get("studentExamId")

    const totalPages = universityExam?.studentUniversityExamsByUniversityExamId?.totalPages || 0;
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
            universityExamId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        dispatch(getStudentUniversityExamsByUniversityExamId(universityExamId, pageNumber, pageSize))
    }, [dispatch, universityExamId, pageNumber, pageSize])

    return (
        <div>
            {
                studentExamId ?
                    <div>
                        <StudentDetail />
                    </div>
                    :
                    <div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <i className="bi bi-people-fill"></i>
                                <h3>100</h3>
                                <span>Total Students</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-person-check-fill"></i>
                                <h3>100</h3>
                                <span>Total Registered</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-person-exclamation"></i>
                                <h3>100</h3>
                                <span>Total Pending</span>
                            </div>
                        </div>
                        <table className="table universtiy-exam-student-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>EnorllmentNo.</th>
                                    <th>RollNo.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>PhoneNo.</th>
                                    <th>Form status</th>
                                    <th>Submitted Date</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    universityExam?.studentUniversityExamsByUniversityExamId?.content?.length > 0 ?
                                        universityExam?.studentUniversityExamsByUniversityExamId?.content?.map((student, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{student?.studentResponse?.enrollmentNumber}</td>
                                                <td>{student?.studentResponse?.rollNumber}</td>
                                                <td>{student?.studentResponse?.firstName} {student?.studentResponse?.lastName}</td>
                                                <td>{student?.studentResponse?.email}</td>
                                                <td>{student?.studentResponse?.phoneNumber}</td>
                                                <td>{student?.filledFrom ? "FILLED" : "PENDING"}</td>
                                                <td>{student?.submittedAt ? new Date(student?.submittedAt)?.toLocaleDateString("en-GB") : "-"}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => setSearchParams({ universityExamId, tab, page: pageNumber, size: pageSize, studentExamId: student.id })}
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No Exam Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{universityExam?.studentUniversityExamsByUniversityExamId?.totalElements || 0}</strong>
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
            }
        </div>
    )
}

export default Student

import React, { useEffect, } from 'react'
import './Result.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { generateUniversityExamResult, getUniversityExamResultOverview, updateUniversityExamShowResult } from '../../../state/universityExam/Action'
import StudentResultDetail from './StudentResultDetail'

const Result = () => {

    const dispatch = useDispatch()
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentUniversityExamId = searchParams.get("studentUniversityExamId")

    const totalPages = universityExam?.universityExamResultOverview?.studentUniversityExamResponse?.totalPages || 0;
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
            size: pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber + 1,
            size: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber,
            size: pageSize,
        })
    }

    const handleGenerateResult = async () => {
        await dispatch(generateUniversityExamResult(universityExamId))
        await dispatch(getUniversityExamResultOverview(universityExamId, pageNumber, pageSize))
    }

    const handleUpdadeUniversityExamResultStatus = async () => {
        await dispatch(updateUniversityExamShowResult(universityExamId))
        await dispatch(getUniversityExamResultOverview(universityExamId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getUniversityExamResultOverview(universityExamId, pageNumber, pageSize))
    }, [dispatch, universityExamId, pageNumber, pageSize]);

    return (
        <div>
            {
                studentUniversityExamId ?
                    <div>
                        <StudentResultDetail />
                    </div>
                    :
                    <div>
                        <div className="result-page-header">
                            <div>
                                <h2>Examination Results</h2>
                                <p>
                                    Manage and publish student examination results
                                </p>
                            </div>
                            <div className="result-header-actions">
                                {
                                    !universityExam?.universityExamResultOverview?.generatedResult &&
                                    <button
                                        className="generate-result-btn"
                                        onClick={handleGenerateResult}
                                    >
                                        Generate Result
                                    </button>
                                }
                                {

                                    <button
                                        className={`${universityExam?.universityExamResultOverview?.showResult ? 'hide-result-btn' : 'publish-result-btn'}`}
                                        onClick={handleUpdadeUniversityExamResultStatus}
                                    >
                                        <i className={`${universityExam?.universityExamResultOverview?.showResult ? "bi bi-eye-slash" : "bi-megaphone-fill"}`}></i>
                                        {
                                            universityExam?.universityExamResultOverview?.showResult
                                                ?
                                                "Hide Result"
                                                :
                                                "Announve Result"
                                        }
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="result-exam-card">
                            <div className="result-exam-icon">
                                <i className="bi bi-mortarboard-fill"></i>
                            </div>
                            <div className="result-exam-info">
                                <span>EXAMINATION</span>
                                <h3>
                                    {universityExam?.universityExamResultOverview?.name}
                                </h3>

                                <div className="result-exam-meta">
                                    <span>
                                        <i className="bi bi-book"></i>
                                        {universityExam?.universityExamResultOverview?.courseCode}
                                    </span>
                                    <span>
                                        <i className="bi bi-calendar"></i>
                                        Year {universityExam?.universityExamResultOverview?.year}
                                    </span>
                                    <span>
                                        <i className="bi bi-layers"></i>
                                        Semester {universityExam?.universityExamResultOverview?.semester}
                                    </span>
                                    <span>
                                        <i className="bi bi-calendar3"></i>
                                        {universityExam?.universityExamResultOverview?.academicYear}
                                    </span>
                                </div>
                            </div>
                            {
                                universityExam?.universityExamResultOverview?.showResult ?
                                    <div className="result-published-status">
                                        <span className="published-dot"></span>
                                        Results Announced
                                    </div>
                                    :
                                    <div className='result-not-published'>
                                        Result Not Announced
                                    </div>
                            }

                        </div>
                        <div className="result-statistics">
                            <div className="result-stat-card">
                                <div className="result-stat-icon total">
                                    <i className="bi bi-people"></i>
                                </div>
                                <div>
                                    <span>Total Students</span>
                                    <strong>{universityExam?.universityExamResultOverview?.totalStudents}</strong>
                                </div>
                            </div>
                            <div className="result-stat-card">
                                <div>
                                    <i className="bi bi-check-circle"></i>
                                </div>
                                <div>
                                    <span>Passed</span>
                                    <strong>{universityExam?.universityExamResultOverview?.totalPassedStudent}</strong>
                                </div>
                            </div>
                            <div className="result-stat-card">
                                <div>
                                    <i className="bi bi-x-circle"></i>
                                </div>
                                <div>
                                    <span>Failed</span>
                                    <strong>{universityExam?.universityExamResultOverview?.totalFailedStudent}</strong>
                                </div>
                            </div>
                            <div className="result-stat-card">
                                <div>
                                    <i className="bi bi-bar-chart"></i>
                                </div>
                                <div>
                                    <span>Pass Percentage</span>
                                    <strong>{(((universityExam?.universityExamResultOverview?.totalPassedStudent) / universityExam?.universityExamResultOverview?.totalStudents) * 100).toFixed(2)}%</strong>
                                </div>
                            </div>
                        </div>
                        <div className="result-list-card">
                            <div className="result-list-header">
                                <div>
                                    <h3>Student Results</h3>
                                    <p>
                                        View and manage subject-wise student results
                                    </p>
                                </div>
                                <div className="result-filters">
                                    <div className="result-search">
                                        <i className="bi bi-search"></i>
                                        <input
                                            type="text"
                                            placeholder="Search student..."
                                        />
                                    </div>
                                    <select>
                                        <option value="ALL">All Results</option>
                                        <option value="PASS">Passed</option>
                                        <option value="FAIL">Failed</option>
                                    </select>

                                </div>

                            </div>
                            <div className="result-table-wrapper">
                                <table className="result-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Student</th>
                                            <th>Enrollment Number</th>
                                            <th>Roll Number</th>
                                            <th>Subjects</th>
                                            <th>Marks</th>
                                            <th>Percentage</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            universityExam?.universityExamResultOverview?.studentUniversityExamResponse?.content?.length > 0 ?
                                                universityExam?.universityExamResultOverview?.studentUniversityExamResponse?.content?.map((item, index) =>
                                                    <tr key={item.id}>
                                                        <td> {(pageNumber - 1) * pageSize + index + 1}.</td>
                                                        <td> {item?.studentResponse?.firstName} {item?.studentResponse?.lastName}  </td>
                                                        <td>{item?.studentResponse?.enrollmentNumber}</td>
                                                        <td>{item?.studentResponse.rollNumber}</td>
                                                        <td>{item?.totalSubjects}</td>
                                                        <td>
                                                            {
                                                                item.totalObtainMarks ?
                                                                    item?.totalObtainMarks
                                                                    +
                                                                    "/"
                                                                    +
                                                                    item?.totalMarks
                                                                    :
                                                                    "-"
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.totalObtainMarks ?
                                                                    ((item.totalObtainMarks / item.totalMarks) * 100).toFixed(2) + '%'
                                                                    :
                                                                    "-"
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.resultStatus ?
                                                                    item.resultStatus
                                                                    :
                                                                    "-"
                                                            }
                                                        </td>
                                                        <td className='text-center'>
                                                            <div className="result-actions">
                                                                <button
                                                                    title="View Result"
                                                                    className="view-result-btn"
                                                                    onClick={() => setSearchParams({ universityExamId, tab, page: pageNumber, size: pageSize, studentUniversityExamId: item.id })}
                                                                >
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                                :
                                                <tr>
                                                    <td colSpan="10">
                                                        No student results found
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="pagination-container">
                                    <div className="pagination-info">
                                        Total : <strong>{universityExam?.universityExamResultOverview?.studentUniversityExamResponse?.totalElements || 0}</strong>
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
                    </div>
            }
        </div >
    )
}

export default Result


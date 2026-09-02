import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { generateExamResult, getExamById, getExamResultOverview, getStudentExamByExamId, updateExamToShowResult, updateStudentExamMarks, updateStudentExamStatus } from '../../../../../state/exam/Action'
import './Result.css'

const Result = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const sectionSubjectId = searchParams.get("classId")
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const examId = searchParams.get("examId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const [isEditMarks, setIsEditMarks] = useState(false)
    const [studentExamMarksData, setStudentExamMarksData] = useState([])

    const navigate = useNavigate();

    const totalPages = exam?.studentExams?.totalPages || 0;
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
            classId: sectionSubjectId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: 1,
            pageSize: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: pageNumber - 1,
            pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: pageNumber + 1,
            pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page: 1,
            size: size,
            examId,
            action,
            pageNumber,
            pageSize,
        })
    }

    const handleChangeStudentExamMarks = (studentExamId, marks) => {
        setStudentExamMarksData(pre =>
            pre.map(item =>
                item.id === studentExamId ? {
                    ...item,
                    obtainMarks: marks
                }
                    :
                    item
            )
        )
    }

    const handleUpdateStudentExamStatus = async (studentExamId, status) => {
        const payload = {
            id: studentExamId,
            status
        }
        await dispatch(updateStudentExamStatus(payload))
        await dispatch(getStudentExamByExamId(examId, pageNumber, pageSize))
    }

    const handelUpdateStudentExamMarks = async () => {
        await dispatch(updateStudentExamMarks(studentExamMarksData))
        await dispatch(getStudentExamByExamId(examId, pageNumber, pageSize))
        handleCancelEditMarks()
    }

    const handleCancelEditMarks = () => {
        setIsEditMarks(false);

        if (exam?.studentExams?.content) {
            setStudentExamMarksData(
                exam.studentExams.content.map(item => ({
                    id: item.id,
                    status: item.status,
                    obtainMarks: item.obtainMarks ?? 0
                }))
            );
        } else {
            setStudentExamMarksData([]);
        }
    };

    const handleUpdateExamToShowResult = async () => {
        await dispatch(updateExamToShowResult(examId))
        await dispatch(getExamById(examId))
    }

    const handleGenerateResult = async () => {
        await dispatch(generateExamResult(examId))
        await dispatch(getExamById(examId))
        await dispatch(getExamResultOverview(examId));
        await dispatch(getStudentExamByExamId(examId, pageNumber, pageSize))
    }

    const handleShowStudentExamresult = (studentExamId) => {
        navigate(`student-exam-result/${studentExamId}`)
    }

    useEffect(() => {
        if (exam?.studentExams?.content) {
            setStudentExamMarksData(prev => {
                const newData = exam.studentExams.content.map(item => {

                    const existing = prev.find(
                        oldItem => oldItem.id === item.id
                    )

                    return existing || {
                        id: item.id,
                        status: item.status,
                        obtainMarks: item.obtainMarks ?? 0
                    }
                })

                const currentPageIds = new Set(
                    newData.map(item => item.id)
                )

                const oldData = prev.filter(
                    item => !currentPageIds.has(item.id)
                )

                return [...oldData, ...newData]
            })
        }
    }, [exam?.studentExams?.content])

    useEffect(() => {
        dispatch(getExamResultOverview(examId))
    }, [dispatch, examId]);

    useEffect(() => {
        dispatch(getStudentExamByExamId(examId, pageNumber, pageSize))
    }, [dispatch, examId, pageNumber, pageSize])

    return (
        <div>
            <div>
                <div className="exam-result-header">
                    <div className="exam-result-header-left">
                        <div className="result-page-icon">
                            <i className="bi bi-bar-chart-fill"></i>
                        </div>
                        <div>
                            <h2>Result Management</h2>
                            <p>
                                View, manage and announce student examination results.
                            </p>
                        </div>
                    </div>
                    <div className="exam-result-header-actions">
                        {
                            exam?.exam?.status === "ONGOING" ?
                                <div>
                                    <span className="ongoing-status">
                                        <i className="bi bi-record-circle-fill me-1"></i>
                                        {exam?.exam?.status}
                                    </span>
                                </div>
                                :
                                <>
                                    <div
                                        className={`result-publish-status ${exam?.exam?.showResult ?
                                            "published"
                                            :
                                            "not-published"
                                            }`}
                                    >
                                        <i className={`bi ${false ? "bi-broadcast-pin" : "bi-lock-fill"}`}
                                        ></i>
                                        {
                                            exam?.exam?.showResult ?
                                                "Result Announced"
                                                :
                                                "Result Not Announced"
                                        }
                                    </div>
                                    <div>
                                        <div className='result-action-buttons'>
                                            <button
                                                type="button"
                                                className={exam?.exam?.showResult ? "result-hide-btn" : "result-publish-btn"}
                                                onClick={handleUpdateExamToShowResult}
                                            >
                                                <i
                                                    className={`bi ${exam?.exam?.showResult ? "bi-eye-slash-fill" : "bi-megaphone-fill"} me-2`}></i>
                                                {
                                                    exam?.exam?.showResult ?
                                                        "Hide Result"
                                                        :
                                                        "Announce Result"}
                                            </button>
                                            {
                                                (exam?.exam?.mode === "ONLINE" && !exam?.exam?.generatedResult) &&
                                                <button
                                                    className="generate-result-btn"
                                                    onClick={handleGenerateResult}
                                                >
                                                    Generate Result
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className="result-stats-container">
                    <div className="result-stat-card total">
                        <div className="result-stat-icon">
                            <i className="bi bi-people-fill"></i>
                        </div>
                        <div>
                            <h3>{exam?.examResultOverview?.totalStudent}</h3>
                            <span>Total Students</span>
                        </div>
                    </div>
                    <div className="result-stat-card appeared">
                        <div className="result-stat-icon">
                            <i className="bi bi-person-check-fill"></i>
                        </div>
                        <div>
                            <h3>{exam?.examResultOverview?.totalAppearedStudent}</h3>
                            <span>Appeared</span>
                        </div>
                    </div>
                    <div className="result-stat-card passed">
                        <div className="result-stat-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div>
                            <h3>{exam?.examResultOverview?.totalPassedStudent}</h3>
                            <span>Passed</span>
                        </div>
                    </div>
                    <div className="result-stat-card failed">
                        <div className="result-stat-icon">
                            <i className="bi bi-x-circle-fill"></i>
                        </div>
                        <div>
                            <h3>{exam?.examResultOverview?.totalFiledStudent}</h3>
                            <span>Failed</span>
                        </div>
                    </div>
                    <div className="result-stat-card average">
                        <div className="result-stat-icon">
                            <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <div>
                            <h3>{(exam?.examResultOverview?.avgMarks)?.toFixed(2)}</h3>
                            <span>Average Marks</span>
                        </div>
                    </div>
                </div>
                <div className="top-performer-card">
                    <div className="section-heading">
                        <div>
                            <h3>
                                <i className="bi bi-trophy-fill me-2"></i>
                                Top Performers
                            </h3>
                            <p>Highest scoring students in this examination.</p>
                        </div>
                    </div>
                    <div className="top-performer-list">
                        {
                            exam?.examResultOverview?.topPerformanceStudents?.map((student, index) => {
                                return (
                                    <div
                                        className={`top-performer-item rank-${index + 1}`}
                                        key={student.id}
                                    >
                                        <div className="performer-rank">
                                            {index === 0 && "🥇"}
                                            {index === 1 && "🥈"}
                                            {index === 2 && "🥉"}
                                        </div>
                                        <div className="performer-avatar">
                                            {student?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="performer-details">
                                            <strong>
                                                Name: {student?.name}
                                            </strong>

                                            <span>
                                                Roll No. {student?.rollNumber}
                                            </span>
                                        </div>
                                        <div className="performer-marks">
                                            <strong>
                                                {(student?.obtainMarks)?.toFixed(2)}/{exam?.exam?.maxMarks}
                                            </strong>

                                            <span>{(((student?.obtainMarks) / (exam?.exam?.maxMarks) * 100)).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className="exam-student-container" style={{ fontSize: "15px" }}>
                    <table className="table section-exam-student-table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>RollNo.</th>
                                <th>RegistrationNo.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>
                                    ObtainMarks
                                    {
                                        exam?.exam?.mode === "OFFLINE" &&
                                        <>
                                            {
                                                !isEditMarks ?
                                                    <button
                                                        type="button"
                                                        className="exam-edit-btn"
                                                        onClick={() => setIsEditMarks(true)}
                                                    >
                                                        <i className="bi bi-pencil-square me-1"></i>
                                                    </button>
                                                    :
                                                    <>
                                                        <button
                                                            className="exam-edit-btn"
                                                            onClick={handelUpdateStudentExamMarks}
                                                        >
                                                            <i className="bi bi-check-lg"></i>
                                                        </button>
                                                        <button
                                                            className="exam-edit-btn"
                                                            onClick={handleCancelEditMarks}
                                                        >
                                                            <i class="bi bi-x"></i>
                                                        </button>
                                                    </>
                                            }
                                        </>
                                    }
                                </th>
                                <th>Result</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exam?.studentExams?.content?.length > 0 ?
                                    exam?.studentExams?.content?.map((stuExam, index) =>
                                        <tr>
                                            <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                            <td>{stuExam?.studentResponse?.rollNumber}</td>
                                            <td>{stuExam?.studentResponse?.registrationNumber}</td>
                                            <td>{stuExam?.studentResponse?.firstName} {stuExam?.studentResponse?.lastName}</td>
                                            <td>{stuExam?.studentResponse?.email}</td>
                                            <td>
                                                <button
                                                    className={`btn btn-sm custom-reset-btn me-2 ${stuExam?.status === "PRESENT"
                                                        ? "attendance-present"
                                                        : ""
                                                        }`}
                                                    disabled={stuExam?.status === "PRESENT"}
                                                    onClick={() => handleUpdateStudentExamStatus(stuExam.id, "PRESENT")}
                                                >
                                                    <i className="bi bi-check-lg me-1"></i>
                                                    P
                                                </button>

                                                <button
                                                    className={`btn btn-sm custom-reset-btn me-2 ${stuExam?.status === "ABSENT"
                                                        ? "attendance-absent"
                                                        : ""
                                                        }`}
                                                    disabled={stuExam?.status === "ABSENT"}
                                                    onClick={() => handleUpdateStudentExamStatus(stuExam.id, "ABSENT")}
                                                >
                                                    <i className="bi bi-x-lg me-1"></i>
                                                    A
                                                </button>
                                            </td>
                                            <td>
                                                {
                                                    isEditMarks ?
                                                        <input
                                                            type="number"
                                                            value={
                                                                studentExamMarksData.find(item => item.id === stuExam.id)?.obtainMarks ?? 0
                                                            }
                                                            onChange={(e) => handleChangeStudentExamMarks(stuExam.id, e.target.value)}
                                                        />
                                                        :
                                                        stuExam?.obtainMarks ? (stuExam?.obtainMarks).toFixed(2) : "-"
                                                }
                                            </td>
                                            <td>
                                                {
                                                    stuExam?.status === "ABSENT" ?
                                                        "Absent"
                                                        :
                                                        stuExam?.obtainMarks ?
                                                            stuExam?.obtainMarks >= exam?.exam?.passingMarks ?
                                                                "Pass"
                                                                :
                                                                "Fail"
                                                            :
                                                            "-"
                                                }
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-sm custom-action-btn me-2"
                                                    onClick={() => handleShowStudentExamresult(stuExam?.id)}
                                                >
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            Not Found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Total : <strong>{exam?.studentExams?.totalElements || 0}</strong>
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


    )
}

export default Result

import React, { useEffect } from 'react'
import './Exam.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentExamByUserId, getStudentExamOverview } from '../../../state/exam/Action'
import ExamDetails from './ExamDetails'
import OnGoingExam from './OnGoingExam'

const Exam = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentExamId = searchParams.get("studentExamId")

    const totalPages = exam?.userStudentExams?.totalPages || 0;
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
            size: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }


    useEffect(() => {
        dispatch(getStudentExamByUserId(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])

    useEffect(() => {
        dispatch(getStudentExamOverview())
    }, [dispatch])

    // console.log(exam)

    return (
        <div className='student-exam-container'>
            <nav class="student-exam-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "ongoing" })}
                        >
                            Ongoing Exam
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="student-exam-card">
                {
                    tab === "ongoing" ?
                        <div>
                            <OnGoingExam />
                        </div>
                        :
                        <div>
                            {
                                studentExamId ?
                                    <div>
                                        <ExamDetails />
                                    </div>
                                    :
                                    <div>
                                        <div className="stats-container">
                                            <div className="stat-card">
                                                <i className="bi bi-journal-text"></i>
                                                <h3>{exam?.userStudentExamOverview?.totalExam}</h3>
                                                <span>Total Exams</span>
                                            </div>
                                            <div className="stat-card">
                                                <i className="bi bi-play-circle-fill"></i>
                                                <h3>{exam?.userStudentExamOverview?.onGoingExam}</h3>
                                                <span>OnGoing Exams</span>
                                            </div>
                                            <div className="stat-card">
                                                <i className="bi bi-calendar-event-fill"></i>
                                                <h3>{exam?.userStudentExamOverview?.upcomingExam}</h3>
                                                <span>Upcoming Exams</span>
                                            </div>
                                            <div className="stat-card">
                                                <h5>{(exam?.userStudentExamOverview?.avgMarks)?.toFixed(2)}%</h5>
                                                <span>Avg. Marks</span>
                                                <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar bg-success" style={{ width: `${exam?.userStudentExamOverview?.avgMarks}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table student-exam-table">
                                            <thead>
                                                <tr>
                                                    <th>S No.</th>
                                                    <th>Name</th>
                                                    <th>SubjectCode</th>
                                                    <th>Subject</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>MaxMarks</th>
                                                    <th>ObtainMarks</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    exam?.userStudentExams?.content?.length > 0 ?
                                                        exam?.userStudentExams?.content?.map((exam, index) =>
                                                            <tr>
                                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                                <td>{exam.examResponse.name}</td>
                                                                <td>{exam.examResponse.subjectResponse.code}</td>
                                                                <td>{exam.examResponse.subjectResponse.shortName}</td>
                                                                <td>
                                                                    {exam?.examResponse?.date
                                                                        ? new Date(exam.examResponse.date)
                                                                            .toLocaleDateString("en-GB")
                                                                        : "-"}
                                                                </td>
                                                                <td>{exam.examResponse.status}</td>
                                                                <td>{exam.examResponse.maxMarks}</td>
                                                                <td>
                                                                    {
                                                                        exam.status === "ABSENT" ?
                                                                            "ABSENT"
                                                                            :
                                                                            (exam?.obtainMarks)?.toFixed(2)
                                                                    }

                                                                </td>
                                                                <td className='text-center'>
                                                                    <button
                                                                        onClick={() => setSearchParams({ page: pageNumber, size: pageSize, studentExamId: exam.id })}
                                                                        className="btn btn-sm custom-action-btn me-2">
                                                                        <i class="bi bi-eye"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan="9" className="text-center">
                                                                No Exam Found
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                        <div className="pagination-container">
                                            <div className="pagination-info">
                                                Total : <strong>{exam?.userStudentExams?.totalElements || 0}</strong>
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
                }
            </div>
        </div>
    )
}

export default Exam

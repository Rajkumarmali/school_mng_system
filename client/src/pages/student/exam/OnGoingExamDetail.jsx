import React from 'react'
import './OnGoingExamDetail.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentExamById } from '../../../state/exam/Action'

const OnGoingExamDetail = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentExamId = searchParams.get("studentExamId")



    const handleBack = () => {
        setSearchParams({ tab, page: pageNumber, size: pageSize })
    }

    const handleContinueExam = () => {
        if (exam?.userStudentExam?.examResponse?.mode === "OFFLINE") {
            return alert("This exam is conducted offline. Please attend the exam in the classroom.")
        }
        const url = `exam/ongoing-exam-question/${studentExamId}`
        window.open(url, "_blank", "noopener,noreferrer");
    }

    useEffect(() => {
        dispatch(getStudentExamById(studentExamId))
    }, [dispatch, studentExamId])

    return (
        <div className="ongoing-exam-page">
            <div className="ongoing-exam-header">
                <div>
                    <h2>
                        <i className="bi bi-play-circle-fill me-2"></i>
                        Ongoing Exam
                    </h2>
                    <p>
                        Complete your examination before the time ends.
                    </p>
                </div>
                <div className="ongoing-exam-header-actions">
                    <span className="ongoing-status">
                        <i className="bi bi-record-circle-fill me-1"></i>
                        {exam?.userStudentExam?.examResponse?.status}
                    </span>
                    <button
                        type="button"
                        className="ongoing-exam-back-btn"
                        onClick={handleBack}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                    </button>
                </div>
            </div>
            <div className="ongoing-exam-card">
                <div className="ongoing-exam-title">
                    <div className="exam-icon">
                        <i className="bi bi-file-earmark-text-fill"></i>
                    </div>

                    <div>
                        <h3>{exam?.userStudentExam?.examResponse?.name}</h3>
                        <p>
                            {exam?.userStudentExam?.examResponse?.subjectResponse?.name} ({exam?.userStudentExam?.examResponse?.subjectResponse?.code})
                        </p>
                    </div>
                </div>

                <hr />
                <div className="ongoing-exam-info-grid">
                    <div className="ongoing-info-item">
                        <i className="bi bi-book-fill"></i>
                        <div>
                            <span>Subject</span>
                            <strong>{exam?.userStudentExam?.examResponse?.subjectResponse?.name}</strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-calendar-event-fill"></i>
                        <div>
                            <span>Date</span>
                            <strong>
                                {
                                    exam?.userStudentExam?.examResponse?.date ? new Date(exam?.userStudentExam?.examResponse?.date).toLocaleDateString("en-GB") : "-"
                                }
                            </strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-clock-fill"></i>
                        <div>
                            <span>Start Time</span>
                            <strong>
                                {
                                    exam?.userStudentExam?.examResponse?.startTime
                                        ? new Date(exam?.userStudentExam?.examResponse?.startTime).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        }).toUpperCase()
                                        : "-"
                                }
                            </strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-clock-history"></i>
                        <div>
                            <span>End Time</span>
                            <strong>{
                                exam?.userStudentExam?.examResponse?.endTime
                                    ? new Date(exam?.userStudentExam?.examResponse?.endTime).toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    }).toUpperCase()
                                    : "-"
                            }</strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-question-circle-fill"></i>
                        <div>
                            <span>Total Questions</span>
                            <strong>{exam?.userStudentExam?.examResponse?.totalQuestion}</strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-award-fill"></i>
                        <div>
                            <span>Maximum Marks</span>
                            <strong>{exam?.userStudentExam?.examResponse?.maxMarks}</strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-check-circle-fill"></i>
                        <div>
                            <span>Passing Marks</span>
                            <strong>{exam?.userStudentExam?.examResponse?.passingMarks}</strong>
                        </div>
                    </div>

                    <div className="ongoing-info-item">
                        <i className="bi bi-laptop-fill"></i>
                        <div>
                            <span>Mode</span>
                            <strong>{exam?.userStudentExam?.examResponse?.mode}</strong>
                        </div>
                    </div>

                </div>
                <div className="ongoing-exam-notice">
                    <i className="bi bi-info-circle-fill"></i>
                    <div>
                        <strong>Exam Instructions</strong>
                        <p>
                            Please make sure you have a stable internet connection.
                            Do not refresh or close the page while attempting the exam.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="ongoing-exam-action">

                    <div className="exam-time-info">
                        <i className="bi bi-hourglass-split"></i>

                        <div>
                            <span>Exam Status</span>
                            <strong>Exam is currently ongoing</strong>
                        </div>
                    </div>
                    {
                        exam?.userStudentExam?.status === "PRESENT" ?
                            <div className="exam-submitted-status">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Exam Submitted
                            </div>
                            :
                            <button
                                className="start-exam-btn"
                                onClick={handleContinueExam}

                            >
                                <i className="bi bi-play-fill me-2"></i>
                                Continue Exam
                            </button>
                    }
                </div>

            </div>
        </div>
    )
}

export default OnGoingExamDetail


// const handleFullScreen = async () => {
//         try {
//             await document.documentElement.requestFullscreen();
//         } catch (error) {
//             console.error("Fullscreen error:", error);
//         }
//     };
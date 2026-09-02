import React, { useEffect } from 'react'
import './ExamDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentExamById } from '../../../state/exam/Action';
import QuestionPaper from './QuestionPaper';

const ExamDetails = () => {

    const dispatch = useDispatch();
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentExamId = searchParams.get("studentExamId")
    const action = searchParams.get("action")

    const handleBack = () => {
        setSearchParams({ page: pageNumber, size: pageSize })
    }

    useEffect(() => {
        dispatch(getStudentExamById(studentExamId))
    }, [dispatch, studentExamId])

    return (
        <div>
            <div className="student-exam-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="back-student-exam-detail-btn"
                        onClick={() => setSearchParams({ page: pageNumber, size: pageSize, studentExamId, action: "overview" })}
                    >
                        Overview
                    </button>
                    <button
                        className="back-student-exam-detail-btn"
                        onClick={() => setSearchParams({ page: pageNumber, size: pageSize, studentExamId, action: "questionPaper" })}
                    >
                        Question Paper
                    </button>
                </div>
                <button
                    className="back-student-exam-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div>
                {
                    action === "questionPaper" ?
                        <div>
                            <QuestionPaper />
                        </div>
                        :
                        <div>
                            <div className="section-exam-detail-card">
                                <div className="section-student-detail-info">
                                    <div className="section-student-detail-contact">
                                        <div>
                                            <i className="bi bi-bar-chart-fill me-2"></i>
                                            <span>
                                                <strong>Marks Details  :</strong>
                                            </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clipboard-data-fill me-2"></i>
                                            <span>MaxMarks : {exam?.userStudentExam?.examResponse?.maxMarks}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>PassingMarks : {exam?.userStudentExam?.examResponse?.passingMarks}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-award-fill me-2"></i>
                                            <span>ObtainMarks :
                                                {
                                                    exam?.userStudentExam?.status === "ABSENT" ?
                                                        "ABSENT"
                                                        :
                                                        (exam?.userStudentExam?.obtainMarks)?.toFixed(2)
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="student-exam-detail-info">
                                    <div className="student-exam-detail-contact">
                                        <div>
                                            <i className="bi bi-percent me-2"></i>
                                            <span>Percentage : {((exam?.userStudentExam?.obtainMarks / exam?.userStudentExam?.examResponse?.maxMarks) * 100).toFixed(2)}%</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-award-fill me-2"></i>
                                            <span>Grade : </span>
                                        </div>

                                        <div>
                                            <i className="bi bi-check2-circle me-2"></i>
                                            <span>Result :
                                                {
                                                    exam?.userStudentExam?.obtainMarks ?
                                                        exam?.userStudentExam?.obtainMarks >= exam?.userStudentExam?.examResponse?.passingMarks ?
                                                            "PASS"
                                                            :
                                                            "FAIL"
                                                        :
                                                        "-"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="student-exam-detail-card">
                                <div className="student-exam-detail-info">
                                    <div className="student-exam-detail-contact">
                                        <div>
                                            <i className="bi bi-journal-text me-2"></i>
                                            <span>
                                                <strong>Exam Details  :</strong>
                                            </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            <span>Name : {exam?.userStudentExam?.examResponse?.name}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-calendar-event-fill me-2"></i>
                                            <span>Date : {exam?.userStudentExam?.examResponse?.date
                                                ? new Date(exam?.userStudentExam?.examResponse?.date).toLocaleDateString("en-GB")
                                                : "-"}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-laptop-fill me-2"></i>
                                            <span>Mode : {exam?.userStudentExam?.examResponse?.mode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="student-exam-detail-info">
                                    <div className="student-exam-detail-contact">
                                        <div>
                                            <i className="bi bi-info-circle-fill me-2"></i>
                                            <span>Status : {exam?.userStudentExam?.examResponse?.status}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clock-fill me-2"></i>
                                            <span>StartTime :
                                                {exam?.userStudentExam?.examResponse?.startTime
                                                    ? new Date(exam?.userStudentExam?.examResponse?.startTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    }).toUpperCase()
                                                    : "-"}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clock-history me-2"></i>
                                            <span>EndTime :
                                                {exam?.userStudentExam?.examResponse?.endTime
                                                    ? new Date(exam?.userStudentExam?.examResponse?.endTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    }).toUpperCase()
                                                    : "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-exam-detail-card">
                                <div className="section-student-detail-info">
                                    <div className="section-student-detail-contact">
                                        <div>
                                            <i className="bi bi-journal-bookmark-fill me-2"></i>
                                            <span>
                                                <strong>Subject Details  :</strong>
                                            </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-upc-scan me-2"></i>
                                            <span>Code : {exam?.userStudentExam?.examResponse?.subjectResponse?.code}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-book-fill me-2"></i>
                                            <span>Name : {exam?.userStudentExam?.examResponse?.subjectResponse?.name} ({exam?.userStudentExam?.examResponse?.subjectResponse?.shortName})</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-bookmark-fill me-2"></i>
                                            <span>Subject Type : {exam?.userStudentExam?.examResponse?.subjectResponse?.subjectType}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-award-fill me-2"></i>
                                            <span>Credit : {exam?.userStudentExam?.examResponse?.subjectResponse?.credit}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}

export default ExamDetails

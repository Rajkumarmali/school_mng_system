import React, { useEffect } from 'react'
import './SubmitExam.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSubmitStudentExamDetails } from '../../../state/exam/Action'

const SubmitExam = () => {

    const { studentExamId } = useParams()

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const submitDetail = exam?.submitStudentExamDetail

    useEffect(() => {
        dispatch(getSubmitStudentExamDetails(studentExamId))
    }, [dispatch, studentExamId])

    const totalQuestions = submitDetail?.totalQuestions || 0
    const answeredQuestions = submitDetail?.answeredQuestions || 0
    const markedForReview = submitDetail?.markedForReviewQuestions || 0

    const remainingQuestions =
        Math.max(totalQuestions - answeredQuestions, 0)

    return (
        <div className="submit-exam-container">

            <div className="submit-exam-card">
                <div className="submit-exam-icon">
                    <i className="bi bi-check-lg"></i>
                </div>
                <div className="submit-exam-header">
                    <h2>Exam Submitted Successfully!</h2>
                    <p>
                        Your exam has been submitted successfully.
                    </p>
                </div>
                <div className="submit-exam-summary">
                    <div className="submit-exam-body">
                        <div className="submit-exam-label">
                            <i className="bi bi-question-circle-fill"></i>
                            <label>Total Questions</label>
                        </div>
                        <span>{totalQuestions}</span>
                    </div>
                    <div className="submit-exam-body">
                        <div className="submit-exam-label">
                            <i className="bi bi-check-circle-fill"></i>
                            <label>Total Answered</label>
                        </div>
                        <span>{answeredQuestions}</span>
                    </div>
                    <div className="submit-exam-body">
                        <div className="submit-exam-label">
                            <i className="bi bi-bookmark-star-fill"></i>
                            <label>Marked for Review</label>
                        </div>
                        <span>{markedForReview}</span>
                    </div>
                    <div className="submit-exam-body">
                        <div className="submit-exam-label">
                            <i className="bi bi-hourglass-split"></i>
                            <label>Remaining Questions</label>
                        </div>
                        <span>{remainingQuestions}</span>
                    </div>
                </div>
                <div className="submit-exam-message">
                    <i className="bi bi-info-circle-fill"></i>
                    <span>
                        Your answers have been recorded successfully.
                    </span>
                </div>
                <button className='exit-btn w-100'
                    onClick={() => window.close()}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Exit Exam
                </button>
            </div>
        </div>
    )
}

export default SubmitExam
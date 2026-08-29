import React, { useState, useEffect, useCallback } from 'react';
import './OnGoingExamQuestion.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearStudentAnswer, getStudentExamById, getStudentExamQuestions, saveStudentAnswer, submitStudentExam, updateQuestionReview } from '../../../state/exam/Action';
import { useNavigate, useParams } from 'react-router-dom';


const OnGoingExamQuestion = () => {

    const { studentExamId } = useParams()

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [isExamStarted, setIsExamStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    const navigate = useNavigate()

    const currentQuestion = exam?.studentExamQuestions?.[currentQuestionIndex];

    const getDuration = (startTime, endTime) => {
        if (!startTime || !endTime) return "-";

        const start = new Date(startTime);
        const end = new Date(endTime);

        const diffMs = end - start;
        const totalMinutes = Math.floor(diffMs / (1000 * 60));

        return totalMinutes;
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleStartExam = async () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => { });
        }
        setIsExamStarted(true);
        setTimeLeft(getDuration(exam?.userStudentExam?.examResponse?.startTime, exam?.userStudentExam?.examResponse?.endTime) * 60)
    };

    const handleSaveStudentAnswer = async (questionId, optionId) => {
        const studentAnswerData = {
            questionId: questionId,
            selectedOptionId: optionId,
            studentExamId: studentExamId
        }
        await dispatch(saveStudentAnswer(studentAnswerData))
        await dispatch(getStudentExamQuestions(studentExamId))
    }

    const handleUpdateQuestionReview = async () => {
        await dispatch(updateQuestionReview(studentExamId, currentQuestion.id))
        await dispatch(getStudentExamQuestions(studentExamId))
    }

    const handleClearStudentAnswer = async () => {
        await dispatch(clearStudentAnswer(studentExamId, currentQuestion.id))
        await dispatch(getStudentExamQuestions(studentExamId))
    }

    const handleSubmitExam = useCallback(async () => {
        if (document.fullscreenElement) {
            try {
                document.exitFullscreen()
            } catch (err) {
                console.log(err)
            }
        }
        await dispatch(submitStudentExam(studentExamId))
        navigate(`/student/exam/submit/${studentExamId}`)
    }, [navigate, studentExamId, dispatch])

    useEffect(() => {
        if (!isExamStarted) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isExamStarted]);

    useEffect(() => {
        (timeLeft === 0 && isExamStarted) &&
            handleSubmitExam()
    }, [timeLeft, isExamStarted, handleSubmitExam])

    useEffect(() => {
        dispatch(getStudentExamById(studentExamId))
    }, [dispatch, studentExamId])

    useEffect(() => {
        isExamStarted &&
            dispatch(getStudentExamQuestions(studentExamId))
    }, [dispatch, isExamStarted, studentExamId]);


    return (
        <div className="exam-fullscreen-container">
            {
                !isExamStarted ?
                    <>
                        <div className="exam-start-container">

                            <div className="exam-start-card">
                                <div className="start-header">
                                    <i className="bi bi-journal-text start-icon"></i>
                                    <h2>{exam?.userStudentExam?.examResponse?.subjectResponse?.name}</h2>
                                    <span className="exam-code-tag">Subject Code: {exam?.userStudentExam?.examResponse?.subjectResponse?.code} | {exam?.userStudentExam?.examResponse?.subjectResponse?.subjectType}</span>
                                </div>
                                <hr className="divider" />
                                <div className="exam-details-grid">
                                    <div className="detail-item">
                                        <i className="bi bi-clock"></i>
                                        <div>
                                            <span>Duration</span>
                                            <strong>
                                                {
                                                    Math.floor(getDuration(
                                                        exam?.userStudentExam?.examResponse?.startTime,
                                                        exam?.userStudentExam?.examResponse?.endTime
                                                    ) / 60)
                                                } Hours
                                                (
                                                {
                                                    getDuration(
                                                        exam?.userStudentExam?.examResponse?.startTime,
                                                        exam?.userStudentExam?.examResponse?.endTime
                                                    )
                                                } mins
                                                )
                                            </strong>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <i className="bi bi-card-checklist"></i>
                                        <div>
                                            <span>Total Questions</span>
                                            <strong>{exam?.userStudentExam?.examResponse?.totalQuestion} Questions</strong>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <i className="bi bi-award"></i>
                                        <div>
                                            <span>Total Marks</span>
                                            <strong>{exam?.userStudentExam?.examResponse?.maxMarks} Marks</strong>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <i className="bi bi-check-circle"></i>
                                        <div>
                                            <span>Passing Marks</span>
                                            <strong>{exam?.userStudentExam?.examResponse?.passingMarks} Marks</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="instructions-box">
                                    <h4>Instructions before starting:</h4>
                                    <ul>
                                        <li>Ensure you have a stable internet connection.</li>
                                        <li>Do not refresh or close the browser tab during the test.</li>
                                        <li>Clicking "Start Exam" will switch your browser to full-screen mode.</li>
                                        <li>You can navigate between questions using the sidebar palette.</li>
                                    </ul>
                                </div>
                                <button type="button" className="btn-start-exam"
                                    onClick={handleStartExam}
                                >
                                    <i className="bi bi-play-circle-fill me-2"></i>
                                    Start Exam Now
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <header className="exam-top-header">
                            <div className="exam-branding">
                                <h2>{exam?.userStudentExam?.examResponse?.subjectResponse?.name}</h2>
                                <span className="exam-code">{exam?.userStudentExam?.examResponse?.subjectResponse?.code} | {exam?.userStudentExam?.examResponse?.subjectResponse?.subjectType}</span>
                            </div>
                            <div className="exam-timer-wrapper">
                                <i className="bi bi-clock-history me-2"></i>
                                <span>Time Remaining: </span>
                                <strong className="timer-text">{formatTime(timeLeft)}</strong>
                            </div>
                        </header>

                        <div className="exam-body-content">
                            <main className="exam-main-panel">
                                <div className="question-header">
                                    <h3>
                                        Question {currentQuestionIndex + 1} of {exam?.studentExamQuestions?.length}
                                    </h3>
                                    <span className={`badge-type ${currentQuestion?.type?.toLowerCase() || ""}`}>
                                        {currentQuestion?.type === 'MCQ' ? 'Single Choice (MCQ)' : 'Multiple Choice (MSQ)'}
                                    </span>
                                </div>

                                <div className="question-text">
                                    <p>{currentQuestion?.question}</p>
                                </div>
                                <div className="options-list">
                                    {
                                        currentQuestion?.examQuestionOptionResponses?.map((option, index) => {
                                            const type = currentQuestion?.type
                                            const isMSQ = type === "MSQ"
                                            const answers = currentQuestion?.studentExamAnswerResponses || [];
                                            const isSelected = answers.some(answer => answer?.selectedOptionId === option?.id);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`option-card ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => handleSaveStudentAnswer(currentQuestion.id, option.id)}
                                                >
                                                    <input
                                                        type={isMSQ ? 'checkbox' : 'radio'}
                                                        checked={isSelected}
                                                    />

                                                    <span className="option-content">{option?.optionText}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="question-footer-actions">
                                    <div className="left-actions">
                                        <button
                                            type="button"
                                            className="btn-action"
                                            onClick={handleUpdateQuestionReview}
                                        >
                                            {currentQuestion?.studentExamAnswerResponses?.[0]?.isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}
                                        </button>
                                        <button type="button" className="btn-action"
                                            onClick={handleClearStudentAnswer}
                                        >
                                            Clear Response
                                        </button>
                                    </div>
                                    <div className="right-actions">
                                        <button
                                            type="button"
                                            className="btn-action"
                                            disabled={currentQuestionIndex === 0}
                                            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-action "
                                            disabled={currentQuestionIndex === exam?.studentExamQuestions.length - 1}
                                            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </main>

                            <aside className="exam-sidebar-panel">
                                <h4>Question Palette</h4>
                                <div className="status-legend">
                                    <div className="legend-item"><span className="legend-box status-answered"></span> Answered</div>
                                    <div className="legend-item"><span className="legend-box status-unanswered"></span> Not Answered</div>
                                    <div className="legend-item"><span className="legend-box status-review"></span> Marked for Review</div>
                                </div>
                                <div className="palette-grid">
                                    {
                                        exam?.studentExamQuestions?.map((_, idx) => {
                                            const isAnswered = exam?.studentExamQuestions?.[idx]?.studentExamAnswerResponses?.[0]?.isAnswered
                                            const isMarksReview = exam?.studentExamQuestions?.[idx]?.studentExamAnswerResponses?.[0]?.isMarkedForReview
                                            return (
                                                <button
                                                    key={idx}
                                                    className={
                                                        `palette-btn  ${currentQuestionIndex === idx ? 'active-question' : isMarksReview ? 'status-review' : isAnswered ? 'status-answered ' : ''}`
                                                    }
                                                    onClick={() => setCurrentQuestionIndex(idx)}
                                                >
                                                    {idx + 1}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <div className="sidebar-submit-wrapper">
                                    <button type="button"
                                        className="btn-submit-exam"
                                        data-bs-toggle="modal"
                                        data-bs-target="#submitExamModal"
                                    >
                                        Submit Exam
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </>
            }

            <div class="modal fade" id="submitExamModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel"> Submit Exam</h1>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <strong>Are you sure you want to submit?</strong>
                                <p>
                                    Once you submit the exam, you will not be able to
                                    change or update your answers.
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Continue Exam
                            </button>
                            <button
                                onClick={handleSubmitExam}
                                type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                <i className="bi bi-check2-circle me-2"></i>
                                Submit Exam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnGoingExamQuestion;
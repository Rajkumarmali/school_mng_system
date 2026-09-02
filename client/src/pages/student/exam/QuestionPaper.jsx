import React, { useEffect } from 'react'
import './QuestionPaper.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentExamResult } from '../../../state/exam/Action';

const QuestionPaper = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"))
    const size = Number(searchParams.get("size"))
    const studentExamId = searchParams.get("studentExamId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const totalPages = exam?.studentExamResult?.examQuestionResponses?.totalPages || 0;
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
            page,
            size,
            studentExamId,
            action,
            pageNumber: 1,
            pageSize: pageSize,
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page,
            size,
            studentExamId,
            action,
            pageNumber: pageNumber - 1,
            pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page,
            size,
            studentExamId,
            action,
            pageNumber: pageNumber + 1,
            pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page,
            size,
            studentExamId,
            action,
            pageNumber: pageNumber,
            pageSize,
        })
    }

    const handleCheckIsCorrectOrNot = (question) => {
        const totalCorrectOptions = question?.examQuestionOptionResponses?.filter(option =>
            option.isTrue).length || 0

        const totalCorrectSelectedOptions = question?.studentExamAnswerResponses?.selectedOptions?.filter(option =>
            option.isCorrect).length || 0

        const totalWrongSelectedOptions = question?.studentExamAnswerResponses?.selectedOptions?.filter(option =>
            option.isCorrect === false).length || 0

        if (question?.type === "NUMERICAL") {
            if (question?.correctAnswer === null)
                return <div className="question-mark">
                    <div>
                        <span>Max: <strong>{question?.marks}</strong></span>
                        <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                    </div>
                </div>
            if (question?.correctAnswer === question?.studentExamAnswerResponses?.answer)
                return <>
                    <span className="question-correct">
                        <i className="bi bi-check-circle-fill"></i>
                        Correct
                    </span>
                    <div className="question-mark">
                        <span>
                            Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                        </span>
                        <span>
                            <span>Max: <strong>{question?.marks}</strong></span>
                            <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                        </span>
                    </div>
                </>
            else if (question?.studentExamAnswerResponses === null || question?.studentExamAnswerResponses?.answer === null)
                return <>
                    <span className="not-answered">
                        <i className="bi bi-dash-circle-fill"></i>
                        Not Answered
                    </span>
                    <div>
                        <span>Max: <strong>{question?.marks}</strong></span>
                        <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                    </div>
                </>
            else
                return <>
                    <span className="question-incorrect">
                        <i className="bi bi-x-circle-fill"></i>
                        Wrong
                    </span>
                    <div className="question-mark">
                        <span>
                            Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                        </span>
                        <span>
                            <span>Max: <strong>{question?.marks}</strong></span>
                            <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                        </span>
                    </div>
                </>
        }

        if (totalCorrectOptions === 0)
            return <div className="question-mark">
                <div>
                    <span>Max: <strong>{question?.marks}</strong></span>
                    <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                </div>
            </div>

        if (totalWrongSelectedOptions > 0)
            return <>
                <span className="question-incorrect">
                    <i className="bi bi-x-circle-fill"></i>
                    Wrong
                </span>
                <div className="question-mark">
                    <span>
                        Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                    </span>
                    <span>
                        <span>Max: <strong>{question?.marks}</strong></span>
                        <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                    </span>
                </div>
            </>

        if (totalCorrectOptions === totalCorrectSelectedOptions)
            return <>
                <span className="question-correct">
                    <i className="bi bi-check-circle-fill"></i>
                    Correct
                </span>
                <div className="question-mark">
                    <span>
                        Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                    </span>
                    <span>
                        <span>Max: <strong>{question?.marks}</strong></span>
                        <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                    </span>
                </div>
            </>

        if (totalCorrectSelectedOptions + totalWrongSelectedOptions === 0)
            return <>
                <span className="not-answered">
                    <i className="bi bi-dash-circle-fill"></i>
                    Not Answered
                </span>
                <div className="question-mark">
                    <span>
                        Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                    </span>
                    <span>
                        <span>Max: <strong>{question?.marks}</strong></span>
                        <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                    </span>
                </div>
            </>

        return <>
            <span className="partial-correct">
                <i className="bi bi-check2-circle me-1"></i>
                Partial Correct
            </span>
            <div className="question-mark">
                <span>
                    Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                </span>
                <span>
                    <span>Max: <strong>{question?.marks}</strong></span>
                    <span style={{ color: "#dc3545" }}>[{question?.negativeMarks || 0} Neg.]</span>
                </span>
            </div>
        </>

    }


    const getOptionClass = (option, selected) => {

        const isCorrect = selected?.isCorrect

        if (option?.isTrue === null && selected) {
            return "student-selected"
        }

        if (selected && isCorrect) {
            return "student-correct-option"
        }

        if (selected && !isCorrect) {
            return "student-wrong-option"
        }

        if (option?.isTrue) {
            return "correct-answer-option"
        }

        return ""
    }

    const getOptionIcon = (option, selectedOption) => {

        const isCorrect = option?.isTrue === true

        if (option?.isTrue === null)
            return

        if (selectedOption && isCorrect) {
            return (
                <i className="bi bi-check-circle-fill option-result-icon"></i>
            )
        }

        if (selectedOption && !isCorrect) {
            return (
                <i className="bi bi-x-circle-fill option-result-icon"></i>
            )
        }

        if (!selectedOption && isCorrect) {
            return (
                <i className="bi bi-check-circle-fill option-result-icon"></i>
            )
        }

        return null
    }

    useEffect(() => {
        dispatch(getStudentExamResult(studentExamId, pageNumber, pageSize))
    }, [dispatch, studentExamId, pageNumber, pageSize])

    return (
        <div className="student-exam-detail-card">
            <div className="student-question-paper">
                <div className="question-paper-title">
                    <div>
                        <h3>
                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                            Question Paper
                        </h3>
                        <span>
                            Total Questions:{" "}
                            {exam?.studentExamResult?.examQuestionResponses?.totalElements || 0}
                        </span>
                    </div>
                </div>
                <div className="questions-container">
                    {
                        exam?.studentExamResult?.examQuestionResponses?.content?.length > 0 ?
                            exam?.studentExamResult?.examQuestionResponses?.content?.map((question, index) => (
                                <div
                                    className="exam-question-card"
                                    key={question.id}>
                                    <div className="exam-question-header">
                                        <div className="question-number">
                                            Question {(pageNumber - 1) * pageSize + index + 1}.
                                            <span className="question-type">
                                                {question.type}
                                            </span>
                                        </div>
                                        <div className="question-status">
                                            {handleCheckIsCorrectOrNot(question)}
                                        </div>
                                    </div>
                                    <div className="exam-question-body">
                                        <h4>
                                            {question.question}
                                        </h4>
                                        {
                                            question?.type === "NUMERICAL" &&
                                            <div className='numerical-question'>
                                                {
                                                    question?.correctAnswer && <span>Correct Answer :{question?.correctAnswer} </span>
                                                }
                                                <span>Student Answer : {question?.studentExamAnswerResponses?.answer}</span>
                                            </div>
                                        }
                                        <div className="exam-options">
                                            {
                                                question?.examQuestionOptionResponses?.map((option, index) => {
                                                    const selectedOption = question?.studentExamAnswerResponses?.selectedOptions?.find(selectedOption =>
                                                        selectedOption.id === option.id)
                                                    return (
                                                        <div
                                                            key={option.id}
                                                            className={`result-option ${getOptionClass(
                                                                option,
                                                                selectedOption,
                                                            )}`}
                                                        >
                                                            <div className="option-left">
                                                                <span className="option-letter">
                                                                    {
                                                                        String.fromCharCode(65 + index)
                                                                    }
                                                                </span>
                                                                <span className="option-text">
                                                                    {option.optionText}
                                                                </span>
                                                            </div>
                                                            <div className="option-right">
                                                                {
                                                                    selectedOption && (
                                                                        <span className="selected-label">
                                                                            <i className="bi bi-person-fill me-1"></i>
                                                                            Selected
                                                                        </span>
                                                                    )
                                                                }
                                                                {
                                                                    selectedOption?.isCorrect && (
                                                                        <span className="correct-label">
                                                                            <i className="bi bi-check-lg me-1"></i>
                                                                            Correct Answer
                                                                        </span>
                                                                    )
                                                                }
                                                                {getOptionIcon(
                                                                    option,
                                                                    selectedOption
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="no-question-found">
                                <i className="bi bi-question-circle"></i>
                                <h4>No Questions Found</h4>
                                <p>
                                    There are no questions available for this exam.
                                </p>
                            </div>
                    }
                </div>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{exam?.studentExamResult?.examQuestionResponses?.totalElements || 0}</strong>
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

export default QuestionPaper

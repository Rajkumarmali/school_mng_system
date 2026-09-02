import React, { useEffect } from 'react'
import './StudentExamResult.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { getStudentExamResult } from '../../../../../state/exam/Action'

const StudentExamResult = () => {

    const { studentExamId } = useParams()

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;

    const handleCheckIsCorrectOrNot = (question) => {
        const totalCorrectOptions = question?.examQuestionOptionResponses?.filter(option =>
            option.isTrue).length || 0

        const totalCorrectSelectedOptions = question?.studentExamAnswerResponses?.selectedOptions?.filter(option =>
            option.isCorrect).length || 0

        const totalWrongSelectedOptions = question?.studentExamAnswerResponses?.selectedOptions?.filter(option =>
            option.isCorrect === false).length || 0

        if (question?.type === "NUMERICAL") {
            if (question?.correctAnswer === question?.studentExamAnswerResponses?.answer)
                return <span className="question-correct">
                    <i className="bi bi-check-circle-fill"></i>
                    Correct
                </span>
            else if (question?.studentExamAnswerResponses === null || question?.studentExamAnswerResponses?.answer === null)
                return <span className="not-answered">
                    <i className="bi bi-dash-circle-fill"></i>
                    Not Answered
                </span>
            else
                return <span className="question-incorrect">
                    <i className="bi bi-x-circle-fill"></i>
                    Wrong
                </span>
        }

        if (totalWrongSelectedOptions > 0)
            return <span className="question-incorrect">
                <i className="bi bi-x-circle-fill"></i>
                Wrong
            </span>

        if (totalCorrectOptions === totalCorrectSelectedOptions)
            return <span className="question-correct">
                <i className="bi bi-check-circle-fill"></i>
                Correct
            </span>

        if (totalCorrectSelectedOptions + totalWrongSelectedOptions === 0)
            return <span className="not-answered">
                <i className="bi bi-dash-circle-fill"></i>
                Not Answered
            </span>

        return <span className="partial-correct">
            <i className="bi bi-check2-circle me-1"></i>
            Partial Correct
        </span>
    }

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


    const getOptionClass = (option, selected) => {

        const isCorrect = selected?.isCorrect

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

        const isCorrect = option.isTrue === true

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
        <div className="exam-studentexamresult-container">
            <div className='exam-studentexamresult-card'>
                <div className="student-result-header">
                    <div>
                        <h2>
                            <i className="bi bi-clipboard-check-fill me-2"></i>
                            Student Exam Result
                        </h2>
                        <p>
                            Review the student's answers and correct options.
                        </p>
                    </div>
                </div>
                <div className="student-result-info-card">
                    <div className="student-result-avatar">
                        {exam?.studentExamResult?.studentName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="student-result-info">
                        <h3>{exam?.studentExamResult?.studentName}</h3>
                        <span>
                            Roll No: {exam?.studentExamResult?.rollNumber}
                        </span>
                        <span>
                            Registration No: {exam?.studentExamResult?.RegistrationNumber}
                        </span>
                    </div>
                    <div className="student-result-summary">
                        <div>
                            <span>Total Marks</span>
                            <strong>{(exam?.studentExamResult?.totalObtainMarks)?.toFixed(2)} / {exam?.studentExamResult?.totalMarks}</strong>
                        </div>
                        <div>
                            <span>Percentage</span>
                            <strong>{((exam?.studentExamResult?.totalObtainMarks / exam?.studentExamResult?.totalMarks) * 100).toFixed(2)}%</strong>
                        </div>
                    </div>
                </div>
                <div className="result-legend">
                    <div>
                        <span className="legend-box student-selected"></span>
                        Student Selected
                    </div>
                    <div>
                        <span className="legend-box correct-answer"></span>
                        Correct Answer
                    </div>
                    <div>
                        <span className="legend-box wrong-answer"></span>
                        Wrong Answer
                    </div>
                </div>
                <div className="student-result-questions">
                    {exam?.studentExamResult?.examQuestionResponses?.content?.map((question, index) => {
                        return (
                            <div
                                className="result-question-card"
                                key={question.id}
                            >
                                <div className="result-question-header">
                                    <div className="result-question-number">
                                        Question {(pageNumber - 1) * pageSize + index + 1}
                                        <span className="question-type">
                                            {question.type}
                                        </span>
                                    </div>

                                    <div className="result-question-status">
                                        {handleCheckIsCorrectOrNot(question)}
                                        <div className="question-mark">
                                            <span>
                                                Obtain: <strong>{(question?.studentExamAnswerResponses?.obtainMarks)?.toFixed(2) ?? 0}</strong>
                                            </span>

                                            <span>
                                                Max: <strong>{question?.marks}</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="result-question-text">
                                    <strong>
                                        {question.question}
                                    </strong>
                                </div>
                                {
                                    question?.type === "NUMERICAL" &&
                                    <div className='numerical-question'>
                                        <span>Correct Answer :{question?.correctAnswer} </span>
                                        <span>Student Answer : {question?.studentExamAnswerResponses?.answer}</span>
                                    </div>
                                }
                                <div className="result-options">
                                    {question?.examQuestionOptionResponses?.map(
                                        (option, optionIndex) => {
                                            const selectedOption = question?.studentExamAnswerResponses?.selectedOptions.find(
                                                selectedOption => selectedOption.id === option.id)
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
                                                            {String.fromCharCode(
                                                                65 + optionIndex
                                                            )}
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
                                                                    Student Selected
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
                                        }
                                    )}
                                </div>
                            </div>
                        )
                    })}
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

export default StudentExamResult
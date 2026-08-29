import React, { useEffect } from 'react'
import './QuestionPaper.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExamQuestions } from '../../../state/exam/Action';

const QuestionPaper = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"))
    const size = Number(searchParams.get("size"))
    const studentExamId = searchParams.get("studentExamId")
    const examId = searchParams.get("examId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const totalPages = exam?.examQuestions?.totalPages || 0;
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
            examId,
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
            examId,
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
            examId,
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
            examId,
            action,
            pageNumber: pageNumber,
            pageSize,
        })
    }

    useEffect(() => {
        dispatch(getExamQuestions(examId, pageNumber, pageSize))
    }, [dispatch, examId, pageNumber, pageSize])

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
                            {exam?.examQuestions?.totalElements || 0}
                        </span>
                    </div>
                </div>
                <div className="questions-container">
                    {
                        exam?.examQuestions?.content?.length > 0 ?
                            exam?.examQuestions?.content?.map((question, index) => (
                                <div
                                    className="exam-question-card"
                                    key={question.id}>
                                    <div className="exam-question-header">
                                        <div className="question-number">
                                            Question {(pageNumber - 1) * pageSize + index + 1}.
                                        </div>
                                        <div className="question-type-marks">
                                            <span className="question-type">
                                                {question.type}
                                            </span>
                                            <span className="question-marks">
                                                <i className="bi bi-star-fill me-1"></i>
                                                {question.marks} Mark
                                                {question.marks !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="exam-question-body">
                                        <h4>
                                            {question.question}
                                        </h4>
                                        <div className="exam-options">
                                            {
                                                question?.examQuestionOptionResponses?.map((option, index) => (
                                                    <label
                                                        key={option.id}
                                                        className={`exam-option`}
                                                    >
                                                        <input
                                                            type="radio"
                                                        />
                                                        <span className="option-text">
                                                            {option.optionText}
                                                        </span>
                                                    </label>
                                                ))
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
                        Total : <strong>{exam?.examQuestions?.totalElements || 0}</strong>
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

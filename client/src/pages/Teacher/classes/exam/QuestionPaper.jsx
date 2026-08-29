import React, { useEffect, useState } from 'react';
import './QuestionPaper.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createExamQuestion, deleteExamQuestion, getExamById, getExamQuestions, updateExamQuestion, updateExamToShowQuestinoPaperToStudent } from '../../../../state/exam/Action';

const QuestionPaper = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId")
    const tab = searchParams.get("tab")
    const page = Number(searchParams.get("page"))
    const size = Number(searchParams.get("size"))
    const examId = searchParams.get("examId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const [activeTab, setActiveTab] = useState('editor');
    const [isEditQuestionModal, setIsEditQuestionModal] = useState(false)
    const [editQuestionId, setEditQuestionId] = useState()
    // const totalMarks = exam?.examQuestions.reduce((acc, q) => acc + Number(q.marks || 0), 0);

    const [questionData, setQuestionData] = useState({
        question: "",
        type: "MCQ",
        marks: 4,
        examQuestionOptionRequests: [
            {
                "optionText": "",
                "isTrue": false
            },
            {
                "optionText": "",
                "isTrue": false
            },
            {
                "optionText": "",
                "isTrue": false
            },
            {
                "optionText": "",
                "isTrue": false
            }
        ]
    })

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
            classId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: 1,
            pageSize: pageSize,
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            classId,
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
            classId,
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
            classId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: pageNumber,
            pageSize,
        })
    }

    const handleEditQuestionModal = (question) => {
        setIsEditQuestionModal(true)
        setEditQuestionId(question.id)
        setQuestionData({
            question: question.question,
            type: question.type || "MCQ",
            marks: question.marks || 0,
            examQuestionOptionRequests: (question?.type === "MCQ" || question?.type === "MSQ") ? [
                {
                    optionText: question?.examQuestionOptionResponses[0]?.optionText || "",
                    isTrue: question?.examQuestionOptionResponses[0]?.isTrue || false
                },
                {
                    optionText: question?.examQuestionOptionResponses[1]?.optionText || "",
                    isTrue: question?.examQuestionOptionResponses[1]?.isTrue || false
                },
                {
                    optionText: question?.examQuestionOptionResponses[2]?.optionText || "",
                    isTrue: question?.examQuestionOptionResponses[2]?.isTrue || false
                },
                {
                    optionText: question?.examQuestionOptionResponses[3]?.optionText || "",
                    isTrue: question?.examQuestionOptionResponses[3]?.isTrue || false
                }
            ] :
                [
                    {
                        "optionText": "",
                        "isTrue": false
                    },
                    {
                        "optionText": "",
                        "isTrue": false
                    },
                    {
                        "optionText": "",
                        "isTrue": false
                    },
                    {
                        "optionText": "",
                        "isTrue": false
                    }
                ]
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setQuestionData({
            ...questionData,
            [name]: value
        })
    }

    const handleChangeOption = (index, value) => {
        setQuestionData(prev => ({
            ...prev,
            examQuestionOptionRequests: prev.examQuestionOptionRequests.map((option, i) =>
                i === index ?
                    {
                        ...option,
                        optionText: value
                    }
                    :
                    option
            )
        }))
    }

    const handleChangeCorrectOption = (index) => {
        setQuestionData(prev => ({
            ...prev,
            examQuestionOptionRequests: prev.examQuestionOptionRequests.map((option, i) => {
                if (prev.type === "MCQ") {
                    return {
                        ...option,
                        isTrue: i === index
                    }
                }
                if (prev.type === "MSQ") {
                    return i === index ? {
                        ...option,
                        isTrue: !option.isTrue
                    }
                        :
                        option
                }
                return option
            })
        }))
    }


    const handleSaveQuestion = async (e) => {
        e.preventDefault()

        isEditQuestionModal ?
            await dispatch(updateExamQuestion(editQuestionId, questionData))
            :
            await dispatch(createExamQuestion(examId, questionData))

        await dispatch(getExamQuestions(examId, pageNumber, pageSize))
        setIsEditQuestionModal(false)

        setQuestionData({
            question: "",
            type: "MCQ",
            marks: 4,
            examQuestionOptionRequests: [
                {
                    "optionText": "",
                    "isTrue": false
                },
                {
                    "optionText": "",
                    "isTrue": false
                },
                {
                    "optionText": "",
                    "isTrue": false
                },
                {
                    "optionText": "",
                    "isTrue": false
                }
            ]
        })
    }

    const handleDeleteQuestion = async (id) => {
        await dispatch(deleteExamQuestion(id))
        await dispatch(getExamQuestions(examId, pageNumber, pageSize))
    };

    const handleChangeShowQuestionPaper = async () => {
        await dispatch(updateExamToShowQuestinoPaperToStudent(examId))
        await dispatch(getExamById(examId))
    }

    useEffect(() => {
        dispatch(getExamQuestions(examId, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, examId])


    return (
        <div className="teacher-qp-container">
            <header className="qp-teacher-header">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="header-title-block">
                        <span className="teacher-badge">INSTRUCTOR PORTAL</span>
                        <h1>Question Paper Creator</h1>
                    </div>
                    <div className="header-actions">
                        <div className="tab-switch">
                            <button
                                className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                                onClick={() => setActiveTab('editor')}
                            >
                                ✏️ Builder
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('preview')}
                            >
                                👁️ Student Preview
                            </button>
                        </div>
                        <button
                            className="btn-publish"
                            onClick={handleChangeShowQuestionPaper}
                        >
                            <i
                                className={`bi ${exam?.exam?.showQuestionToStudent
                                    ? "bi-eye-slash-fill"
                                    : "bi-eye-fill"
                                    } me-2`}
                            ></i>
                            {
                                exam?.exam?.showQuestionToStudent ?
                                    "Hidden Question Paper" :
                                    "Show Question Paper"
                            }
                        </button>
                    </div>
                </div>
                <div className="metrics-card">
                    <div className="metric-row">
                        <span>Total Questions:</span>
                        <strong>{exam?.examQuestions?.totalElements}</strong>
                    </div>
                    {/* <div className="metric-row">
                        <span>Total Marks:</span>
                        <strong >{totalMarks} Marks</strong>
                    </div> */}
                </div>
            </header>

            <div className="qp-teacher-grid">
                <main className="qp-content-area">
                    {activeTab === 'editor' ?
                        <>
                            <div className="teacher-card add-question-card">
                                <h3 className="card-heading">Add New Question</h3>
                                <form onSubmit={handleSaveQuestion}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Question Type</label>
                                            <select
                                                name='type'
                                                value={questionData.type}
                                                onChange={handleChange}
                                            >
                                                <option value="MCQ">Multiple Choice (MCQ)</option>
                                                <option value="MSQ">Multiple Select  (MSQ)</option>
                                                <option value="SHORT_ANSWER">Short answer</option>
                                                <option value="LONG_ANSWER">Long answer</option>
                                            </select>
                                        </div>

                                        <div className="form-group small-input">
                                            <label>Marks</label>
                                            <input
                                                type="number"
                                                min="1"
                                                name="marks"
                                                value={questionData.marks}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Question Prompt</label>
                                        <textarea
                                            rows="2"
                                            name='question'
                                            value={questionData.question}
                                            onChange={handleChange}
                                            placeholder="Type your question statement here..."
                                            required
                                        ></textarea>
                                    </div>
                                    {
                                        (questionData.type === 'MCQ' || questionData.type === 'MSQ') && (
                                            <div className="mcq-options-builder">
                                                <label className="options-title">
                                                    Answer Options (Select correct answer ratio)
                                                </label>
                                                {questionData.examQuestionOptionRequests.map((opt, idx) => (
                                                    <div key={idx} className="option-input-row">
                                                        <input
                                                            type={
                                                                questionData.type === "MCQ" ?
                                                                    "radio"
                                                                    :
                                                                    'checkbox'
                                                            }
                                                            name="isTrue"
                                                            checked={opt.isTrue}
                                                            onChange={() => handleChangeCorrectOption(idx)}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                                            value={opt.optionText}
                                                            onChange={(e) => handleChangeOption(idx, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }

                                    <button
                                        type="submit"
                                        className="btn-add-q"
                                    >
                                        <i className='bi bi-plus-circle me-2'></i>
                                        {
                                            isEditQuestionModal ?
                                                "Update Question"
                                                :
                                                "Add Question to Paper"
                                        }
                                    </button>
                                </form>
                            </div>

                            <div className="questions-list-wrapper">
                                <h3 className="section-subtitle">
                                    Configured Questions ({exam?.examQuestions?.totalElements})
                                </h3>
                                {
                                    exam?.examQuestions?.content?.length === 0 ?
                                        <div className="empty-state">
                                            No questions added yet. Use the form above to build your exam.
                                        </div>
                                        :
                                        exam?.examQuestions?.content?.map((q, idx) => (
                                            <div key={q.id} className="teacher-card q-item-card">
                                                <div className="q-item-header">
                                                    <span className="q-marks">
                                                        {q.type}
                                                    </span>
                                                    <div className="q-header-meta">
                                                        <span className="q-marks">{q.marks} Marks</span>
                                                        <button
                                                            className="btn-delete"
                                                            onClick={() => handleEditQuestionModal(q)}
                                                        >
                                                            <i className='bi bi-pencil-square'></i>
                                                        </button>
                                                        <button
                                                            className="btn-delete"
                                                            onClick={() => handleDeleteQuestion(q.id)}
                                                        >
                                                            <i className='bi bi-trash'></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className="q-item-text">
                                                    <strong>Q{(pageNumber - 1) * pageSize + idx + 1}.</strong> {q.question}
                                                </p>

                                                {(q?.type === 'MCQ' || q?.type === "MSQ" || q?.type === "TRUE_FALSE") &&
                                                    <div className="q-item-options">
                                                        {q?.examQuestionOptionResponses?.map((opt, oIdx) =>
                                                            <div
                                                                key={oIdx}
                                                                className={`q-opt-pill ${opt.isTrue === true ? 'correct' : ''
                                                                    }`}
                                                            >
                                                                <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt?.optionText}
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                            </div>
                                        ))
                                }
                            </div>
                        </>
                        :
                        <div className="teacher-card preview-paper-sheet">
                            <div>
                                <p>
                                    <strong>Total Question:</strong> {exam?.examQuestions?.totalElements}
                                </p>
                                {/* <p>
                                    <strong>Total Marks:</strong> {totalMarks}
                                </p> */}
                            </div>

                            <hr className="divider" />

                            <div className="preview-questions">
                                {exam?.examQuestions?.content?.map((q, idx) => (
                                    <div key={q.id} className="preview-q-block">
                                        <div className="preview-q-meta">
                                            <strong>
                                                Q{(pageNumber - 1) * pageSize + idx + 1}. ({q.marks} Marks) ({q.type})
                                            </strong>

                                        </div>
                                        <p>{q?.question}</p>
                                        {
                                            (q?.type === 'MCQ' || q?.type === "MSQ" || q?.type === "TRUE_FALSE") &&
                                            <ul className="preview-options">
                                                {q?.examQuestionOptionResponses?.map((opt, oIdx) => (
                                                    <li key={oIdx}>
                                                        ({String.fromCharCode(65 + oIdx)}) {opt?.optionText}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        <hr></hr>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
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
                </main>
            </div>
        </div>
    );
};

export default QuestionPaper;
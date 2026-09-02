import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { createExam, getExamBySectionSubjectId } from '../../../../state/exam/Action'
import ExamDetail from './ExamDetail'

const Exam = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionSubjectId = searchParams.get("classId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const examId = searchParams.get("examId")

    const [examData, setExamData] = useState(
        {
            name: "",
            type: "OTHER",
            mode: "OFFLINE",
            date: "",
            startTime: "",
            endTime: "",
            maxMarks: 0,
            passingMarks: 0,
            status: "SCHEDULED",
            sectionSubjectId: sectionSubjectId
        }
    )

    const totalPages = exam?.sectionSubjectExams?.totalPages || 0;
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
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page: pageNumber + 1,
            size: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleClearData = () => {
        setExamData(
            {
                name: "",
                type: "OTHER",
                mode: "OFFLINE",
                date: "",
                startTime: "2026-08-20T04:58:50.575Z",
                endTime: "2026-08-20T04:58:50.575Z",
                maxMarks: 0,
                passingMarks: 0,
                status: "SCHEDULED",
                sectionSubjectId: sectionSubjectId
            }
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setExamData({
            ...examData,
            [name]: value
        })
    }

    const handleSave = async () => {
        const payload = {
            ...examData,
            startTime: examData.date ?
                `${examData.date}T${examData.startTime}:00`
                : null,
            endTime: examData.date ?
                `${examData.date}T${examData.endTime}:00`
                : null
        }
        await dispatch(createExam([payload]))
        await dispatch(getExamBySectionSubjectId(sectionSubjectId, pageNumber, pageSize))
        handleClearData();
    }

    useEffect(() => {
        dispatch(getExamBySectionSubjectId(sectionSubjectId, pageNumber, pageSize))
    }, [dispatch, sectionSubjectId, pageNumber, pageSize])


    return (
        <div>
            {
                examId ?
                    <div>
                        <ExamDetail />
                    </div>
                    :
                    <div>
                        <div className="section-exam-header">
                            <div>
                                <h2>Exams</h2>
                            </div>
                            <button
                                className="add-section-exam-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#examModal"
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Exam
                            </button>
                        </div>
                        <table className="table section-exam-table">
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Name</th>
                                    <th>SubjectCode</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>MaxMarks</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    exam?.sectionSubjectExams?.content?.length > 0 ?
                                        exam?.sectionSubjectExams?.content?.map((exam, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{exam?.name}</td>
                                                <td>{exam?.subjectResponse?.code}</td>
                                                <td>{exam?.subjectResponse?.shortName}</td>
                                                <td>{exam?.date ? new Date(exam?.date).toLocaleDateString("en-GB") : "-"}</td>
                                                <td>{exam?.status}</td>
                                                <td>{exam?.maxMarks}</td>
                                                <td className='text-center'>
                                                    <button
                                                        onClick={() => setSearchParams({ classId: sectionSubjectId, tab, page: pageNumber, size: pageSize, examId: exam.id })}
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
                                Total : <strong>{exam?.sectionSubjectExams?.totalElements || 0}</strong>
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


            <div className="modal fade" id="examModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"           >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Exam</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Exam Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={examData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Select Exam Type</label>
                                    <select
                                        className="modal-input"
                                        name='type'
                                        value={examData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="CLASS_TEST">Class Test</option>
                                        <option value="UNIT_TEST">Unit Test</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Exam Mode</label>
                                    <select
                                        className="modal-input"
                                        name='mode'
                                        value={examData.mode}
                                        onChange={handleChange}
                                    >
                                        <option value="ONLINE">Online</option>
                                        <option value="OFFLINE">Offline</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Date</label>
                                    <input type="date"
                                        className="modal-input"
                                        name='date'
                                        value={examData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Start Time</label>
                                    <input type="time"
                                        className="modal-input"
                                        name='startTime'
                                        value={examData.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>End Time</label>
                                    <input type="time"
                                        className="modal-input"
                                        name='endTime'
                                        value={examData.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Max Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='maxMarks'
                                        value={examData.maxMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Passing Marks</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='passingMarks'
                                        value={examData.passingMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
                                class="college-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="college-modal-btn" data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Exam

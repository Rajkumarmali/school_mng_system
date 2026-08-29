import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getExamById, updateExam } from '../../../../state/exam/Action'
import Student from './student/Student'
import QuestionPaper from './QuestionPaper'

const ExamDetail = () => {


    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionSubjectId = searchParams.get("classId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const examId = searchParams.get("examId")
    const action = searchParams.get("action")

    const [examData, setExamData] = useState({
        name: "",
        type: "OTHER",
        mode: "OFFLINE",
        date: "",
        startTime: "",
        endTime: "",
        maxMarks: 0,
        passingMarks: 0,
        status: "SCHEDULED"
    })

    const handleBack = () => {
        setSearchParams({
            classId: sectionSubjectId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleSetData = () => {
        setExamData({
            name: exam?.exam?.name || "",
            type: exam?.exam?.type || "OTHER",
            mode: exam?.exam?.mode || "OFFLINE",
            date: exam?.exam?.date || "",
            startTime: exam?.exam?.startTime
                ? exam?.exam?.startTime.substring(11, 16)
                : "",
            endTime: exam?.exam?.endTime
                ? exam?.exam?.endTime.substring(11, 16)
                : "",
            maxMarks: exam?.exam?.maxMarks || 0,
            passingMarks: exam?.exam?.passingMarks || 0,
            status: exam?.exam?.status || "SCHEDULED"
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData({
            ...examData,
            [name]: value
        })
    }

    const handleSave = async () => {
        const payload = {
            ...examData,
            startTime: examData.date
                ? `${examData.date}T${examData.startTime}:00`
                : null,
            endTime: examData.date
                ? `${examData.date}T${examData.endTime}:00`
                : null,
        }
        await dispatch(updateExam(examId, payload))
        await dispatch(getExamById(examId))
    }

    useEffect(() => {
        dispatch(getExamById(examId))
    }, [dispatch, examId]);

    return (
        <div>
            <div className="section-exam-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="back-section-exam-detail-btn"
                        onClick={() => setSearchParams({ classId: sectionSubjectId, tab, page: pageNumber, size: pageSize, examId, action: "exam" })}
                    >
                        Exam details
                    </button>
                    <button
                        className="back-section-exam-detail-btn"
                        onClick={() => setSearchParams({ classId: sectionSubjectId, tab, page: pageNumber, size: pageSize, examId, action: "questionPaper" })}
                    >
                        Question Paper
                    </button>
                    <button
                        className="back-section-exam-detail-btn"
                        onClick={() => setSearchParams({ classId: sectionSubjectId, tab, page: pageNumber, size: pageSize, examId, action: "student" })}
                    >
                        Students
                    </button>
                </div>
                <button
                    className="back-section-exam-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div>
                {
                    action === "student" ?
                        <div>
                            <Student />
                        </div>
                        :
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
                                                <i className="bi bi-journal-text me-2"></i>
                                                <span>
                                                    <strong>Exam Details  :</strong>
                                                </span>
                                                <button
                                                    type="button"
                                                    className="exam-edit-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editExamModal"
                                                    onClick={handleSetData}
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                </button>
                                            </div>
                                            <div>
                                                <i className="bi bi-file-earmark-text-fill me-2"></i>
                                                <span>Name : {exam?.exam?.name}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-calendar-event-fill me-2"></i>
                                                <span>Date : {exam?.exam?.date
                                                    ? new Date(exam.exam.date).toLocaleDateString("en-GB")
                                                    : "-"}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-laptop-fill me-2"></i>
                                                <span>Mode : {exam?.exam?.mode}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-info-circle-fill me-2"></i>
                                                <span>Status : {exam?.exam?.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-student-detail-info">
                                        <div className="section-student-detail-contact">
                                            <div>
                                                <i className="bi bi-clock-fill me-2"></i>
                                                <span>StartTime :
                                                    {exam?.exam?.startTime
                                                        ? new Date(exam.exam.startTime).toLocaleTimeString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })
                                                        : "-"}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-clock-history me-2"></i>
                                                <span>EndTime :
                                                    {exam?.exam?.endTime
                                                        ? new Date(exam.exam.endTime).toLocaleTimeString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })
                                                        : "-"}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-clipboard-data-fill me-2"></i>
                                                <span>MaxMarks : {exam?.exam?.maxMarks}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                <span>PassingMarks : {exam?.exam?.passingMarks}</span>
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
                                                <span>Code : {exam?.exam?.subjectResponse?.code}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-book-fill me-2"></i>
                                                <span>Name : {exam?.exam?.subjectResponse?.name} ({exam?.exam?.subjectResponse?.shortName})</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-bookmark-fill me-2"></i>
                                                <span>Subject Type : {exam?.exam?.subjectResponse?.subjectType}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-award-fill me-2"></i>
                                                <span>Credit : {exam?.exam?.subjectResponse?.credit}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </div>


            <div class="modal fade" id="editExamModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Edit Exam
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={examData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Select Exam Type</label>
                                    <select type="number"
                                        className="modal-input"
                                        name="type"
                                        value={examData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="MID_TERM">MID_TERM</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Select Exam Mode</label>
                                    <select type="number"
                                        className="modal-input"
                                        name="mode"
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
                                        name="date"
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
                                    <label>MaxMarks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='maxMarks'
                                        value={examData.maxMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Passing Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='passingMarks'
                                        value={examData.passingMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Select Exam Status</label>
                                    <select type="number"
                                        className="modal-input"
                                        name="status"
                                        value={examData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="ONGOING">OnGoing</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELED">Cancel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleSetData} type="button"
                                class="departments-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="departments-modal-btn" data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamDetail

import React, { useEffect, useState } from 'react'
import './ExamDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getExamById, updateExam } from '../../../state/section/Action'
import { jwtDecode } from 'jwt-decode'
import Student from './student/Student'
const ExamDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const sectionId = searchParams.get("sectionId")
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
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
            sectionId,
            tab,
            page,
            size
        })
    }

    const handleSetData = () => {
        setExamData({
            name: section?.exam?.name || "",
            type: section?.exam?.type || "OTHER",
            mode: section?.exam?.mode || "OFFLINE",
            date: section?.exam?.date || "",
            startTime: section?.exam?.startTime
                ? section?.exam?.startTime.substring(11, 16)
                : "",
            endTime: section?.exam?.endTime
                ? section?.exam?.endTime.substring(11, 16)
                : "",
            maxMarks: section?.exam?.maxMarks || 0,
            passingMarks: section?.exam?.passingMarks || 0,
            status: section?.exam?.status || "SCHEDULED"
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
                        onClick={() => setSearchParams({ sectionId, tab, page, size, examId, action: "exam" })}
                    >
                        Exam details
                    </button>
                    <button
                        className="back-section-exam-detail-btn"
                        onClick={() => setSearchParams({ sectionId, tab, page, size, examId, action: "student" })}
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
                        <div>
                            <div className="section-exam-detail-card">
                                <div className="section-student-detail-info">
                                    <div className="section-student-detail-contact">
                                        <div>
                                            <i className="bi bi-journal-text me-2"></i>
                                            <span>
                                                <strong>Exam Details  :</strong>
                                            </span>
                                            {
                                                isHod &&
                                                <button
                                                    type="button"
                                                    className="exam-edit-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editExamModal"
                                                    onClick={handleSetData}
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                </button>
                                            }
                                        </div>
                                        <div>
                                            <i className="bi bi-file-earmark-text-fill me-2"></i>
                                            <span>Name : {section?.exam?.name}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-calendar-event-fill me-2"></i>
                                            <span>Date : {section?.exam?.date
                                                ? new Date(section.exam.date).toLocaleDateString("en-GB")
                                                : "-"}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-laptop-fill me-2"></i>
                                            <span>Mode : {section?.exam?.mode}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-info-circle-fill me-2"></i>
                                            <span>Status : {section?.exam?.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-student-detail-info">
                                    <div className="section-student-detail-contact">
                                        <div>
                                            <i className="bi bi-clock-fill me-2"></i>
                                            <span>StartTime :
                                                {section?.exam?.startTime
                                                    ? new Date(section.exam.startTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })
                                                    : "-"}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clock-history me-2"></i>
                                            <span>EndTime :
                                                {section?.exam?.endTime
                                                    ? new Date(section.exam.endTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })
                                                    : "-"}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clipboard-data-fill me-2"></i>
                                            <span>MaxMarks : {section?.exam?.maxMarks}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>PassingMarks : {section?.exam?.passingMarks}</span>
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
                                            <span>Code : {section?.exam?.subjectResponse?.code}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-book-fill me-2"></i>
                                            <span>Name : {section?.exam?.subjectResponse?.name} ({section?.exam?.subjectResponse?.shortName})</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-bookmark-fill me-2"></i>
                                            <span>Subject Type : {section?.exam?.subjectResponse?.subjectType}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-award-fill me-2"></i>
                                            <span>Credit : {section?.exam?.subjectResponse?.credit}</span>
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

export default ExamDetails

import React, { useEffect, useState } from 'react'
import './UniversityExamDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversityExamById, updateUniversityExam, updateUniversityExamShowAdmitCard, updateUniversityExamShowTimeTable } from '../../state/universityExam/Action';
import Subject from './subject/Subject';
import Student from './student/Student';
import Result from './result/Result';
const UniversityExamDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [universityExamData, setUniversityExamData] = useState({

    })

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const handleUpdateExamModel = () => {
        setUniversityExamData({
            name: "",
            formStartAt: formatDateForInput(universityExam?.universityExam?.formStartAt),
            formEndAt: formatDateForInput(universityExam?.universityExam?.formEndAt),
            academicYear: "",
            year: "",
            semester: "",
            courseCode: "",
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUniversityExamData({
            ...universityExamData,
            [name]: value
        })
    }

    const handleSave = async () => {
        const payload = {
            ...universityExamData,
            formStartAt: universityExamData.formStartAt ? new Date(universityExamData.formStartAt).toISOString() : null,
            formEndAt: universityExamData.formEndAt ? new Date(universityExamData.formEndAt).toISOString() : null
        }
        await dispatch(updateUniversityExam(universityExamId, payload))
        await dispatch(getUniversityExamById(universityExamId))
    }

    const handleShowTimeTable = async () => {
        await dispatch(updateUniversityExamShowTimeTable(universityExamId))
        await dispatch(getUniversityExamById(universityExamId))
    }

    const handleShowAdmitCard = async () => {
        await dispatch(updateUniversityExamShowAdmitCard(universityExamId))
        await dispatch(getUniversityExamById(universityExamId))
    }


    useEffect(() => {
        dispatch(getUniversityExamById(universityExamId))
    }, [dispatch, universityExamId])

    return (
        <div>
            <nav class="university-exam-detail-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ universityExamId, tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ universityExamId, tab: "subject" })}
                        >
                            Subjects
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ universityExamId, tab: "student" })}
                        >
                            Students
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ universityExamId, tab: "result" })}
                        >
                            Results
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="exam-detail-card">
                {
                    tab === "subject" ?
                        <div>
                            <Subject />
                        </div>
                        :
                        tab === "student" ?
                            <div>
                                <Student />
                            </div>
                            :
                            tab === "result" ?
                                <div>
                                    <Result />
                                </div>
                                :
                                <div>
                                    <div className="">
                                        <div className="university-exam-action-card">
                                            <div className="university-exam-action-btns">
                                                <button className='university-exam-action-btn'
                                                    onClick={handleShowTimeTable}
                                                >
                                                    {
                                                        universityExam?.universityExam?.showTimeTable ?
                                                            "Hide Time Table"
                                                            :
                                                            "Release Time Table"
                                                    }
                                                </button>
                                                <button className="university-exam-action-btn"
                                                    onClick={handleShowAdmitCard}>
                                                    {
                                                        universityExam?.universityExam?.showAdmitCard ?
                                                            "Hide Admit card"
                                                            :
                                                            "Release Admit card"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className="exam-detail-card">
                                            <div className="info-line">
                                                <i className="bi bi-journal-text me-2"></i>
                                                <span>Exam Name : {universityExam?.universityExam?.name}</span>
                                                <button className="university-exam-edit-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateExamModal"
                                                    onClick={handleUpdateExamModel}
                                                >
                                                    <i className='bi bi-pencil-square'></i>
                                                </button>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-book me-2"></i>
                                                <span>Course : {universityExam?.universityExam?.courseName} ({universityExam?.universityExam?.courseCode})</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-calendar3 me-2"></i>
                                                <span>Academic Year : {universityExam?.universityExam?.academicYear}</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-mortarboard-fill me-2"></i>
                                                <span>Year/Semester : {universityExam?.universityExam?.year} year / {universityExam?.universityExam?.semester} sem</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-calendar-plus me-2"></i>
                                                <span>Form Start : {new Date(universityExam?.universityExam?.formStartAt).toLocaleDateString("en-GB")}</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-calendar-check me-2"></i>
                                                <span>Form End : {new Date(universityExam?.universityExam?.formEndAt).toLocaleDateString("en-GB")}</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-journals me-2"></i>
                                                <span>Total Subject : {universityExam?.universityExam?.totalSubjects}</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-people-fill me-2"></i>
                                                <span>Total Students : {universityExam?.universityExam?.totalStudents}</span>
                                            </div>

                                            <div className="info-line">
                                                <i className="bi bi-person-check-fill me-2"></i>
                                                <span>Registered Students : {universityExam?.universityExam?.totalFilledFormStudents}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                }
            </div>

            <div class="modal fade" id="updateExamModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Exam</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Form Start</label>
                                    <input type="date"
                                        className="modal-input"
                                        name="formStartAt"
                                        value={universityExamData.formStartAt}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Form End</label>
                                    <input type="date"
                                        className="modal-input"
                                        name="formEndAt"
                                        value={universityExamData.formEndAt}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button

                                    type="button"
                                    class="student-modal-btn"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleSave}
                                    type="button"
                                    class="student-modal-btn" data-bs-dismiss="modal"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversityExamDetails

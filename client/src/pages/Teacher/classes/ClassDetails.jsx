import React, { useEffect } from 'react'
import './ClassDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTeacherClassBySectionSubjectId } from '../../../state/teacher/Action'
import Student from './student/Student'
const ClassDetails = () => {


    const dispatch = useDispatch()
    const teacher = useSelector((state) => state.teacher)

    const [searchParams, setSearchParams] = useSearchParams();
    const classId = searchParams.get("classId")
    const tab = searchParams.get("tab")


    useEffect(() => {
        dispatch(getTeacherClassBySectionSubjectId(classId))
    }, [dispatch, classId])

    return (
        <div>
            <nav class="teacher-class-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ classId, tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ classId, tab: "students" })}
                        >
                            Students
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="teacher-class-detail-card">
                {
                    tab === "students" ?
                        <div>
                            <Student />
                        </div>
                        :
                        <div>
                            <div className="teacher-class-detail-header">
                                <div className="teacher-class-detail-info">
                                    <div className="teacher-class-detail-contact">
                                        <div>
                                            <i className="bi bi-journal-bookmark-fill me-2"></i>
                                            <strong>Subject Details:</strong>
                                        </div>
                                        <div>
                                            <i className="bi bi-upc-scan me-2"></i>
                                            <span>Code : {teacher?.teacherClass?.subjectResponse?.code}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-book-fill me-2"></i>
                                            <span>Name : {teacher?.teacherClass?.subjectResponse?.name}  ({teacher?.teacherClass?.subjectResponse?.shortName})</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-journal-text me-2"></i>
                                            <span>Type : {teacher?.teacherClass?.subjectResponse?.subjectType}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-award-fill me-2"></i>
                                            <span>Credit : {teacher?.teacherClass?.subjectResponse?.credit}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-clipboard-data-fill me-2"></i>
                                            <span>Max Marks : {teacher?.teacherClass?.subjectResponse?.maxMarks}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            <span>Passing Marks : {teacher?.teacherClass?.subjectResponse?.passingMarks}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="teacher-class-detail-info">
                                    <div className="teacher-class-detail-contact">
                                        <div>
                                            <i className="bi bi-building-fill me-2"></i>
                                            <strong>Section Details:</strong>
                                        </div>
                                        <div>
                                            <i className="bi bi-upc-scan me-2"></i>
                                            <span>Code : {teacher?.teacherClass?.sectionResponse?.code}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-door-open-fill me-2"></i>
                                            <span>Name : {teacher?.teacherClass?.sectionResponse?.name}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-calendar3 me-2"></i>
                                            <span>Year/Semester : {teacher?.teacherClass?.sectionResponse?.year} / {teacher?.teacherClass?.sectionResponse?.semester}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-diagram-3-fill me-2"></i>
                                            <span>Department Code : {teacher?.teacherClass?.sectionResponse?.departmentCode}</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-building me-2"></i>
                                            <span>Department Name : {teacher?.teacherClass?.sectionResponse?.departmentName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stats-container">
                                <div className="stat-card">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <h3>{teacher?.teacherClass?.totalStudent}</h3>
                                    <span>Total Students</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ClassDetails

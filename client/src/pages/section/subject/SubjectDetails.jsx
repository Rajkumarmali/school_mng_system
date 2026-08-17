import React, { useEffect, useState } from 'react'
import './SubjectDetails.css'
import { jwtDecode } from 'jwt-decode'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSectionSubjectById, updateSectionSubjectTeacher } from '../../../state/section/Action'
import Student from './student/Student'

const SubjectDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const sectionSubjectId = searchParams.get("sectionSubjectId")
    const action = searchParams.get("action")

    const dispatch = useDispatch();
    const section = useSelector((state) => state.section);

    const [teacherEmpIdOrEmail, setTeacherEmpIdOrEmail] = useState();

    const handleBack = () => {
        if (action) {
            setSearchParams({
                sectionId,
                tab,
                page: pageNumber,
                size: pageSize,
                sectionSubjectId
            })
        } else {
            setSearchParams({
                sectionId,
                tab,
                page: pageNumber,
                size: pageSize
            })
        }
    }

    const handleUpdate = async () => {
        await dispatch(updateSectionSubjectTeacher(sectionSubjectId, { teacherEmpIdOrEmail }))
        await dispatch(getSectionSubjectById(sectionSubjectId))
    }

    useEffect(() => {
        dispatch(getSectionSubjectById(sectionSubjectId))
    }, [sectionSubjectId, dispatch]);

    return (
        <div>
            <div>
                <div className="section-subject-detail-header">
                    <div className="d-flex gap-3">
                        <button
                            className="section-subject-detail-btn"
                            onClick={() => setSearchParams({
                                sectionId,
                                tab,
                                page: pageNumber,
                                size: pageSize,
                                sectionSubjectId,
                                action: "student"
                            })}
                        >
                            Students
                        </button>
                    </div>
                    <button
                        className="section-subject-detail-btn"
                        onClick={handleBack}
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back
                    </button>
                </div>
                {
                    action === "student" ?
                        <div>
                            <Student />
                        </div>
                        :
                        <div>
                            <div className="section-subject-detail-card">
                                <div className="section-subject-detail-contact">
                                    <div>
                                        <i className="bi bi-journal-bookmark-fill me-2"></i>
                                        <h5 className="mb-0">Subject Details :</h5>
                                    </div>
                                    <div>
                                        <i className="bi bi-upc-scan me-2"></i>
                                        <span>Code : {section?.sectionSubject?.subjectResponse?.code} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-book-fill me-2"></i>
                                        <span>Name : {section?.sectionSubject?.subjectResponse?.name} ({section?.sectionSubject?.subjectResponse?.shortName})</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-journal-text me-2"></i>
                                        <span>Type : {section?.sectionSubject?.subjectResponse?.subjectType} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-award-fill me-2"></i>
                                        <span>Credit : {section?.sectionSubject?.subjectResponse?.credit} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-clipboard-data-fill me-2"></i>
                                        <span>Max Marks : {section?.sectionSubject?.subjectResponse?.maxMarks} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        <span>Passing Marks : {section?.sectionSubject?.subjectResponse?.passingMarks} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-card-text me-2"></i>
                                        <span>Description : {section?.sectionSubject?.subjectResponse?.description} </span>

                                    </div>
                                </div>
                            </div>
                            <div className="section-subject-detail-card">
                                <div className="section-subject-detail-contact">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="bi bi-person-workspace me-2"></i>
                                            <h5 className="mb-0">Teacher Details :</h5>
                                        </div>
                                        {
                                            isHod &&
                                            <button
                                                className="edit-icon-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editSectionSubjectModal"
                                                onClick={() => setTeacherEmpIdOrEmail(section?.sectionSubject?.teacherResponse?.employeeId)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        }

                                    </div>
                                    <div>
                                        <i className="bi bi-person-badge-fill me-2"></i>
                                        <span>Employee Id : {section?.sectionSubject?.teacherResponse?.employeeId} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-person-fill me-2 "></i>
                                        <span>Name : {section?.sectionSubject?.teacherResponse?.name} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        <span>Email : {section?.sectionSubject?.teacherResponse?.email} </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        <span>Phone Number : {section?.sectionSubject?.teacherResponse?.phoneNumber} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

            <div class="modal fade" id="editSectionSubjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Edit Class Teacher
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Class Teacher Email or EmployeeId</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='teacherEmpIdOrEmail'
                                        value={teacherEmpIdOrEmail}
                                        onChange={(e) => setTeacherEmpIdOrEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button"
                                class="departments-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleUpdate} type="button"
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

export default SubjectDetails

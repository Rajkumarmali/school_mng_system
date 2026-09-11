import React, { useEffect, useState } from 'react'
import './SectionDetails.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { getSectionById, updateSection } from '../../state/section/Action'
import Students from './student/Students';
import Subject from './subject/Subject'
import Exam from './Exams/Exam'



const SectionDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const activeTab = searchParams.get("tab") || "info"

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [isEditSectionModal, setIsEditSectionModal] = useState(false);
    const [isEditClassTeacherModal, setIssEditClassTeacherModal] = useState(false);

    const [sectionData, setSectionData] = useState({
        name: "",
        academicYear: "",
        semester: "",
        year: "",
        sectionStatus: ""
    })

    const [classTeacherEmailOrEmpId, setClassTeacherEmailOrEmpId] = useState();

    const handleEditClass = () => {
        setIsEditSectionModal(true);
        setIssEditClassTeacherModal(false);
        handleSetSectionData();
    }

    const handleEditClassTeacher = () => {
        setIsEditSectionModal(false);
        setIssEditClassTeacherModal(true);
        setClassTeacherEmailOrEmpId(
            section?.section?.classTeacherResponse?.employeeId || ""
        );
    }

    const handleSetSectionData = () => {
        setSectionData({
            name: section?.section?.name || "",
            academicYear: section?.section?.academicYear || "",
            year: section?.section?.year || "",
            semester: section?.section?.semester || "",
            sectionStatus: section?.section?.sectionStatus || "ACTIVE"
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData({
            ...sectionData,
            [name]: value
        })
    }

    const handleSave = async () => {
        if (isEditSectionModal) {
            await dispatch(updateSection(sectionId, sectionData))
        } else {
            await dispatch(updateSection(sectionId, { employeeEmailOrEmployeeId: classTeacherEmailOrEmpId }))
        }
        await dispatch(getSectionById(sectionId))
    }

    useEffect(() => {
        dispatch(getSectionById(sectionId))
    }, [dispatch, sectionId])

    return (
        <div>
            <nav class="section-nav-card navbar navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ sectionId, tab: "info" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => { setSearchParams({ sectionId, tab: "subject" }) }}
                        >
                            Subject
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => { setSearchParams({ sectionId, tab: "student" }) }}
                        >
                            Student
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => { setSearchParams({ sectionId, tab: "exams" }) }}
                        >
                            Exams
                        </button>
                    </li>
                </ul>
            </nav>
            {
                activeTab === "info" ?
                    <div className="section-card">
                        <div className="section-details-header">
                            <div>
                                <div className="section-details-avatar">
                                    <i className="bi bi-easel2-fill"></i>
                                </div>
                            </div>
                            <div className="section-details-info">
                                <div className="section-details-contact">
                                    <div>
                                        <span><strong>Code : </strong> {section?.section?.code}</span>
                                    </div>
                                    <div>
                                        <span><strong>Name : </strong> {section?.section?.name}</span>
                                    </div>
                                    <div>
                                        <span> <strong>Academic Year : </strong>{section?.section?.academicYear} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Year : </strong>{section?.section?.year} Year</span>
                                    </div>
                                    {
                                        section?.section?.semester &&
                                        <div>
                                            <span> <strong>Semester : </strong>{section?.section?.semester} Sem</span>
                                        </div>
                                    }
                                    <div>
                                        <span> <strong>Status : </strong>{section?.section?.sectionStatus} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Department : </strong>{section?.section?.departmentName} ({section?.section?.departmentCode})</span>
                                        {
                                            isHod &&
                                            <button className="edit-icon-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editSectionModal"
                                                onClick={handleEditClass}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="section-details-info">
                                <div className="section-details-contact">
                                    <div>
                                        <span><strong>Class Teacher Name : </strong> {section?.section?.classTeacherResponse?.firstName} {section?.section?.classTeacherResponse?.lastName}</span>
                                    </div>
                                    <div>
                                        <span> <strong>EmployeeId  : </strong>{section?.section?.classTeacherResponse?.employeeId} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Email : </strong>{section?.section?.classTeacherResponse?.email} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Phone Number : </strong>{section?.section?.classTeacherResponse?.phoneNumber} </span>
                                        {
                                            isHod &&
                                            <button className="edit-icon-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editSectionModal"
                                                onClick={handleEditClassTeacher}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <i className="bi bi-mortarboard-fill"></i>
                                <h3>{section?.section?.totalStudents}</h3>
                                <span>Total Students</span>
                            </div>
                        </div>
                    </div>
                    :
                    activeTab === "subject" ?
                        <div className="section-student-card">
                            <Subject />
                        </div>
                        :
                        activeTab === "exams" ?
                            <div className="section-student-card">
                                <Exam />
                            </div>
                            :
                            <div className="section-student-card">
                                <Students />
                            </div>
            }

            <div class="modal fade" id="editSectionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {
                                    isEditClassTeacherModal ? "Edit Class Teacher"
                                        : "Edit Section"
                                }
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                isEditSectionModal ?
                                    <div className="form-grid">
                                        <div>
                                            <label>Section Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="name"
                                                value={sectionData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Year</label>
                                            <input type="number"
                                                className="modal-input"
                                                name="year"
                                                value={sectionData.year}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Semester</label>
                                            <input type="number"
                                                className="modal-input"
                                                name="semester"
                                                value={sectionData.semester}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Academic Year</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='academicYear'
                                                value={sectionData.academicYear}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="status-group">
                                            <label className="status-title">Section Status</label>
                                            <div className="status-options">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sectionStatus"
                                                        id="active"
                                                        value="ACTIVE"
                                                        checked={sectionData.sectionStatus === "ACTIVE"}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="active">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="sectionStatus"
                                                        id="completed"
                                                        value="COMPLETED"
                                                        checked={sectionData.sectionStatus === "COMPLETED"}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="completed">
                                                        Completed
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="form-grid">
                                        <div>
                                            <label>Class Teacher Email or EmployeeId</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='classTeacherEmailOrEmpId'
                                                value={classTeacherEmailOrEmpId}
                                                onChange={(e) => setClassTeacherEmailOrEmpId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                            }

                        </div>
                        <div class="modal-footer">
                            <button onClick={setSectionData} type="button"
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

export default SectionDetails

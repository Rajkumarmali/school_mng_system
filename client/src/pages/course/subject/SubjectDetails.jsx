import React, { useEffect, useState } from 'react'
import './SubjectDetails.css'
import { useSearchParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { getSubjectById, updateSubject } from '../../../state/subject/Action'

const SubjectDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isSuperAdmin = roles.includes("SUPER_ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const courseId = searchParams.get("courseId")
    const tab = searchParams.get("tab")
    const subjectId = searchParams.get("subjectId")

    const dispatch = useDispatch();
    const subject = useSelector((state) => state.subject)

    const [subjectData, setSubjectData] = useState({
        name: "",
        shortName: "",
        description: "",
        semester: '',
        year: '',
        subjectType: "THEORY",
        credit: "",
        maxMarks: "",
        passingMarks: ""
    })

    const handleBack = () => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber,
            size: pageSize,
        })
    }

    const handleSetData = () => {
        setSubjectData({
            name: subject?.subject?.name || "",
            shortName: subject?.subject?.shortName || "",
            description: subject?.subject?.description || "",
            semester: subject?.subject?.semester || '',
            year: subject?.subject?.year || '',
            subjectType: subject?.subject?.subjectType || "THEORY",
            credit: subject?.subject?.credit || "",
            maxMarks: subject?.subject?.maxMarks || "",
            passingMarks: subject?.subject?.passingMarks || "0"
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({
            ...subjectData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(updateSubject(subjectId, subjectData))
        await dispatch(getSubjectById(subjectId))
    }

    useEffect(() => {
        dispatch(getSubjectById(subjectId))
    }, [dispatch, subjectId]);

    return (
        <div>
            <div>
                <div className="subject-detail-header">
                    <div>
                        <h2>{subject.subject?.name} ({subject.subject?.shortName})</h2>
                        <p>Subject Code : {subject.subject?.code}</p>
                    </div>
                    <button className="add-subject-btn"
                        onClick={handleBack}>
                        <i className="bi bi-arrow-left"></i>
                        Back
                    </button>
                </div>
                <div className="subject-info">
                    <div className="section-header">
                        <h4>Subject Details : </h4>
                        {
                            isSuperAdmin &&
                            <button className="edit-icon-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#editSubjectModal"
                                onClick={handleSetData}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        }

                    </div>
                    <div className="info-grid">
                        <div>
                            <strong>Name : </strong>{subject?.subject?.name} ({subject?.subject?.shortName})
                        </div>
                        <div>
                            <strong>Subject Type : </strong>{subject?.subject?.subjectType}
                        </div>
                        <div>
                            <strong>Year : </strong>{subject?.subject?.year}
                        </div>
                        <div>
                            <strong>Semester : </strong>{subject?.subject?.semester}
                        </div>
                        <div>
                            <strong>Max Marks : </strong>{subject?.subject?.maxMarks}
                        </div>
                        <div>
                            <strong>Passing Marks : </strong>{subject?.subject?.passingMarks}
                        </div>
                        <div>
                            <strong>credit : </strong>{subject?.subject?.credit}
                        </div>
                    </div>
                    <div>
                        <strong>Description : </strong>{subject?.subject?.description}
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editSubjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Subject</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={subjectData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Short Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='shortName'
                                        value={subjectData.shortName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <input type="email"
                                        className="modal-input"
                                        name='description'
                                        value={subjectData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='year'
                                        value={subjectData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Semester</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='semester'
                                        value={subjectData.semester}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Credit</label>
                                    <input
                                        className="modal-input"
                                        name='credit'
                                        value={subjectData.credit}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Max Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='maxMarks'
                                        value={subjectData.maxMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Passing Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='passingMarks'
                                        value={subjectData.passingMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Subject Type</label>
                                    <select
                                        className="modal-input"
                                        name='subjectType'
                                        value={subjectData.subjectType}
                                        onChange={handleChange}
                                    >
                                        <option value="THEORY">Theory</option>
                                        <option value="PRACTICAL">Practical</option>
                                        <option value="ELECTIVE">Elective</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="student-modal-btn" data-bs-dismiss="modal"
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

import React, { useEffect, useState } from 'react'
import './DepartmentDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentById, updateDepartment } from '../../state/department/Action';
import { useParams, useSearchParams } from 'react-router-dom';
import DepartmentsTeachers from './DepartmentsTeachers';
import DepartmentsStudents from './DepartmentsStudents';
import DepartmentsClasses from './DepartmentsClasses';
const DepartmentDetails = () => {

    const { departmentId } = useParams();

    const department = useSelector((state) => state.department)
    var dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "info";

    const [departmentDetails, setDepartmentDetails] = useState({
        name: "",
        description: "",
        hodTeacherEmailOrEmplId: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDepartmentDetails({
            ...departmentDetails,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(updateDepartment(departmentId, departmentDetails))
        await dispatch(getDepartmentById(departmentId))
    }

    const setData = () => {
        setDepartmentDetails({
            name: department?.department?.name || "",
            description: department?.department?.description || "",
            hodTeacherEmailOrEmplId: department?.department?.employeeId || ""
        })
    }

    useEffect(() => {
        dispatch(getDepartmentById(departmentId))
    }, [dispatch, departmentId]);


    return (
        <div className="department-container">
            <nav class="department-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "info" })}
                        >
                            Department Info
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "teacher" })}
                        >
                            Teacher
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "student" })}
                        >
                            Students
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "class" })}
                        >
                            Classes
                        </button>
                    </li>
                </ul>
            </nav>

            {
                activeTab === "info" ?
                    <div className="department-card">
                        <div className="department-header">
                            <div className="department-logo">
                                <i className="bi bi-diagram-3-fill"></i>
                            </div>
                            <div>
                                <h2>{department?.department?.name}</h2>
                                <p>{department?.department?.description}</p>
                                <div className="section-header">
                                    <p>Code : {department?.department?.code}</p>
                                    <button className="edit-icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={setData}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button></div>
                            </div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <i className="bi bi-person-workspace"></i>
                                <h3>{department?.department?.totalTeacher}</h3>
                                <span>Total Teachers</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-mortarboard-fill"></i>
                                <h3>{department?.department?.totalStudent}</h3>
                                <span>Total Students</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-easel2-fill"></i>
                                <h3>{department?.department?.totalClass}</h3>
                                <span>Total Class</span>
                            </div>
                        </div>
                        <div className="department-profile-body">
                            <div className="simple-section">
                                <h5>Department Hod :</h5>
                                <div className="department-info-line">
                                    <span><strong>EmployeeId :</strong>{department?.department?.employeeId}</span>
                                    <span><strong>Name :</strong> {department?.department?.hodName}</span>
                                    <span><strong>Email :</strong> {department?.department?.hodEmail}</span>
                                    <span><strong>Phone :</strong> {department?.department?.hodPhoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    activeTab === "teacher" ?
                        <div className="department-card">
                            <DepartmentsTeachers departmentId={departmentId} />
                        </div>
                        :
                        activeTab === "student" ?
                            <div className="department-card">
                                <DepartmentsStudents departmentId={departmentId} />
                            </div>
                            :
                            <div className="department-card">
                                <DepartmentsClasses departmentId={departmentId} />
                            </div>
            }



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Department</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Department Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={departmentDetails.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Department Description</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="description"
                                        value={departmentDetails.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Hod Email or EmployeeId</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='hodTeacherEmailOrEmplId'
                                        value={departmentDetails.hodTeacherEmailOrEmplId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={setData} type="button"
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

export default DepartmentDetails

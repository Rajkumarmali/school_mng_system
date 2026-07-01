import React, { useEffect, useState } from 'react'
import './DepartmentDetails.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentById, updateDepartment } from '../../state/department/Action';
const DepartmentDetails = () => {

    const loaction = useLocation();
    const departmentId = loaction.state?.departmentId;

    const department = useSelector((state) => state.department)
    const dispatch = useDispatch();

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
                        <i className="bi bi-mortarboard-fill"></i>
                        <h3>1000</h3>
                        <span>Total Students</span>
                    </div>
                    <div className="stat-card">
                        <i className="bi bi-person-workspace"></i>
                        <h3>1000</h3>
                        <span>Total Teachers</span>
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

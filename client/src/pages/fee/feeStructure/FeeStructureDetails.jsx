import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './FeeStructureDetatils.css'
import { useDispatch, useSelector } from 'react-redux';
import { assignFeeStructureToStudent, getFeeStructureById, updateFeeStructure } from '../../../state/fee/Action';
import FeeStudents from './student/FeeStudents';
import { jwtDecode } from 'jwt-decode';


const FeeStructureDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const feeStructureId = searchParams.get("id");
    const studentStatus = searchParams.get("studentStatus")

    const dispatch = useDispatch()
    const fee = useSelector((state) => state.fee)

    const [feeStructureData, setFeeStruuctureData] = useState({
        amount: 0,
        academicYear: "",
        description: "",
        feeStructureStatus: "",
        dueDate: "",
    })

    const [feeStructureStudentData, setFeeStructureStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeStruuctureData({
            ...feeStructureData,
            [name]: value
        })
    }

    const handleSetData = () => {
        setFeeStruuctureData({
            amount: fee?.feeStructure?.amount || 0,
            academicYear: fee?.feeStructure?.academicYear || "",
            description: fee?.feeStructure?.description || "",
            feeStructureStatus: fee?.feeStructure?.status || "ACTIVE",
            dueDate: fee?.feeStructure?.dueDate
                ? fee.feeStructure.dueDate.split("T")[0]
                : ""
        })
    }

    const handleSave = async () => {
        const payload = {
            ...feeStructureData,
            dueDate: feeStructureData.dueDate
                ? new Date(feeStructureData.dueDate).toISOString()
                : null
        };
        await dispatch(updateFeeStructure(feeStructureId, payload))
        await dispatch(getFeeStructureById(feeStructureId))
    }

    const handleBack = () => {
        setSearchParams({
            tab: "fee-structure"
        })
    }

    const handleView = (status) => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus: status
        })
    }


    const handleAddFeeStructureStudentChange = (index, e) => {
        const { name, value } = e.target;
        const updateStudent = [...feeStructureStudentData];
        updateStudent[index] = {
            ...updateStudent[index],
            [name]: value
        }
        setFeeStructureStudentData(updateStudent)
    }

    const handleAddFeeStructureStudentRow = () => {
        setFeeStructureStudentData([
            ...feeStructureStudentData,
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleRemoveFeeStructureStudent = (index) => {
        if (feeStructureStudentData.length === 1) return;
        const updatedStudents = feeStructureStudentData.filter((_, i) => i !== index);
        setFeeStructureStudentData(updatedStudents);
    }

    const saveAddFeeStructureStudentData = async () => {
        await dispatch(assignFeeStructureToStudent(feeStructureId, feeStructureStudentData));
        await dispatch(getFeeStructureById(feeStructureId))
        setFeeStructureStudentData([
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    useEffect(() => {
        dispatch(getFeeStructureById(feeStructureId))
    }, [dispatch, feeStructureId]);

    return (
        <div>
            {
                !studentStatus ?
                    <div>
                        <div className="fee-structure-detail-header">
                            <div>
                                {
                                    isAccountant &&
                                    <button
                                        className="back-fee-structure-detail-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#studentModal"
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Add Student
                                    </button>
                                }

                            </div>

                            <button
                                className="back-fee-structure-detail-btn"
                                onClick={handleBack}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Back
                            </button>
                        </div>
                        <div className="fee-structure-details-info">
                            <div className="fee-structure-details-contact">
                                <div>
                                    <i className="bi bi-cash-stack"></i>
                                    <span> <strong>Fee Type :  </strong>{fee?.feeStructure?.feeTypeName}</span>
                                </div>
                                <div>
                                    <i className="bi bi-currency-rupee"></i>
                                    <span> <strong>Amount :  </strong>₹ {fee?.feeStructure?.amount}</span>
                                </div>
                                <div>
                                    <i className="bi bi-calendar-event-fill"></i>
                                    <span> <strong>Due Date :  </strong>{
                                        fee?.feeStructure?.dueDate &&
                                        new Date(fee?.feeStructure?.dueDate).toLocaleDateString("en-GB").replace(/\//g, "-")
                                    }</span>
                                </div>
                                <div>
                                    <i className="bi bi-info-circle-fill"></i>
                                    <span> <strong>Status :  </strong>{fee?.feeStructure?.status}</span>
                                </div>
                                <div>
                                    <i className="bi bi-info-circle-fill"></i>
                                    <span> <strong>Apply Scholarship :  </strong>{fee?.feeStructure?.applyScholarship ? "Yes" : "No"}</span>
                                </div>
                            </div>
                            <div className="fee-structure-details-contact">
                                <div>
                                    <i className="bi bi-calendar-event"></i>
                                    <span><strong>Academic Year : </strong>{fee?.feeStructure?.academicYear}</span>
                                </div>
                                <div>
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <span>
                                        <strong>Section : </strong>
                                        {fee?.feeStructure?.sectionName ? `${fee?.feeStructure?.sectionName} (${fee?.feeStructure?.sectionCode})` : ""}
                                    </span>
                                </div>
                                <div>
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <span>
                                        <strong>Department : </strong>
                                        {fee?.feeStructure?.departmentName ? `${fee?.feeStructure?.departmentName} (${fee?.feeStructure?.departmentCode})` : ''}
                                    </span>
                                </div>
                                <div>
                                    <i className="bi bi-card-text"></i>
                                    <span><strong>Description :</strong> {fee?.feeStructure?.description}</span>
                                    <button className="edit-icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editFeeStructureModal"
                                        onClick={handleSetData}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <i className="bi bi-wallet2"></i>
                                <h3>{fee?.feeStructure?.totalCollectionAmount}</h3>
                                <span>Total Collection Amount</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-cash-coin"></i>
                                <h3>{fee?.feeStructure?.totalCollectedAmount}</h3>
                                <span>Total Collected Amount</span>
                            </div>
                            <div className="stat-card">
                                <i className="bi bi-hourglass-split"></i>
                                <h3>{fee?.feeStructure?.totalPendingAmount}</h3>
                                <span>Total Pending Amount</span>
                            </div>
                            <div className="stat-card">
                                <button
                                    className="stat-view-btn"
                                    onClick={() => handleView("all")}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                                <i className="bi bi-mortarboard-fill"></i>
                                <h3>{fee?.feeStructure?.totalStudent}</h3>
                                <span>Total Students</span>
                            </div>
                            <div className="stat-card">
                                <button
                                    className="stat-view-btn"
                                    onClick={() => handleView("paid")}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                                <i className="bi bi-patch-check-fill"></i>
                                <h3>{fee?.feeStructure?.totalPaidStudent}</h3>
                                <span>Total Paid Student</span>
                            </div>
                            <div className="stat-card">
                                <button
                                    className="stat-view-btn"
                                    onClick={() => handleView("unpaid")}
                                >
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                                <i className="bi bi-clock-history"></i>
                                <h3>{fee?.feeStructure?.totalUnPaidStudent}</h3>
                                <span>Total Unpaid Student</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <FeeStudents />
                    </div>
            }

            <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Add Students
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table className="table class-student-modal-table">
                                <thead>
                                    <tr>
                                        <th>SNo.</th>
                                        <th>Registration Number</th>
                                        <th>Frist Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        feeStructureStudentData.map((student, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="registrationNumber"
                                                        value={student.registrationNumber}
                                                        onChange={(e) => handleAddFeeStructureStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="firstName"
                                                        value={student.firstName}
                                                        onChange={(e) => handleAddFeeStructureStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="lastName"
                                                        value={student.lastName}
                                                        onChange={(e) => handleAddFeeStructureStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="modal-input"
                                                        name="email"
                                                        value={student.email}
                                                        onChange={(e) => handleAddFeeStructureStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="phoneNumber"
                                                        value={student.phoneNumber}
                                                        onChange={(e) => handleAddFeeStructureStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm custom-action-btn me-2"
                                                        disabled={feeStructureStudentData.length === 1}
                                                        onClick={() => handleRemoveFeeStructureStudent(index)}
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button
                                type="button"
                                className="departments-modal-btn"
                                onClick={handleAddFeeStructureStudentRow}
                            >
                                + Add Another Student
                            </button>
                            <div>
                                <button
                                    type="button"
                                    class="departments-modal-btn"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={saveAddFeeStructureStudentData}
                                    type="button"
                                    class="departments-modal-btn" data-bs-dismiss="modal"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editFeeStructureModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Fee Structure</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Amount</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='amount'
                                        value={feeStructureData.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Academic Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='academicYear'
                                        value={feeStructureData.academicYear}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Descriptioin</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='description'
                                        value={feeStructureData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Status</label>
                                    <select type="text"
                                        className="modal-input"
                                        name='feeStructureStatus'
                                        value={feeStructureData.feeStructureStatus}
                                        onChange={handleChange}
                                    >
                                        <option>ACTIVE</option>
                                        <option>INACTIVE</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Due Date</label>
                                    <input
                                        type='date'
                                        className="modal-input"
                                        name='dueDate'
                                        value={feeStructureData.dueDate}
                                        onChange={handleChange}
                                    />
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

export default FeeStructureDetails

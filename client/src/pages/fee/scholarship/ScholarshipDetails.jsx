import React, { useEffect, useState } from 'react'
import './ScholarshipDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { assignScholarshipToStudents, getScholarshipById, removeStudentFromScholarship, updateScholarship } from '../../../state/scholarship/Action';
import { jwtDecode } from 'jwt-decode';

const ScholarshipDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const page = searchParams.get("page")
    const size = searchParams.get("size")
    const scholarshipId = searchParams.get("scholarshipId")

    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
    })

    const [scholarshipData, setScholarshipData] = useState({
        name: "",
        description: "",
        status: "",
        scholarshipPercent: ""
    })

    const [scholarshipStudentData, setScholarshipStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])

    const dispatch = useDispatch();
    const scholarship = useSelector((state) => state.scholarship)

    const handleBack = () => {
        setSearchParams({
            tab,
            page,
            size
        })
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target
        setScholarshipData({
            ...scholarshipData,
            [name]: value
        })
    }

    const handleSetScholarshipData = () => {
        setScholarshipData({
            name: scholarship?.scholarship?.scholarshipResponse?.name || "",
            description: scholarship?.scholarship?.scholarshipResponse?.description || "",
            status: scholarship?.scholarship?.scholarshipResponse?.status || "",
            scholarshipPercent: scholarship?.scholarship?.scholarshipResponse?.scholarshipPercent || ""
        })
    }

    const handleAddScholarshipStudentChange = (index, e) => {
        const { name, value } = e.target;
        const updateStudent = [...scholarshipStudentData];
        updateStudent[index] = {
            ...updateStudent[index],
            [name]: value
        }
        setScholarshipStudentData(updateStudent)
    }

    const handleAddScholarshipStudentRow = () => {
        setScholarshipStudentData([
            ...scholarshipStudentData,
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleRemoveScholarshipStudent = (index) => {
        if (scholarshipStudentData.length === 1) return;
        const updatedStudents = scholarshipStudentData.filter((_, i) => i !== index);
        setScholarshipStudentData(updatedStudents);
    }

    const handleSaveAddScholarshipStudent = async () => {
        await dispatch(assignScholarshipToStudents(scholarshipId, scholarshipStudentData))
        await dispatch(getScholarshipById(scholarshipId, pagination.pageNumber, pagination.pageSize))
        setScholarshipStudentData([
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleEditSave = async () => {
        await dispatch(updateScholarship(scholarshipId, scholarshipData))
        await dispatch(getScholarshipById(scholarshipId, pagination.pageNumber, pagination.pageSize))
    }

    const handleRemoveStudentFromScholarship = async (studentId) => {
        await dispatch(removeStudentFromScholarship(scholarshipId, studentId));
        await dispatch(getScholarshipById(scholarshipId, pagination.pageNumber, pagination.pageSize))
    }



    const totalPages = scholarship?.scholarship?.studentResponses?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pagination.pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pagination.pageNumber - 1);
                i <= Math.min(totalPages - 1, pagination.pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pagination.pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setPagination({
            pageNumber: 1,
            pageSize: pageSize,
        })
    }

    const handleGetPerviousPageData = () => {
        setPagination({
            pageNumber: pagination.pageNumber - 1,
            pageSize: pagination.pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setPagination({
            pageNumber: pagination.pageNumber + 1,
            pageSize: pagination.pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setPagination({
            pageNumber: pageNumber,
            pageSize: pagination.pageSize,
        })
    }

    useEffect(() => {
        dispatch(getScholarshipById(scholarshipId, pagination.pageNumber, pagination.pageSize))
    }, [dispatch, scholarshipId, pagination]);

    return (
        <div>
            <div>
                <div className="scholarship-detail-header">
                    <div>
                        {
                            isAccountant &&
                            <button
                                className="back-scholarship-detail-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#scholarshipStudentModal"
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add Student
                            </button>
                        }

                    </div>

                    <button
                        className="back-scholarship-detail-btn"
                        onClick={handleBack}
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back
                    </button>
                </div>
                <div className="scholarship-card">
                    <div className="scholarship-detail-header">
                        <div className="scholarship-detail-info">
                            <div className="scholarship-detail-contact">
                                <div>
                                    <i className="bi bi-upc-scan me-2"></i>
                                    <span>Code : {scholarship?.scholarship?.scholarshipResponse?.code}</span>
                                </div>
                                <div>
                                    <i className="bi bi-award-fill me-2"></i>
                                    <span>Name : {scholarship?.scholarship?.scholarshipResponse?.name}</span>
                                </div>
                                <div>
                                    <i className="bi bi-percent me-2"></i>
                                    <span>Scholarship Percent : {scholarship?.scholarship?.scholarshipResponse?.scholarshipPercent}%</span>
                                </div>
                                <div>
                                    <i
                                        className={`bi ${scholarship?.scholarship?.scholarshipResponse?.status === "ACTIVE"
                                            ? "bi-patch-check-fill text-success"
                                            : "bi-pause-circle-fill text-danger"
                                            } me-2`}
                                    >

                                    </i>
                                    <span>Status : {scholarship?.scholarship?.scholarshipResponse?.status}</span>
                                </div>
                                <div>
                                    <i className="bi bi-card-text me-2"></i>
                                    <span>Description : {scholarship?.scholarship?.scholarshipResponse?.description}</span>
                                    {
                                        isAccountant &&
                                        <button className="edit-icon-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editScholarshipModal"
                                            onClick={handleSetScholarshipData}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-card">
                    <table className="table students-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Registration No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                {
                                    isAccountant &&
                                    <td className='text-center'>Action</td>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                scholarship?.scholarship?.studentResponses?.content?.length > 0 ?
                                    scholarship?.scholarship?.studentResponses?.content?.map((student, index) =>
                                        <tr>
                                            <td>{(pagination.pageNumber - 1) * pagination.pageSize + index + 1}.</td>
                                            <td>{student.registrationNumber}</td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phoneNumber}</td>
                                            {
                                                isAccountant &&
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => handleRemoveStudentFromScholarship(student.id)}
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            }
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan="10" className="text-center">
                                            No Student Found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Total : <strong>{scholarship?.scholarship?.studentResponses?.totalElements || 0}</strong>
                        </div>
                        <div className="page-size-selector">
                            <label>Show :</label>
                            <select
                                value={pagination.pageSize}
                                onChange={handleChangePageSize}
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <ul className="custom-pagination">
                            <li>
                                <button
                                    onClick={handleGetPerviousPageData}
                                    disabled={pagination.pageNumber === 1}
                                >
                                    &laquo;
                                </button>
                            </li>
                            {getPageNumbers().map((page, index) =>
                                page === "..." ? (
                                    <li key={index} className="dots">
                                        ...
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <button
                                            className={pagination.pageNumber === page ? "active-page" : ""}
                                            onClick={() => handleGetPageNumberData(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                )
                            )}
                            <li>
                                <button
                                    onClick={handleGetNextPageData}
                                    disabled={pagination.pageNumber === totalPages}
                                >
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editScholarshipModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Scholarship</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='mt-2'>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='name'
                                        value={scholarshipData.name}
                                        onChange={handleChangeEdit}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='description'
                                        value={scholarshipData.description}
                                        onChange={handleChangeEdit}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Scholarship Percent</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='scholarshipPercent'
                                        value={scholarshipData.scholarshipPercent}
                                        onChange={handleChangeEdit}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Status</label>
                                    <select type="number"
                                        className="modal-input"
                                        name='status'
                                        value={scholarshipData.status}
                                        onChange={handleChangeEdit}
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">InActive</option>
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
                            <button type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                                onClick={handleEditSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="scholarshipStudentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        scholarshipStudentData.map((student, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="registrationNumber"
                                                        value={student.registrationNumber}
                                                        onChange={(e) => handleAddScholarshipStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="firstName"
                                                        value={student.firstName}
                                                        onChange={(e) => handleAddScholarshipStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="lastName"
                                                        value={student.lastName}
                                                        onChange={(e) => handleAddScholarshipStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="modal-input"
                                                        name="email"
                                                        value={student.email}
                                                        onChange={(e) => handleAddScholarshipStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="phoneNumber"
                                                        value={student.phoneNumber}
                                                        onChange={(e) => handleAddScholarshipStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm custom-action-btn me-2"
                                                        disabled={scholarshipStudentData.length === 1}
                                                        onClick={() => handleRemoveScholarshipStudent(index)}
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
                                onClick={handleAddScholarshipStudentRow}
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
                                    onClick={handleSaveAddScholarshipStudent}
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

        </div>
    )
}

export default ScholarshipDetails

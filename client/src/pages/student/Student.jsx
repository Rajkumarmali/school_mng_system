import React, { useEffect, useRef, useState } from 'react'
import './Student.css'

import { useDispatch, useSelector } from 'react-redux'
import { createStudent, deleteStudent, getAllStudent } from '../../state/student/Action';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Student = () => {

    const dispatch = useDispatch();
    const student = useSelector((state) => state.student)
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const [studentData, setStudentData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        gender: "MALE",
        cast: "GENERAL",
        aadharNumber: "",
        addressRequest: {
            address: "",
            city: "",
            district: "",
            state: "",
            country: "",
            pincode: ""
        },
        parentRequest: {
            fatherName: "",
            fatherNumber: "",
            fatherOccupation: "",
            motherName: "",
            motherNumber: "",
            motherOccupation: ""
        }
    })

    const navigate = useNavigate();

    const handleDelete = async (studentId) => {
        await dispatch(deleteStudent(studentId))
        await dispatch(getAllStudent(pageNumber, pageSize));
    }

    const handleViewProfile = (studentId) => {
        navigate('/student/profile', {
            state: { studentId }
        })
    }

    const clearData = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setStudentData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            dob: "",
            gender: "MALE",
            cast: "GENERAL",
            aadharNumber: "",
            addressRequest: {
                address: "",
                city: "",
                district: "",
                state: "",
                country: "",
                pincode: ""
            },
            parentRequest: {
                fatherName: "",
                fatherNumber: "",
                fatherOccupation: "",
                motherName: "",
                motherNumber: "",
                motherOccupation: ""
            }
        })
    }

    const totalPages = student?.students?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pageNumber - 1);
                i <= Math.min(totalPages - 1, pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setSearchParams({
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

    const handlStudentChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value
        })
    }

    const handleParentChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            parentRequest: {
                ...studentData.parentRequest,
                [name]: value
            }
        })
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            addressRequest: {
                ...studentData.addressRequest,
                [name]: value
            }
        })
    }

    const handleSave = async () => {
        await dispatch(createStudent(studentData, image));
        await dispatch(getAllStudent(pageNumber, pageSize));
        clearData();
    }

    useEffect(() => {
        dispatch(getAllStudent(pageNumber, pageSize));
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className='students-container'>
            <div className="students-header">
                <div>
                    <h2>Students Management</h2>
                </div>
                <button className="add-students-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Student
                </button>
            </div>
            <div className="students-card">
                <table className="table students-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Registration No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            student?.students?.content?.length > 0 ?
                                (
                                    student?.students?.content?.map((student, index) =>
                                        <tr kay={student.id}>
                                            <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                            <td>{student.registrationNumber}</td>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>{student.phoneNumber}</td>
                                            <td>{student.email}</td>
                                            <td>{student.gender}</td>
                                            <td className='text-center'>
                                                <button
                                                    className="btn btn-sm custom-reset-btn me-2"
                                                    onClick={() => handleViewProfile(student.id)}
                                                >
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm custom-reset-btn me-2"
                                                    onClick={() => handleDelete(student.id)}
                                                >
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                                : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No Student Found
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{student?.students?.totalElements || 0}</strong>
                    </div>
                    <div className="page-size-selector">
                        <label>Show :</label>
                        <select
                            value={pageSize}
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
                                disabled={pageNumber === 1}
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
                                        className={pageNumber === page ? "active-page" : ""}
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
                                disabled={pageNumber === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Student</h1>
                            <button onClick={clearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h6 className="form-section-title">Personal Information</h6>
                            <div className="form-grid">
                                <div>
                                    <label>First Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="firstName"
                                        value={studentData.firstName}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='lastName'
                                        value={studentData.lastName}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="email"
                                        className="modal-input"
                                        name='email'
                                        value={studentData.email}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Phone Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='phoneNumber'
                                        value={studentData.phoneNumber}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Date of Birth</label>
                                    <input type="date"
                                        className="modal-input"
                                        name='dob'
                                        value={studentData.dob}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select
                                        className="modal-input"
                                        name='gender'
                                        value={studentData.gender}
                                        onChange={handlStudentChange}
                                    >
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                        <option>OTHER</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Cast</label>
                                    <select
                                        className="modal-input"
                                        name='cast'
                                        value={studentData.cast}
                                        onChange={handlStudentChange}
                                    >
                                        <option>GENERAL</option>
                                        <option>OBC</option>
                                        <option>SC</option>
                                        <option>ST</option>
                                        <option>OTHER</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Aadhar Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='aadharNumber'
                                        value={studentData.aadharNumber}
                                        onChange={handlStudentChange}
                                    />
                                </div>
                                <div>
                                    <label>Upload Image</label>
                                    <input type='file'
                                        ref={fileInputRef}
                                        accept='image/*'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <h6 className="form-section-title mt-4">
                                Parent Information
                            </h6>
                            <div className="form-grid">
                                <div>
                                    <label>Father Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='fatherName'
                                        value={studentData.parentRequest.fatherName}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Father Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='fatherNumber'
                                        value={studentData.parentRequest.fatherNumber}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Father Occupation</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='fatherOccupation'
                                        value={studentData.parentRequest.fatherOccupation}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Mother Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='motherName'
                                        value={studentData.parentRequest.motherName}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Mother Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='motherNumber'
                                        value={studentData.parentRequest.motherNumber}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Mother Occupation</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='motherOccupation'
                                        value={studentData.parentRequest.motherOccupation}
                                        onChange={handleParentChange}
                                    />
                                </div>
                            </div>
                            <h6 className="form-section-title mt-4">
                                Address Information
                            </h6>
                            <div className="form-grid">
                                <div>
                                    <label>Address</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='address'
                                        value={studentData.addressRequest.address}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='city'
                                        value={studentData.addressRequest.city}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>District</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='district'
                                        value={studentData.addressRequest.district}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>State</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='state'
                                        value={studentData.addressRequest.state}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='country'
                                        value={studentData.addressRequest.country}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>Pincode</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='pincode'
                                        value={studentData.addressRequest.pincode}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={clearData} type="button"
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

export default Student

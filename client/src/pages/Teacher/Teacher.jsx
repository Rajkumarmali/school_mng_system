import React, { useEffect, useState } from 'react'
import './Teacher.css'
import { useDispatch, useSelector } from 'react-redux'
import { createTeacher, deleteTeacher, getAllTeacher } from '../../state/teacher/Action';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Teacher = () => {

    const dispatch = useDispatch();
    const teacher = useSelector((state) => state.teacher);
    const navigate = useNavigate();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [image, setImage] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10

    const [teacherData, setTeacherData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: '',
            gender: 'MALE',
            cast: 'GENERAL',
            aadharNumber: '',
            panNumber: '',
            parentRequest: {
                fatherName: '',
                motherName: '',
            },
            addressRequest: {
                address: '',
                city: '',
                district: '',
                state: '',
                country: '',
                pincode: ''
            }
        }
    );

    const totalPages = teacher?.teachers?.totalPages || 0;
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

    const handlePersonChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({
            ...teacherData,
            [name]: value
        })
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({
            ...teacherData,
            addressRequest: {
                ...teacherData.addressRequest,
                [name]: value
            }
        })
    }

    const handleParentChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({
            ...teacherData,
            parentRequest: {
                ...teacherData.parentRequest,
                [name]: value
            }
        })
    }

    const handleCancel = () => {
        setIsOpenModal(false)
        clearTeacherData();

    }
    const handleSubmit = async () => {
        await dispatch(createTeacher(teacherData, image))
        await dispatch(getAllTeacher(pageNumber, pageSize))
        setIsOpenModal(false);
        clearTeacherData();
    }

    const clearTeacherData = () => {
        setTeacherData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: '',
            gender: 'MALE',
            cast: 'GENERAL',
            aadharNumber: '',
            panNumber: '',
            parentRequest: {
                fatherName: '',
                motherName: '',
            },
            addressRequest: {
                address: '',
                city: '',
                district: '',
                state: '',
                country: '',
                pincode: ''
            }
        })
    }

    const handleDelete = async (teacherId) => {
        await dispatch(deleteTeacher(teacherId))
        await dispatch(getAllTeacher(pageNumber, pageSize))
    }

    const handleViewProfile = (teacherId) => {
        navigate('/teacher/profile', {
            state: { teacherId }
        })
    }

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

    useEffect(() => {
        dispatch(getAllTeacher(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className='teachers-container'>
            {
                !isOpenModal ?
                    <div>
                        <div className="teachers-header">
                            <div>
                                <h2>Teachers Management</h2>
                            </div>
                            <div className="header-actions">
                                {/* <button
                                    className="export-excel-btn"
                                >
                                    <i className="bi bi-file-earmark-excel-fill me-2"></i>
                                    Export Excel
                                </button> */}
                                <button className="add-teachers-btn" onClick={() => setIsOpenModal(true)}>
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add New Teacher
                                </button>
                            </div>
                        </div>
                        <div className="teachers-card">
                            <table className="table users-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>EmployeeId</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th>PhoneNo</th>
                                        <th>Gender</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacher?.teachers?.content?.length > 0 ?
                                        (
                                            teacher?.teachers?.content?.map((teacher, index) =>
                                                <tr key={teacher.id}>
                                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{teacher.employeeId}</td>
                                                    <td>{teacher.firstName}</td>
                                                    <td>{teacher.lastName}</td>
                                                    <td>{teacher.email}</td>
                                                    <td>{teacher.phoneNumber}</td>
                                                    <td>{teacher.gender}</td>
                                                    <td className='text-center'>
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            onClick={() => handleViewProfile(teacher.id)}
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                        </button>
                                                        <button onClick={() => handleDelete(teacher.id)}
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                        >
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                        :
                                        (
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    No Teacher Found
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Total : <strong>{teacher?.teachers?.totalElements || 0}</strong>
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
                    </div>
                    :
                    <div className="teachers-card">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Teacher</h5>
                            <button onClick={handleCancel} type="button" className="btn-close"></button>
                        </div>
                        <div className="teacher-form">
                            <h6 className="form-section-title">Personal Information</h6>
                            <div className="form-grid">
                                <div>
                                    <label>First Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="firstName"
                                        value={teacherData.firstName}
                                        onChange={handlePersonChange} />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='lastName'
                                        value={teacherData.lastName}
                                        onChange={handlePersonChange}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="email"
                                        className="modal-input"
                                        name='email'
                                        value={teacherData.email}
                                        onChange={handlePersonChange}

                                    />
                                </div>
                                <div>
                                    <label>Phone Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='phoneNumber'
                                        value={teacherData.phoneNumber}
                                        onChange={handlePersonChange}
                                    />
                                </div>
                                <div>
                                    <label>Date of Birth</label>
                                    <input type="date"
                                        className="modal-input"
                                        name='dob'
                                        value={teacherData.dob}
                                        onChange={handlePersonChange}

                                    />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select
                                        className="modal-input"
                                        name='gender'
                                        value={teacherData.gender}
                                        onChange={handlePersonChange}
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
                                        value={teacherData.cast}
                                        onChange={handlePersonChange}
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
                                        value={teacherData.aadharNumber}
                                        onChange={handlePersonChange}

                                    />
                                </div>
                                <div>
                                    <label>PAN Number</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='panNumber'
                                        value={teacherData.panNumber}
                                        onChange={handlePersonChange} />
                                </div>
                                <div>
                                    <label>Upload Image</label>
                                    <input
                                        type='file'
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
                                        value={teacherData.parentRequest.fatherName}
                                        onChange={handleParentChange}
                                    />
                                </div>
                                <div>
                                    <label>Mother Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='motherName'
                                        value={teacherData.parentRequest.motherName}
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
                                        value={teacherData.addressRequest.address}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='city'
                                        value={teacherData.addressRequest.city}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>District</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='district'
                                        value={teacherData.addressRequest.district}
                                        onChange={handleAddressChange} />
                                </div>
                                <div>
                                    <label>State</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='state'
                                        value={teacherData.addressRequest.state}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='country'
                                        value={teacherData.addressRequest.country}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label>Pincode</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='pincode'
                                        value={teacherData.addressRequest.pincode}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <button onClick={handleCancel} type="button" className="teacher-modal-btn">
                                    Cancel
                                </button>
                                <button onClick={handleSubmit} className="teacher-modal-btn">
                                    Save Teacher
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

export default Teacher

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './StudentProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentById, updateStudent, updateStudentImage } from '../../state/student/Action'


const StudentProfile = () => {

    const location = useLocation()
    const studentId = location.state?.studentId

    const student = useSelector((state) => state.student)
    const dispatch = useDispatch();

    const [isEditPersonModal, setIsEditPersonModal] = useState(false);
    const [isEditAddress, setIsEditAddressModal] = useState(false);
    const [isEditParentModal, setIsEditParentModal] = useState(false);
    const [isEditImageModal, setIsEditImageModal] = useState(false);
    const [isEditDepartmentModal, setIsEditDepartmentModal] = useState(false);
    const [image, setImage] = useState(null);
    const [departmentCode, setDepartmentCode] = useState(null);

    const [studentData, setStudentData] = useState(
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

    const handleEditPerson = () => {
        setIsEditPersonModal(true);
        setIsEditAddressModal(false);
        setIsEditParentModal(false);
        setIsEditImageModal(false);
        setIsEditDepartmentModal(false);
        handleSetData();
    }

    const handleEditAddress = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(true);
        setIsEditParentModal(false);
        setIsEditImageModal(false);
        setIsEditDepartmentModal(false);
        handleSetData();
    }


    const handleEditParent = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(false);
        setIsEditParentModal(true);
        setIsEditImageModal(false);
        setIsEditDepartmentModal(false);
        handleSetData()
    }

    const handleEditImage = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(false);
        setIsEditParentModal(false);
        setIsEditImageModal(true);
        setIsEditDepartmentModal(false);
    }

    const handleEditDepartment = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(false);
        setIsEditParentModal(false);
        setIsEditImageModal(false);
        setIsEditDepartmentModal(true);
        handleSetData();
    }

    const handlePersonChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value,
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
    const handleUpdate = async () => {
        if (isEditDepartmentModal) {
            if (!departmentCode) {
                alert("enter department code")
                return;
            }
            await dispatch(updateStudent(studentId, { departmentCode }))
        }
        else if (isEditImageModal) {
            await dispatch(updateStudentImage(studentId, image))
        }
        else if (isEditPersonModal) {
            const payload = {
                ...studentData,
                parentRequest: null,
                addressRequest: null,
            }
            await dispatch(updateStudent(studentId, payload));
        } else if (isEditParentModal) {
            await dispatch(updateStudent(studentId, {
                parentRequest: studentData.parentRequest
            }));
        } else {
            await dispatch(updateStudent(studentId, {
                addressRequest: studentData.addressRequest
            }));
        }
        await dispatch(getStudentById(studentId))
    }

    const handleSetData = () => {
        setDepartmentCode(student?.student?.departmentCode)
        setStudentData({
            firstName: student?.student?.firstName || '',
            lastName: student?.student?.lastName || '',
            email: student?.student?.email || '',
            phoneNumber: student?.student?.phoneNumber || '',
            dob: student?.student?.dob || '',
            gender: student?.student?.gender || 'MALE',
            cast: student?.student?.cast || 'GENERAL',
            aadharNumber: student?.student?.aadharNumber || '',
            panNumber: student?.student?.panNumber || '',
            parentRequest: {
                fatherName: student?.student?.parentResponse?.fatherName || '',
                fatherNumber: student?.student?.parentResponse?.fatherNumber || '',
                fatherOccupation: student?.student?.parentResponse?.fatherOccupation || '',
                motherName: student?.student?.parentResponse?.motherName || '',
                motherNumber: student?.student?.parentResponse?.motherNumber || '',
                motherOccupation: student?.student?.parentResponse?.motherOccupation || ''

            },
            addressRequest: {
                address: student?.student?.addressResponse?.address || '',
                city: student?.student?.addressResponse?.city || '',
                district: student?.student?.addressResponse?.district || '',
                state: student?.student?.addressResponse?.state || '',
                country: student?.student?.addressResponse?.country || '',
                pincode: student?.student?.addressResponse?.pincode || ''
            }
        });
    };

    useEffect(() => {
        dispatch(getStudentById(studentId))
    }, [dispatch, studentId]);
    return (
        <div className='student-profile'>
            <div className="student-card">
                <div className="student-profile-header">
                    <div>
                        <div className="student-profile-avatar">
                            {
                                student?.student?.image ?
                                    <img src={`http://localhost:8080/${student?.student?.image}`} alt=""
                                        className='student-image' />
                                    : <i className="bi bi-person-fill"></i>
                            }
                        </div>
                        <div>
                            <button
                                className="student-edit-image-btn"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={handleEditImage}
                            >
                                <i className="bi bi-camera-fill me-2"></i>
                                Edit Image
                            </button>
                        </div>
                    </div>

                    <div className="student-profile-info">
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-card-text"></i>
                                <span>Registration Number : {student?.student?.registrationNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email : {student?.student?.email}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill"></i>
                                <span>Username : {student?.student?.username}</span>
                            </div>
                            <div>
                                <i className="bi bi-diagram-3-fill"></i>
                                <span>Department : {student?.student?.departmentName}
                                    {" "}
                                    {student?.student?.departmentName &&
                                        <>({student?.student?.departmentCode})</>
                                    }
                                </span>
                                <button className="edit-icon-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={handleEditDepartment}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="student-profile-body">
                    <div className="simple-section">
                        <div className="info-line">
                            <h5>Personal Information : </h5>
                            <div className="profile-actions">
                                <button
                                    onClick={handleEditPerson}
                                    className="student-edit-btn" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i className="bi bi-person-fill-gear me-2"></i>
                                    Edit Person
                                </button>
                                <button
                                    onClick={handleEditParent}
                                    className="student-edit-btn"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                >
                                    <i className="bi bi-people-fill me-2"></i>
                                    Edit Parent
                                </button>
                            </div>
                        </div>
                        <div className="info-line">
                            <span><strong>First Name :</strong> {student?.student?.firstName}</span>
                            <span><strong>Last Name :</strong> {student?.student?.lastName}</span>
                            <span><strong>Father Name :</strong> {student?.student?.parentResponse?.fatherName}</span>
                            <span><strong>Mother Name :</strong> {student?.student?.parentResponse?.motherName}</span>
                            <span><strong>Mobile Number :</strong> {student?.student?.phoneNumber}</span>
                            <span><strong>Email :</strong> {student?.student?.email}</span>
                            <span><strong>Gender :</strong> {student?.student?.gender}</span>
                            <span><strong>Cast :</strong> {student?.student?.cast}</span>
                            <span><strong>Aadhar :</strong> {student?.student?.aadharNumber}</span>
                            <span><strong>DOB :</strong> {student?.student?.dob}</span>
                            <span><strong>Father Number :</strong> {student?.student?.parentResponse?.fatherNumber}</span>
                            <span><strong>Mother Number :</strong> {student?.student?.parentResponse?.motherNumber}</span>
                            <span><strong>Father Occupation :</strong> {student?.student?.parentResponse?.fatherOccupation}</span>
                            <span><strong>Mother Occupation :</strong> {student?.student?.parentResponse?.motherOccupation}</span>
                        </div>
                    </div>
                    <div className="simple-section">
                        <div className="info-line">
                            <h5>Address Information : </h5>
                            <div className="profile-actions">
                                <button
                                    onClick={handleEditAddress}
                                    className="student-edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-house-door-fill me-2"></i>
                                    Edit Address
                                </button>
                            </div>
                        </div>
                        <div className="info-line">
                            <span><strong>Address :</strong> {student?.student?.addressResponse?.address}</span>
                            <span><strong>City :</strong> {student?.student?.addressResponse?.city}</span>
                            <span><strong>District :</strong> {student?.student?.addressResponse?.district}</span>
                            <span><strong>State :</strong> {student?.student?.addressResponse?.state}</span>
                            <span><strong>Country :</strong> {student?.student?.addressResponse?.country}</span>
                            <span><strong>Pincode :</strong> {student?.student?.addressResponse?.pincode}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {
                                    isEditPersonModal ? "Edit Personal Details" :
                                        isEditAddress ? "Edit Address " :
                                            isEditImageModal ? "Edit Image" :
                                                isEditDepartmentModal ? "Edit Department" :
                                                    "Edit Parents"
                                }
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                isEditPersonModal ?
                                    <div className="form-grid">
                                        <div>
                                            <label>First Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="firstName"
                                                value={studentData.firstName}
                                                onChange={handlePersonChange} />
                                        </div>
                                        <div>
                                            <label>Last Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='lastName'
                                                value={studentData.lastName}
                                                onChange={handlePersonChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Email</label>
                                            <input type="email"
                                                className="modal-input"
                                                name='email'
                                                value={studentData.email}
                                                onChange={handlePersonChange}

                                            />
                                        </div>
                                        <div>
                                            <label>Phone Number</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='phoneNumber'
                                                value={studentData.phoneNumber}
                                                onChange={handlePersonChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Date of Birth</label>
                                            <input type="date"
                                                className="modal-input"
                                                name='dob'
                                                value={studentData.dob}
                                                onChange={handlePersonChange}

                                            />
                                        </div>
                                        <div>
                                            <label>Gender</label>
                                            <select
                                                className="modal-input"
                                                name='gender'
                                                value={studentData.gender}
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
                                                value={studentData.cast}
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
                                                value={studentData.aadharNumber}
                                                onChange={handlePersonChange}

                                            />
                                        </div>
                                    </div>
                                    :
                                    isEditParentModal ?
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
                                                <label>Mother Name</label>
                                                <input type="text"
                                                    className="modal-input"
                                                    name='motherOccupation'
                                                    value={studentData.parentRequest.motherOccupation}
                                                    onChange={handleParentChange}
                                                />
                                            </div>
                                        </div>
                                        :
                                        isEditAddress ?
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
                                                        onChange={handleAddressChange} />
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
                                            :
                                            isEditDepartmentModal ?
                                                <div>
                                                    <label>Enter Department Code</label>
                                                    <input type="text"
                                                        className="modal-input"
                                                        name='departmentCode'
                                                        value={departmentCode}
                                                        onChange={(e) => setDepartmentCode(e.target.value)}
                                                    />
                                                </div>
                                                :
                                                <div>
                                                    <input
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                    />
                                                </div>
                            }
                        </div>
                        <div class="modal-footer ">
                            <button type="button" className="student-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="student-modal-btn" onClick={handleUpdate}
                                data-bs-dismiss="modal"
                            >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile

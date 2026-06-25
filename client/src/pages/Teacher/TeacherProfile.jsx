import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './TeacherProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherById, updateImage, updateTeacher } from '../../state/teacher/Action';

const TeacherProfile = () => {

    const location = useLocation();
    const teacherId = location.state?.teacherId

    const [isEditPersonModal, setIsEditPersonModal] = useState(false);
    const [isEditAddress, setIsEditAddressModal] = useState(false);
    const [isEditParentModal, setIsEditParentModal] = useState(false);
    const [isEditImageModal, setIsEditImageModal] = useState(false)
    const [image, setImage] = useState(null)

    const dispatch = useDispatch();
    const teacher = useSelector((state) => state.teacher);

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

    const handleEditPerson = () => {
        setIsEditPersonModal(true);
        setIsEditAddressModal(false);
        setIsEditParentModal(false);
        setIsEditImageModal(false)
        handleSetData();
    }

    const handleEditAddress = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(true);
        setIsEditParentModal(false);
        setIsEditImageModal(false)
        handleSetData();
    }

    const handleEditParent = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(false);
        setIsEditParentModal(true);
        setIsEditImageModal(false)
        handleSetData()
    }

    const handleEditImage = () => {
        setIsEditPersonModal(false);
        setIsEditAddressModal(false);
        setIsEditParentModal(false);
        setIsEditImageModal(true)
    }

    const handlePersonChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({
            ...teacherData,
            [name]: value,
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

    const handleUpdate = async () => {
        if (isEditImageModal) {
            await dispatch(updateImage(teacherId, image))
        }
        else if (isEditPersonModal) {
            const payload = {
                ...teacherData,
                parentRequest: null,
                addressRequest: null,
            }
            await dispatch(updateTeacher(teacherId, payload));
        } else if (isEditParentModal) {
            await dispatch(updateTeacher(teacherId, {
                parentRequest: teacherData.parentRequest
            }));
        } else {
            await dispatch(updateTeacher(teacherId, {
                addressRequest: teacherData.addressRequest
            }));
        }
        await dispatch(getTeacherById(teacherId))
    }

    const handleSetData = () => {
        setTeacherData({
            firstName: teacher?.teacher?.firstName || '',
            lastName: teacher?.teacher?.lastName || '',
            email: teacher?.teacher?.email || '',
            phoneNumber: teacher?.teacher?.phoneNumber || '',
            dob: teacher?.teacher?.dob || '',
            gender: teacher?.teacher?.gender || 'MALE',
            cast: teacher?.teacher?.cast || 'GENERAL',
            aadharNumber: teacher?.teacher?.aadharNumber || '',
            panNumber: teacher?.teacher?.panNumber || '',
            parentRequest: {
                fatherName: teacher?.teacher?.parentResponse?.fatherName || '',
                motherName: teacher?.teacher?.parentResponse?.motherName || ''
            },
            addressRequest: {
                address: teacher?.teacher?.addressResponse?.address || '',
                city: teacher?.teacher?.addressResponse?.city || '',
                district: teacher?.teacher?.addressResponse?.district || '',
                state: teacher?.teacher?.addressResponse?.state || '',
                country: teacher?.teacher?.addressResponse?.country || '',
                pincode: teacher?.teacher?.addressResponse?.pincode || ''
            }
        });
    };

    useEffect(() => {
        dispatch(getTeacherById(teacherId))
    }, [dispatch, teacherId]);

    return (
        <div className='teacher-profile'>
            <div className="teacher-card">
                <div className="teacher-profile-header">
                    <div>
                        <div className="teacher-profile-avatar">
                            {teacher?.teacher?.image ? (
                                <img
                                    src={`http://localhost:8080/${teacher.teacher.image}`}
                                    alt=''
                                    className="teacher-image"
                                />
                            ) : (
                                <i className="bi bi-person-fill"></i>
                            )}
                        </div>
                        <div>
                            <button
                                className="teacher-edit-image-btn"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={handleEditImage}
                            >
                                <i className="bi bi-camera-fill me-2"></i>
                                Edit Image
                            </button>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className="teacher-profile-info">
                        <div className="teacher-profile-contact">
                            <div>
                                <span>EmployeeId : {teacher?.teacher?.employeeId}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope"></i>
                                <span>Email : {teacher?.teacher?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="teacher-profile-body">
                    <div className="simple-section">
                        <div className="info-line">
                            <h5>Personal Information : </h5>
                            <div className="profile-actions">
                                <button onClick={handleEditPerson} className="teacher-edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-person-fill-gear me-2"></i>
                                    Edit Person
                                </button>
                                <button onClick={handleEditParent} className="teacher-edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-people-fill me-2"></i>
                                    Edit Parent
                                </button>
                            </div>
                        </div>
                        <div className="info-line">
                            <span><strong>First Name :</strong> {teacher?.teacher?.firstName}</span>
                            <span><strong>Last Name :</strong> {teacher?.teacher?.lastName}</span>
                            <span><strong>Father Name :</strong> {teacher?.teacher?.parentResponse?.fatherName}</span>
                            <span><strong>Mother Name :</strong> {teacher?.teacher?.parentResponse?.motherName}</span>
                            <span><strong>Mobile Number :</strong> {teacher?.teacher?.phoneNumber}</span>
                            <span><strong>Email :</strong> {teacher?.teacher?.email}</span>
                            <span><strong>Gender :</strong> {teacher?.teacher?.gender}</span>
                            <span><strong>Cast :</strong> {teacher?.teacher?.cast}</span>
                            <span><strong>Aadhar :</strong> {teacher?.teacher?.aadharNumber}</span>
                            <span><strong>PAN :</strong> {teacher?.teacher?.panNumber}</span>
                            <span><strong>DOB :</strong> {teacher?.teacher?.dob}</span>
                        </div>
                    </div>

                    <div className="simple-section">
                        <div className="info-line">
                            <h5>Address Information : </h5>
                            <div className="profile-actions">
                                <button onClick={handleEditAddress} className="teacher-edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-house-door-fill me-2"></i>
                                    Edit Address
                                </button>
                            </div>
                        </div>
                        <div className="info-line">
                            <span><strong>Address :</strong> {teacher?.teacher?.addressResponse?.address}</span>
                            <span><strong>City :</strong> {teacher?.teacher?.addressResponse?.city}</span>
                            <span><strong>District :</strong> {teacher?.teacher?.addressResponse?.district}</span>
                            <span><strong>State :</strong> {teacher?.teacher?.addressResponse?.state}</span>
                            <span><strong>Country :</strong> {teacher?.teacher?.addressResponse?.country}</span>
                            <span><strong>Pincode :</strong> {teacher?.teacher?.addressResponse?.pincode}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {isEditPersonModal ? "Edit Personal Details" : isEditAddress ? "Edit Address " : isEditImageModal ? "Edit Image" : "Edit Parents"}
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
                                    </div>
                                    :
                                    isEditParentModal ?
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
                                        :
                                        isEditAddress ?
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
                            <button type="button" className="teacher-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="teacher-modal-btn"
                                data-bs-dismiss="modal" onClick={handleUpdate}
                            >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfile

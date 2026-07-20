import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './CollegeProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCollegeById, updateCollege } from '../../state/college/Action';
import Student from './student/Student';

const CollegeProfile = () => {

    const dispatch = useDispatch();
    const college = useSelector((state) => state.college);

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "overview"
    const collegeId = searchParams.get("collegeId")

    const [isEditModal, setIsEditModal] = useState(false);
    const [isEditAddressModal, setIsEditAddressModal] = useState(false);

    const [collegeData, setCollegeData] = useState({
        name: "",
        shortName: "",
        email: "",
        phoneNumber: "",
        addressRequest: {
            address: "",
            city: "",
            district: "",
            state: "",
            country: "",
            pincode: ""
        }
    });

    const handleEdit = () => {
        setIsEditModal(true);
        setIsEditAddressModal(false);
        handleSetData();
    }

    const handleEditAddress = () => {
        setIsEditModal(false);
        setIsEditAddressModal(true);
        handleSetData();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollegeData({
            ...collegeData,
            [name]: value,
        })
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setCollegeData({
            ...collegeData,
            addressRequest: {
                ...collegeData.addressRequest,
                [name]: value
            }
        })
    }

    const handleUpdate = async () => {
        if (isEditAddressModal) {
            await dispatch(updateCollege(collegeId, { addressRequest: collegeData.addressRequest }))
        } else {
            const payload = {
                ...collegeData,
                addressRequest: null
            };
            await dispatch(updateCollege(collegeId, payload))
        }
        await dispatch(getCollegeById(collegeId))
    }

    const handleSetData = () => {
        setCollegeData({
            name: college?.college?.name || "",
            shortName: college?.college?.shortName || "",
            email: college?.college?.email || "",
            phoneNumber: college?.college?.phoneNumber || "",
            addressRequest: {
                address: college?.college?.addressResponse?.address || "",
                city: college?.college?.addressResponse?.city || "",
                district: college?.college?.addressResponse?.district || "",
                state: college?.college?.addressResponse?.state || "",
                country: college?.college?.addressResponse?.country || "",
                pincode: college?.college?.addressResponse?.pincode || ""
            }
        })
    }


    useEffect(() => {
        dispatch(getCollegeById(collegeId))
    }, [dispatch, collegeId]);

    return (
        <div className="college-profile">
            <nav class="college-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ collegeId, tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ collegeId, tab: "student" })}
                        >
                            Students
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ collegeId, tab: "admission" })}
                        >
                            Admissions
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="college-card">
                {

                    (activeTab === 'student' || activeTab === "admission") ?
                        <div>
                            <Student />
                        </div>
                        :
                        <div>
                            <div className="college-header">
                                <div className="college-logo">
                                    <i className="bi bi-building"></i>
                                </div>
                                <div>
                                    <h2>{college.college?.name}({college.college?.shortName})</h2>
                                    <p>College Code : {college.college?.collegeCode}</p>
                                    <p>Email : {college?.college?.email}</p>
                                    <div className="section-header">
                                        <p>Phone : {college?.college?.phoneNumber}</p>
                                        <button className="edit-icon-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={handleEdit}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="stats-container">
                                <div className="stat-card">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <h3>{college?.college?.totalStudent}</h3>
                                    <span>Total Students</span>
                                </div>
                                <div className="stat-card">
                                    <i className="bi bi-person-workspace"></i>
                                    <h3>{college?.college?.totalFaculty}</h3>
                                    <span>Faculty</span>
                                </div>
                                <div className="stat-card">
                                    <i className="bi bi-diagram-3-fill"></i>
                                    <h3>{college?.college?.totalDepartment}</h3>
                                    <span>Department</span>
                                </div>
                                <div className="stat-card">
                                    <i className="bi bi-journal-bookmark-fill"></i>
                                    <h3>{college?.college?.totalCourse}</h3>
                                    <span>Courses</span>
                                </div>
                            </div>

                            <div className="college-info">
                                <div className="section-header">
                                    <h4>Address : </h4>
                                    <button className="edit-icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={handleEditAddress}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="info-grid">
                                    <div>
                                        <strong>Address :</strong> {college?.college?.addressResponse?.address}
                                    </div>

                                    <div>
                                        <strong>City :</strong>{college?.college?.addressResponse?.city}
                                    </div>

                                    <div>
                                        <strong>District :</strong>{college?.college?.addressResponse?.district}
                                    </div>

                                    <div>
                                        <strong>State :</strong>{college?.college?.addressResponse?.state}
                                    </div>

                                    <div>
                                        <strong>Country :</strong> {college?.college?.addressResponse?.country}
                                    </div>

                                    <div>
                                        <strong>Pincode :</strong> {college?.college?.addressResponse?.pincode}
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {isEditModal ? "Edit College Details" : "Edit Address "}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                isEditModal ?
                                    <div className="form-grid">
                                        <div>
                                            <label>College Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="name"
                                                value={collegeData.name}
                                                onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label>Short Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='shortName'
                                                value={collegeData.shortName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Email</label>
                                            <input type="email"
                                                className="modal-input"
                                                name='email'
                                                value={collegeData.email}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div>
                                            <label>Phone Number</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='phoneNumber'
                                                value={collegeData.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className="form-grid">
                                        <div>
                                            <label>Address</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='address'
                                                value={collegeData.addressRequest.address}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div>
                                            <label>City</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='city'
                                                value={collegeData.addressRequest.city}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div>
                                            <label>District</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='district'
                                                value={collegeData.addressRequest.district}
                                                onChange={handleAddressChange} />
                                        </div>
                                        <div>
                                            <label>State</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='state'
                                                value={collegeData.addressRequest.state}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Country</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='country'
                                                value={collegeData.addressRequest.country}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Pincode</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='pincode'
                                                value={collegeData.addressRequest.pincode}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>
                        <div class="modal-footer ">
                            <button type="button" className="college-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="college-modal-btn"
                                data-bs-dismiss="modal" onClick={handleUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeProfile;
import React, { useEffect, useState } from 'react';
import './College.css'
import { useDispatch, useSelector } from "react-redux";
import { createCollege, deleteCollege, getAllCollege } from '../../state/college/Action';
import { useNavigate } from 'react-router-dom';


const College = () => {
    const dispatch = useDispatch();
    const college = useSelector((state) => state.college);

    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollegeData({
            ...collegeData,
            [name]: value
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

    const handleClearData = () => {
        setCollegeData({
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
        })
    }

    const handleSave = async () => {
        await dispatch(createCollege(collegeData))
        await dispatch(getAllCollege())
        handleClearData()
    }

    const handleViewCollegeProfile = (collegeId) => {
        navigate('/college/profile', {
            state: {
                collegeId
            }
        })
    }

    const handleDelete = async (collegeId) => {
        await dispatch(deleteCollege(collegeId));
        await dispatch(getAllCollege())
    }

    useEffect(() => {
        dispatch(getAllCollege());
    }, [dispatch]);



    return (
        <div className="college-container">
            <div className="college-header">
                <div>
                    <h2>College Management</h2>
                    <p>Manage all College from one place</p>
                </div>

                <button className="add-college-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New College
                </button>
            </div>
            <div className="college-card">
                <table className="table college-table">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>College Id</th>
                            <th>College Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {college?.colleges?.length > 0 ? (
                            college?.colleges?.map((college, index) => (
                                <tr key={college.id}>
                                    <td>{index + 1}.</td>
                                    <td>{college.collegeCode}</td>
                                    <td>{college.name}</td>
                                    <td>{college.email}</td>
                                    <td>{college.phoneNumber}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleViewCollegeProfile(college.id)}
                                            className="btn btn-sm custom-action-btn me-2">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button onClick={() => handleDelete(college.id)} className="btn btn-sm custom-action-btn me-2">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No College Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"           >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New College</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h6 className="form-section-title">College Information</h6>
                            <div className="form-grid">
                                <div>
                                    <label>College Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={collegeData.name}
                                        onChange={handleChange}
                                    />
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
                            <h6 className="form-section-title mt-4">
                                Address Information
                            </h6>
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
                                        onChange={handleAddressChange}
                                    />
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
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
                                class="college-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="college-modal-btn" data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default College;
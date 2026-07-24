import React, { useEffect, useState } from 'react'
import './FeeType.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { createFeeType, deleteFeeType, getAllFeeType, getFeeTypeById, updateFeeType } from '../../../state/fee/Action'



const FeeType = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const [isAddFeeTypeModal, setIsAddFeeTypeModal] = useState(false);
    const [, setIsEditFeeTypeModal] = useState(false);
    const [editFeeTypeId, setEditFeeTypeId] = useState(null);
    const [feeTypeData, setFeeTypeData] = useState(
        {
            name: "",
            description: ""
        }
    )

    const handleViewAddFeeTypeModal = () => {
        handleClearData();
        setIsAddFeeTypeModal(true);
        setIsEditFeeTypeModal(false);
    }

    const handleViewEditFeeTypeModal = (feeTypeId) => {
        setIsAddFeeTypeModal(false);
        setIsEditFeeTypeModal(true);
        setEditFeeTypeId(feeTypeId)
        dispatch(getFeeTypeById(feeTypeId));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeTypeData({
            ...feeTypeData,
            [name]: value
        })
    }

    const handleSave = async () => {
        if (isAddFeeTypeModal) {
            await dispatch(createFeeType(feeTypeData))
        } else {
            await dispatch(updateFeeType(editFeeTypeId, feeTypeData))
        }
        handleClearData();
        await dispatch(getAllFeeType())
    }

    const handleClearData = () => {
        setFeeTypeData(
            {
                name: "",
                description: ""
            }
        )
    }

    const handleDelete = async (feeTypeId) => {
        await dispatch(deleteFeeType(feeTypeId))
        await dispatch(getAllFeeType());
    }

    useEffect(() => {
        dispatch(getAllFeeType());
    }, [dispatch]);

    useEffect(() => {
        if (fee?.feeType) {
            setFeeTypeData({
                name: fee.feeType.name || "",
                description: fee.feeType.description || ""
            });
        }
    }, [fee?.feeType]);

    return (
        <div>
            <div className="fee-type-header">
                <div>
                    <h2>Fee Type</h2>
                </div>
                {
                    isAccountant &&
                    <button
                        className="add-fee-type-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleViewAddFeeTypeModal}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Fee Type
                    </button>
                }
            </div>
            <table className="table fee-type-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>description</th>
                        {
                            isAccountant &&
                            <th className='text-center'>Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        fee?.feeTypes?.length > 0 ?
                            fee?.feeTypes?.map((fee, index) =>
                                <tr key={fee.id}>
                                    <td>{index + 1}.</td>
                                    <td>{fee.name}</td>
                                    <td>{fee.description}</td>
                                    {
                                        isAccountant &&
                                        <td className='text-center'>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => handleViewEditFeeTypeModal(fee.id)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                onClick={() => handleDelete(fee.id)}
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    }

                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No Fee Type Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {
                                    isAddFeeTypeModal ?
                                        " Add New FeeType" :
                                        "Edit Fee Type"
                                }</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                isAddFeeTypeModal ?
                                    <div className="form-grid">
                                        <div>
                                            <label>Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="name"
                                                value={feeTypeData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='description'
                                                value={feeTypeData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className="form-grid">
                                        <div>
                                            <label>Name</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="name"
                                                value={feeTypeData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Description</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='description'
                                                value={feeTypeData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                            }
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
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

export default FeeType

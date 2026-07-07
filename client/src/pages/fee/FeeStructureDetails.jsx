import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './FeeStructureDetatils.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFeeStructureById, updateFeeStructure } from '../../state/fee/Action';

const FeeStructureDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const feeStructureId = searchParams.get("id");

    const dispatch = useDispatch()
    const fee = useSelector((state) => state.fee)

    const [feeStructureData, setFeeStruuctureData] = useState({
        amount: 0,
        academicYear: "",
        description: "",
    })

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
        })
    }

    const handleSave = async () => {
        await dispatch(updateFeeStructure(feeStructureId, feeStructureData))
        await dispatch(getFeeStructureById(feeStructureId))
    }

    const handleBack = () => {
        setSearchParams({
            tab: "fee-structure"
        })
    }

    useEffect(() => {
        dispatch(getFeeStructureById(feeStructureId))
    }, [dispatch, feeStructureId]);

    return (
        <div>
            <div className="fee-structure-detail-header">
                <div>
                    <h2>Fee Structure Details</h2>
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
                        <i className="bi bi-calendar-event"></i>
                        <span><strong>Academic Year : </strong>{fee?.feeStructure?.academicYear}</span>
                    </div>
                </div>
                <div className="fee-structure-details-contact">
                    <div>
                        <i className="bi bi-mortarboard-fill"></i>
                        <span>
                            <strong>Class : </strong>
                            {fee?.feeStructure?.className} ({fee?.feeStructure?.classCode})
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-diagram-3-fill me-2"></i>
                        <span>
                            <strong>Department : </strong>
                            {fee?.feeStructure?.departmentName} ({fee?.feeStructure?.departmentCode})
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
                    <i className="bi bi-cash-stack"></i>
                    <h3>1000</h3>
                    <span>Total Collection</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-mortarboard-fill"></i>
                    <h3>1000</h3>
                    <span>Total Students</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-patch-check-fill"></i>
                    <h3>1000</h3>
                    <span>Total Paid Student</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-clock-history"></i>
                    <h3>1000</h3>
                    <span>Total Unpaid Student</span>
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

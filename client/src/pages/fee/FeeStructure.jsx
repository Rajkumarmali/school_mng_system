import React, { useEffect, useState } from 'react'
import './FeeStructure.css'
import { jwtDecode } from 'jwt-decode'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createFeeStructure, deleteFeeStructure, getAllFeeStructure, getAllFeeType } from '../../state/fee/Action'
import FeeStructureDetails from './FeeStructureDetails'

const FeeStructure = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "fee-structure"
    const id = searchParams.get("id")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const [feeStructureData, setFeeStructureData] = useState({
        amount: "",
        academicYear: "",
        description: "",
        classCode: "",
        departmentCode: "",
        feeTypeId: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeStructureData({
            ...feeStructureData,
            [name]: value
        })
    }

    const handleClearData = () => {
        setFeeStructureData({
            amount: "",
            academicYear: "",
            description: "",
            classCode: "",
            departmentCode: "",
            feeTypeId: fee?.feeTypes?.[0]?.id || 0
        })
    }

    const totalPages = fee?.feeStructures?.totalPages || 0;
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
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleViewFeeStructureDetails = (feeStructureId) => {
        setSearchParams({
            tab,
            id: feeStructureId,
        });
    }

    const handleSave = async () => {
        await dispatch(createFeeStructure(feeStructureData));
        await dispatch(getAllFeeStructure(pageNumber, pageSize));
        handleClearData()
    }

    const handleDeleteFeeStructure = async (feeStructureId) => {
        await dispatch(deleteFeeStructure(feeStructureId));
        await dispatch(getAllFeeStructure(pageNumber, pageSize));
    }

    useEffect(() => {
        dispatch(getAllFeeStructure(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    useEffect(() => {
        if (fee?.feeTypes?.length > 0 && !feeStructureData.feeTypeId) {
            setFeeStructureData((prev) => ({
                ...prev,
                feeTypeId: fee.feeTypes[0].id
            }));
        }
    }, [fee?.feeTypes, feeStructureData.feeTypeId]);

    return (
        <div>
            {
                !id ?
                    <div>
                        <div className="fee-structure-header">
                            <div>
                                <h4>Fee Structure</h4>
                            </div>
                            {
                                isAccountant &&
                                <button
                                    className="add-fee-structure-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => dispatch(getAllFeeType())}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add New Fee Structure
                                </button>
                            }
                        </div>
                        <table className="table fee-structure-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>FeeTypeName</th>
                                    <th>Department</th>
                                    <th>Class</th>
                                    <th>AcademicYear</th>
                                    <th>Amount</th>
                                    <th>DueDate</th>
                                    <th>Status</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fee?.feeStructures?.content?.length > 0 ?
                                        fee?.feeStructures?.content?.map((fee, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{fee.feeTypeName}</td>
                                                <td>{fee.departmentCode}</td>
                                                <td>{fee.classCode}</td>
                                                <td>{fee.academicYear}</td>
                                                <td>{fee.amount}</td>
                                                <td>{fee.dueDate}</td>
                                                <td>{fee.status}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => handleViewFeeStructureDetails(fee.id)}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    {
                                                        isAccountant &&
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            onClick={() => handleDeleteFeeStructure(fee.id)}
                                                        >
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ) :
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No Fee Structure Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{fee?.feeStructures?.totalElements || 0}</strong>
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
                    :
                    <div>
                        <FeeStructureDetails />
                    </div>
            }

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Fee Structure</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Select Fee Type</label>
                                    <select
                                        className="modal-input"
                                        name='feeTypeId'
                                        value={feeStructureData.feeTypeId}
                                        onChange={handleChange}
                                    >
                                        {fee?.feeTypes?.map(feeType =>
                                            <option
                                                key={feeType.id}
                                                value={feeType.id}>
                                                {feeType.name}
                                            </option>
                                        )}
                                    </select>
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
                                    <label>Department Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='departmentCode'
                                        value={feeStructureData.departmentCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Class Code</label>
                                    <input type="email"
                                        className="modal-input"
                                        name='classCode'
                                        value={feeStructureData.classCode}
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
                                    <label>Amount</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='amount'
                                        value={feeStructureData.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
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

export default FeeStructure

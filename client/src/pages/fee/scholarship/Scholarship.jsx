import React, { useEffect, useState } from 'react'
import './Scholarship.css'
import { jwtDecode } from 'jwt-decode'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createScholarship, getScholarship } from '../../../state/scholarship/Action'
import ScholarshipDetails from './ScholarshipDetails'

const Scholarship = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const scholarshipId = searchParams.get("scholarshipId")

    const dispatch = useDispatch();
    const scholarship = useSelector((state) => state.scholarship)

    const [scholarshipData, setScholarshipData] = useState({
        name: "",
        description: "",
        scholarshipPercent: ""
    })


    const totalPages = scholarship?.scholarships?.totalPages || 0;
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setScholarshipData({
            ...scholarshipData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(createScholarship(scholarshipData))
        await dispatch(getScholarship(pageNumber, pageSize))
    }

    const handleClearData = () => {
        setScholarshipData({
            name: "",
            description: "",
            scholarshipPercent: ""
        })
    }

    const handleViewDetails = (scholarshipId) => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize,
            scholarshipId
        })
    }

    useEffect(() => {
        dispatch(getScholarship(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])


    return (
        <div>
            {
                scholarshipId ?
                    <ScholarshipDetails />
                    :
                    <div>
                        <div>
                            <div className="scholarship-header">
                                <div>
                                    <h4>Scholarship</h4>
                                </div>
                                {
                                    isAccountant &&
                                    <button
                                        className="add-scholarship-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#scholarshipModal"
                                        onClick={handleClearData}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Add New Scholarship
                                    </button>
                                }
                            </div>
                        </div>
                        <table className="table scholarship-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Scholarship(%)</th>
                                    <th>TotalStudent</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scholarship?.scholarships?.content?.length > 0 ?
                                        scholarship?.scholarships?.content?.map((scholarship, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{scholarship.code}</td>
                                                <td>{scholarship.name}</td>
                                                <td>{scholarship.status}</td>
                                                <td>{scholarship.scholarshipPercent}%</td>
                                                <td>{scholarship.totalStudent}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => handleViewDetails(scholarship.id)}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No Fee Structure Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{scholarship?.scholarships?.totalElements || 0}</strong>
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
            }


            <div class="modal fade" id="scholarshipModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='description'
                                        value={scholarshipData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Scholarship Percent</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='scholarshipPercent'
                                        value={scholarshipData.scholarshipPercent}
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
                            <button type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                                onClick={handleSave}
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

export default Scholarship

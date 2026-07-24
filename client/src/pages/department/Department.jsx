import React, { useEffect, useState } from 'react'
import './Department.css'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment, deleteDepartment, getAllDepartment } from '../../state/department/Action';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Department = () => {

    const department = useSelector((state) => state.department);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const [departmentData, setDepartmentData] = useState({
        name: "",
        description: "",
        hodTeacherEmailOrEmplId: "",
        courseCode: ""
    })

    const clearData = () => {
        setDepartmentData({
            name: "",
            description: "",
            hodTeacherEmailOrEmplId: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setDepartmentData({
            ...departmentData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(createDepartment(departmentData))
        await dispatch(getAllDepartment(pageNumber, pageSize))
        clearData();
    }

    const handleDelete = async (departmentId) => {
        await dispatch(deleteDepartment(departmentId))
        await dispatch(getAllDepartment(pageNumber, pageSize))
    }

    const handleViewDetails = (departmentId) => {
        navigate(`/department/details/${departmentId}`)
    }

    const totalPages = department?.departments?.totalPages || 0;
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


    useEffect(() => {
        dispatch(getAllDepartment(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])

    return (
        <div className="departments-container">
            <div className="departments-header">
                <div>
                    <h2>Department Management</h2>
                </div>
                <button className="add-departments-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Department
                </button>
            </div>
            <div className="departments-card">
                <table className="table departments-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Hod Name</th>
                            <th>Hod Email</th>
                            <th>Hod Phone</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            department?.departments?.content?.length > 0 ?
                                department?.departments?.content?.map((department, index) =>
                                    <tr key={department.id}>
                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                        <td>{department.code}</td>
                                        <td>{department.name}</td>
                                        <td>{department.courseCode}</td>
                                        <td>{department.hodName}</td>
                                        <td>{department.hodEmail}</td>
                                        <td>{department.hodPhoneNumber}</td>
                                        <td className='text-center'>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                onClick={() => handleViewDetails(department.id)}
                                            >
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                onClick={() => handleDelete(department.id)}
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                                :
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No Department Found
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{department?.departments?.totalElements || 0}</strong>
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
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Department</h1>
                            <button onClick={clearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Department Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={departmentData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Department Description</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="description"
                                        value={departmentData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Hod Email or EmployeeId</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='hodTeacherEmailOrEmplId'
                                        value={departmentData.hodTeacherEmailOrEmplId}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Course Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='courseCode'
                                        value={departmentData.courseCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={clearData} type="button"
                                class="departments-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="departments-modal-btn" data-bs-dismiss="modal"
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

export default Department

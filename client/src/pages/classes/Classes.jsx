import React, { useEffect, useState } from 'react'
import './Classes.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createClass, deleteClass, getAllClass, getAllDepartmentsClass } from '../../state/class/Action'
import { jwtDecode } from 'jwt-decode'

const Classes = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAdmin = roles.includes("ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const classes = useSelector((state) => state.class)

    const [classData, setClassData] = useState({
        name: "",
        academicYear: "",
        semester: "",
        employeeEmailOrEmployeeId: ""
    })

    const handleClearData = () => {
        setClassData({
            name: "",
            academicYear: "",
            semester: "",
            employeeEmailOrEmployeeId: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData({
            ...classData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(createClass(classData))
        await dispatch(getAllDepartmentsClass(pageNumber, pageSize))
        handleClearData()
    }

    const handleDelete = async (classId) => {
        await dispatch(deleteClass(classId))
        if (isAdmin) {
            await dispatch(getAllClass(pageNumber, pageSize))
        }
        else {
            await dispatch(getAllDepartmentsClass(pageNumber, pageSize))
        }
    }

    const handleViewClassDetails = (classId) => {
        navigate(`/classes/details/${classId}`)
    }

    const totalPages = isAdmin ? (classes?.allClasses?.totalPages || 0) :
        (classes?.departmentsClasses?.totalPages || 0);
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
        if (isAdmin) {
            dispatch(getAllClass(pageNumber, pageSize))
        }
        else {
            dispatch(getAllDepartmentsClass(pageNumber, pageSize))
        }
    }, [dispatch, isAdmin, pageNumber, pageSize])

    return (
        <div className='classes-container'>
            <div className="classes-header">
                <div>
                    <h2>Classes Management</h2>
                </div>
                {
                    !isAdmin &&
                    <button className="add-class-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Class
                    </button>
                }
            </div>
            <div className="classes-card">
                <table className="table classes-table">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>ClassCode</th>
                            <th>Name</th>
                            <th>Semester</th>
                            <th>academic Year</th>
                            <th>departmentCode</th>
                            <th>Status</th>
                            <th>Class Teacher</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (
                                (isAdmin && classes?.allClasses?.content?.length === 0) ||
                                (!isAdmin && classes?.departmentsClasses?.content?.length === 0)
                            ) ?
                                (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No Classes Found
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    isAdmin ? classes?.allClasses?.content
                                        : classes?.departmentsClasses?.content
                                )?.map((clas, index) =>
                                    <tr key={clas.id}>
                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                        <td>{clas.classCode}</td>
                                        <td>{clas.name}</td>
                                        <td>{clas.semester}</td>
                                        <td>{clas.academicYear}</td>
                                        <td>{clas.departmentCode}</td>
                                        <td>{clas.classStatus}</td>
                                        <td>{clas.classTeacherResponse?.name}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleViewClassDetails(clas.id)}
                                                className="btn btn-sm custom-action-btn me-2">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(clas.id)}
                                                className="btn btn-sm custom-action-btn me-2">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total :
                        {
                            isAdmin ? <strong> {classes?.allClasses?.totalElements || 0}</strong>
                                : <strong> {classes?.departmentsClasses?.totalElements || 0}</strong>
                        }

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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"           >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Class</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Class Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={classData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Academic Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='academicYear'
                                        value={classData.academicYear}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Semester</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='semester'
                                        value={classData.semester}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Class Teacher Email or EmployeeId</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='employeeEmailOrEmployeeId'
                                        value={classData.employeeEmailOrEmployeeId}
                                        onChange={handleChange}
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
    )
}

export default Classes

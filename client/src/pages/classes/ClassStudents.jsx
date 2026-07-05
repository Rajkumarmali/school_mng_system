import React, { useEffect, useState } from 'react'
import './ClassStudents.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addStudentInClass, deleteStudentFromClass, getStudentsFromClass } from '../../state/class/Action'

const ClassStudents = ({ classId }) => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const dispatch = useDispatch()
    const clas = useSelector((state) => state.class)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "student"
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;

    const [classStudentData, setClassStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])

    const totalPages = clas?.classStudents?.totalPages || 0;
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

    const saveAddClassStudentData = async () => {
        await dispatch(addStudentInClass(classId, classStudentData));
        await dispatch(getStudentsFromClass(classId, pageNumber, pageSize))
        setClassStudentData([
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleAddClassStudentChange = (index, e) => {
        const { name, value } = e.target;
        const updateStudent = [...classStudentData];
        updateStudent[index] = {
            ...updateStudent[index],
            [name]: value
        }
        setClassStudentData(updateStudent)
    }

    const handleAddClassStudentRow = () => {
        setClassStudentData([
            ...classStudentData,
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleRemoveClassStudent = (index) => {
        if (classStudentData.length === 1) return;
        const updatedStudents = classStudentData.filter((_, i) => i !== index);
        setClassStudentData(updatedStudents);
    }

    const handleDeleteStudentFromClass = async (studentId) => {
        await dispatch(deleteStudentFromClass(classId, studentId))
        await dispatch(getStudentsFromClass(classId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getStudentsFromClass(classId, pageNumber, pageSize))
    }, [dispatch, classId, pageNumber, pageSize]);

    return (
        <div>
            <div className="class-student-header">
                <div>
                    <h2>Students</h2>
                </div>
                {
                    isHod &&
                    <button
                        className="add-class-student-btn" data-bs-toggle="modal"
                        data-bs-target="#studentModal"
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Students
                    </button>
                }
            </div>
            <table className="table class-student-table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Registration Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {
                            isHod &&
                            <td>Action</td>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        clas?.classStudents?.content?.length > 0 ?
                            clas?.classStudents?.content?.map((student, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{student.registrationNumber}</td>
                                    <td>{student.firstName}{" "}{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNumber}</td>
                                    {
                                        isHod &&
                                        <td className='text-center'>
                                            <button
                                                onClick={() => handleDeleteStudentFromClass(student.id)}
                                                className="btn btn-sm custom-action-btn me-2"
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    }
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No Student Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{clas?.classStudents?.totalElements || 0}</strong>
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

            <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Add Students
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table className="table class-student-modal-table">
                                <thead>
                                    <tr>
                                        <th>SNo.</th>
                                        <th>Registration Number</th>
                                        <th>Frist Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        classStudentData.map((student, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="registrationNumber"
                                                        value={student.registrationNumber}
                                                        onChange={(e) => handleAddClassStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="firstName"
                                                        value={student.firstName}
                                                        onChange={(e) => handleAddClassStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="lastName"
                                                        value={student.lastName}
                                                        onChange={(e) => handleAddClassStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="modal-input"
                                                        name="email"
                                                        value={student.email}
                                                        onChange={(e) => handleAddClassStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="phoneNumber"
                                                        value={student.phoneNumber}
                                                        onChange={(e) => handleAddClassStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm custom-action-btn me-2"
                                                        disabled={classStudentData.length === 1}
                                                        onClick={() => handleRemoveClassStudent(index)}
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button
                                type="button"
                                className="departments-modal-btn"
                                onClick={handleAddClassStudentRow}
                            >
                                + Add Another Student
                            </button>
                            <div>
                                <button
                                    type="button"
                                    class="departments-modal-btn"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={saveAddClassStudentData}
                                    type="button"
                                    class="departments-modal-btn" data-bs-dismiss="modal"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassStudents

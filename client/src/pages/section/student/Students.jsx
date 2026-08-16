import React, { useEffect, useState } from 'react'
import './Students.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addStudentInSection, deleteStudentFromSection, getStudentsFromSection } from '../../../state/section/Action'
import StudentDetail from './StudentDetail'

const Students = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "student"
    const sectionId = searchParams.get("sectionId")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentId = searchParams.get("studentId")

    const [sectionStudentData, setSectionStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])

    const totalPages = section?.sectionStudents?.totalPages || 0;
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
            sectionId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber + 1,
            size: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const saveAddSectionStudentData = async () => {
        await dispatch(addStudentInSection(sectionId, sectionStudentData));
        await dispatch(getStudentsFromSection(sectionId, pageNumber, pageSize))
        setSectionStudentData([
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleAddSectionStudentChange = (index, e) => {
        const { name, value } = e.target;
        const updateStudent = [...sectionStudentData];
        updateStudent[index] = {
            ...updateStudent[index],
            [name]: value
        }
        setSectionStudentData(updateStudent)
    }

    const handleAddSectionStudentRow = () => {
        setSectionStudentData([
            ...sectionStudentData,
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleRemoveSectionStudent = (index) => {
        if (sectionStudentData.length === 1) return;
        const updatedStudents = sectionStudentData.filter((_, i) => i !== index);
        setSectionStudentData(updatedStudents);
    }

    const handleDeleteStudentFromSection = async (studentId) => {
        await dispatch(deleteStudentFromSection(sectionId, studentId))
        await dispatch(getStudentsFromSection(sectionId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getStudentsFromSection(sectionId, pageNumber, pageSize))
    }, [dispatch, sectionId, pageNumber, pageSize]);

    return (
        <div>
            {
                studentId ?
                    <div>
                        <StudentDetail />
                    </div>
                    :
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
                                    <th>Roll No.</th>
                                    <th>Registration No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Attendance(%)</th>
                                    <td className='text-center'>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    section?.sectionStudents?.content?.length > 0 ?
                                        section?.sectionStudents?.content?.map((student, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{student.rollNumber}</td>
                                                <td>{student.registrationNumber}</td>
                                                <td>{student.firstName}{" "}{student.lastName}</td>
                                                <td>{student.email}</td>
                                                <td>{student.phoneNumber}</td>
                                                <td>{student?.attendancePercent.toFixed(2)}%</td>
                                                <td className='text-center'>
                                                    <button
                                                        onClick={() => setSearchParams({ sectionId, tab, page: pageNumber, size: pageSize, studentId: student.id })}
                                                        className="btn btn-sm custom-action-btn me-2">
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                    {
                                                        isHod &&
                                                        <button
                                                            onClick={() => handleDeleteStudentFromSection(student.id)}
                                                            className="btn btn-sm custom-action-btn me-2"
                                                        >
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    }
                                                </td>

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
                                Total : <strong>{section?.sectionStudents?.totalElements || 0}</strong>
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
                                        sectionStudentData.map((student, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="registrationNumber"
                                                        value={student.registrationNumber}
                                                        onChange={(e) => handleAddSectionStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="firstName"
                                                        value={student.firstName}
                                                        onChange={(e) => handleAddSectionStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="lastName"
                                                        value={student.lastName}
                                                        onChange={(e) => handleAddSectionStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="modal-input"
                                                        name="email"
                                                        value={student.email}
                                                        onChange={(e) => handleAddSectionStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="phoneNumber"
                                                        value={student.phoneNumber}
                                                        onChange={(e) => handleAddSectionStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm custom-action-btn me-2"
                                                        disabled={sectionStudentData.length === 1}
                                                        onClick={() => handleRemoveSectionStudent(index)}
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
                                onClick={handleAddSectionStudentRow}
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
                                    onClick={saveAddSectionStudentData}
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

export default Students

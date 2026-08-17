import React, { useEffect, useState } from 'react'
import './Student.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addStudentInSectionSubject, getAllStudentFromSectionSubject } from '../../../../state/section/Action'

const Student = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const dispatch = useDispatch();
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const tab = searchParams.get("tab")
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));
    const sectionSubjectId = searchParams.get("sectionSubjectId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const [sectionSubjectStudentData, setSectionSubjectStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])


    const totalPages = section?.sectionSubjectStudents?.totalPages || 0;
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
            page,
            size,
            sectionSubjectId,
            action,
            pageNumber: 1,
            pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            sectionSubjectId,
            action,
            pageNumber: pageNumber - 1,
            pageSize: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            sectionSubjectId,
            action,
            pageNumber: pageNumber + 1,
            pageSize: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            sectionSubjectId,
            action,
            pageNumber: pageNumber,
            pageSize: pageSize
        })
    }

    const handleAddSectionSubjectStudentChange = (index, e) => {
        const { name, value } = e.target;
        const updateStudent = [...sectionSubjectStudentData];
        updateStudent[index] = {
            ...updateStudent[index],
            [name]: value
        }
        setSectionSubjectStudentData(updateStudent)
    }

    const handleAddSectionSubjectStudentRow = () => {
        setSectionSubjectStudentData([
            ...sectionSubjectStudentData,
            {
                firstName: "",
                lastName: "",
                email: "",
                registrationNumber: "",
                phoneNumber: ""
            }
        ])
    }

    const handleRemoveSectionSubjectStudent = (index) => {
        if (sectionSubjectStudentData.length === 1) return;
        const updatedStudents = sectionSubjectStudentData.filter((_, i) => i !== index);
        setSectionSubjectStudentData(updatedStudents);
    }

    const saveAddSectionSubjectStudentData = async () => {
        await dispatch(addStudentInSectionSubject(sectionSubjectId, sectionSubjectStudentData))
        await dispatch(getAllStudentFromSectionSubject(sectionSubjectId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getAllStudentFromSectionSubject(sectionSubjectId, pageNumber, pageSize))
    }, [dispatch, sectionSubjectId, pageNumber, pageSize]);


    return (
        <div>
            <div>
                <div className="section-subject-student-detail-header">
                    <div className="d-flex gap-3">
                        {
                            isHod &&
                            <button
                                className="section-subject-student-detail-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#studentModal"
                            >
                                <i className="bi bi-person-plus-fill me-2"></i>
                                Add Students
                            </button>
                        }

                    </div>
                </div>
                <table className="table section-subject-student-table">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Roll No.</th>
                            <th>Registration No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Attendance(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            section?.sectionSubjectStudents?.content?.length > 0 ?
                                section?.sectionSubjectStudents?.content?.map((stu, index) =>
                                    <tr>
                                        <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                        <td>{stu?.studentResponse?.rollNumber}</td>
                                        <td>{stu?.studentResponse?.registrationNumber}</td>
                                        <td>{stu?.studentResponse?.firstName} {stu.lastName}</td>
                                        <td>{stu?.studentResponse?.email}</td>
                                        <td>{stu?.studentResponse?.phoneNumber}</td>
                                        <td>{(stu?.studentResponse?.attendancePercent).toFixed(2)}%</td>
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
                        Total : <strong>{section?.sectionSubjectStudents?.totalElements || 0}</strong>
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
                                        sectionSubjectStudentData.map((student, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="registrationNumber"
                                                        value={student.registrationNumber}
                                                        onChange={(e) => handleAddSectionSubjectStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="firstName"
                                                        value={student.firstName}
                                                        onChange={(e) => handleAddSectionSubjectStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="lastName"
                                                        value={student.lastName}
                                                        onChange={(e) => handleAddSectionSubjectStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="modal-input"
                                                        name="email"
                                                        value={student.email}
                                                        onChange={(e) => handleAddSectionSubjectStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="modal-input"
                                                        name="phoneNumber"
                                                        value={student.phoneNumber}
                                                        onChange={(e) => handleAddSectionSubjectStudentChange(index, e)}
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm custom-action-btn me-2"
                                                        disabled={sectionSubjectStudentData.length === 1}
                                                        onClick={() => handleRemoveSectionSubjectStudent(index)}
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
                                onClick={handleAddSectionSubjectStudentRow}
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
                                    onClick={saveAddSectionSubjectStudentData}
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

export default Student

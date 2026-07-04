import React, { useEffect, useState } from 'react'
import './ClassDetails.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addStudentInClass, deleteStudentFromClass, getClassById, getStudentsFromClass, updateClass } from '../../state/class/Action'
import { jwtDecode } from 'jwt-decode'

const ClassDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const { classId } = useParams();

    const dispatch = useDispatch()
    const clas = useSelector((state) => state.class)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;

    const [isEditClassModal, setIsEditClassModal] = useState(false);
    const [isEditClassTeacherModal, setIssEditClassTeacherModal] = useState(false);
    const [isClassInfo, setIsClassInfo] = useState(true);
    const [, setIsStudentInfo] = useState(false);

    const [classData, setClassData] = useState({
        name: "",
        academicYear: "",
        semester: "",
        classStatus: ""
    })



    const [classTeacherEmailOrEmpId, setClassTeacherEmailOrEmpId] = useState();

    const handleEditClass = () => {
        setIsEditClassModal(true);
        setIssEditClassTeacherModal(false);
        handleSetClassData();
    }

    const handleEditClassTeacher = () => {
        setIsEditClassModal(false);
        setIssEditClassTeacherModal(true);
        setClassTeacherEmailOrEmpId(
            clas?.class?.classTeacherResponse?.employeeId || ""
        );
    }

    const handleSetClassData = () => {
        setClassData({
            name: clas?.class?.name || "",
            academicYear: clas?.class.academicYear || "",
            semester: clas?.class?.semester || "",
            classStatus: clas?.class?.classStatus || "ACTIVE"
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
        if (isEditClassModal) {
            await dispatch(updateClass(classId, classData))
        } else {
            console.log("...")
            await dispatch(updateClass(classId, { employeeEmailOrEmployeeId: classTeacherEmailOrEmpId }))
        }
        await dispatch(getClassById(classId))
    }

    const handleViewClassInfo = () => {
        setIsClassInfo(true);
        setIsStudentInfo(false);
    }

    const handleViewStudentInfo = () => {
        setIsClassInfo(false);
        setIsStudentInfo(true);
    }

    const handleDeleteStudentFromClass = async (studentId) => {
        await dispatch(deleteStudentFromClass(classId, studentId))
        await dispatch(getStudentsFromClass(classId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getClassById(classId))
        dispatch(getStudentsFromClass(classId, pageNumber, pageSize))
    }, [dispatch, classId, pageNumber, pageSize])


    const [classStudentData, setClassStudentData] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            registrationNumber: "",
            phoneNumber: ""
        }
    ])

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

    return (
        <div className='class-container'>
            <nav class="class-nav-card navbar navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={handleViewClassInfo}
                        >
                            Class Info
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={handleViewStudentInfo}
                        >
                            Student
                        </button>
                    </li>
                </ul>
            </nav>
            {
                isClassInfo ?
                    <div className="class-card">
                        <div className="class-details-header">
                            <div>
                                <div className="class-details-avatar">
                                    <i className="bi bi-easel2-fill"></i>
                                </div>
                            </div>
                            <div className="class-details-info">
                                <div className="class-details-contact">
                                    <div>
                                        <span><strong>Name : </strong> {clas?.class?.name}</span>
                                    </div>
                                    <div>
                                        <span> <strong>Academic Year : </strong>{clas?.class?.academicYear} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Semester : </strong>{clas?.class?.semester} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Status : </strong>{clas?.class?.classStatus} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Department : </strong>{clas?.class?.departmentName} ({clas?.class?.departmentCode})</span>
                                        {
                                            isHod &&
                                            <button className="edit-icon-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#classModal"
                                                onClick={handleEditClass}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="class-details-info">
                                <div className="class-details-contact">
                                    <div>
                                        <span><strong>Class Teacher Name : </strong> {clas?.class?.classTeacherResponse?.name}</span>
                                    </div>
                                    <div>
                                        <span> <strong>EmployeeId  : </strong>{clas?.class?.classTeacherResponse?.employeeId} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Email : </strong>{clas?.class?.classTeacherResponse?.email} </span>
                                    </div>
                                    <div>
                                        <span> <strong>Phone Number : </strong>{clas?.class?.classTeacherResponse?.phoneNumber} </span>
                                        {
                                            isHod &&
                                            <button className="edit-icon-btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#classModal"
                                                onClick={handleEditClassTeacher}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <i className="bi bi-mortarboard-fill"></i>
                                <h3>{clas?.classStudents?.totalElements}</h3>
                                <span>Total Students</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="class-student-card">
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
                    </div>
            }


            <div class="modal fade" id="classModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {
                                    isEditClassTeacherModal ? "Edit Class Teacher"
                                        : "Edit Class"
                                }
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                isEditClassModal ?
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
                                            <label>Semester</label>
                                            <input type="text"
                                                className="modal-input"
                                                name="semester"
                                                value={classData.semester}
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
                                        <div className="status-group">
                                            <label className="status-title">Class Status</label>
                                            <div className="status-options">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="classStatus"
                                                        id="active"
                                                        value="ACTIVE"
                                                        checked={classData.classStatus === "ACTIVE"}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="active">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="classStatus"
                                                        id="completed"
                                                        value="COMPLETED"
                                                        checked={classData.classStatus === "COMPLETED"}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="completed">
                                                        Completed
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="form-grid">
                                        <div>
                                            <label>Class Teacher Email or EmployeeId</label>
                                            <input type="text"
                                                className="modal-input"
                                                name='classTeacherEmailOrEmpId'
                                                value={classTeacherEmailOrEmpId}
                                                onChange={(e) => setClassTeacherEmailOrEmpId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                            }

                        </div>
                        <div class="modal-footer">
                            <button onClick={setClassData} type="button"
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

export default ClassDetails

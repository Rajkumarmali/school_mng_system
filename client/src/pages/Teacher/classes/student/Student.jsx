import React, { useEffect, useState } from 'react'
import './Student.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import StudentDetail from './StudentDetail';
import { getStudentSubjectBySectionSubjectId, markStudentAttendance } from '../../../../state/teacher/Action';
const Student = () => {
    const dispatch = useDispatch();
    const teacher = useSelector((state) => state.teacher)


    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const classId = searchParams.get("classId")
    const tab = searchParams.get("tab")
    const studentSubjectId = searchParams.get("studentSubjectId")


    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
    });
    const [date, setDate] = useState(today)

    const students = teacher?.sectionSubjectStudents?.content || [];

    const presentStudent = students.filter(student => student?.attendance === "PRESENT").length;
    const absentStudent = students.filter(student => student?.attendance === "ABSENT").length


    const totalPages = teacher?.sectionSubjectStudents?.totalPages || 0;
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
            classId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            classId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            classId,
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            classId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleMarkStudentAttendance = async (studentSubjectId, status) => {
        const studentAttendanceData = {
            date,
            status
        }
        await dispatch(markStudentAttendance(studentSubjectId, studentAttendanceData))
        await dispatch(getStudentSubjectBySectionSubjectId(classId, pageNumber, pageSize, date))
    }


    useEffect(() => {
        dispatch(getStudentSubjectBySectionSubjectId(classId, pageNumber, pageSize, date))
    }, [dispatch, pageNumber, pageSize, classId, date]);



    return (
        <div>
            {
                studentSubjectId ?
                    <div>
                        <StudentDetail />
                    </div>
                    :
                    <div>
                        <div className="attendance-summary">
                            <div className="attendance-stat-card">
                                <div className="attendance-stat-icon">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                                <div>
                                    <h3>{teacher?.sectionSubjectStudents?.totalElements || 0}</h3>
                                    <span>Total Students</span>
                                </div>
                            </div>
                            <div className="attendance-stat-card attendance-date-card">
                                <div className="attendance-stat-icon">
                                    <i className="bi bi-calendar-event-fill"></i>
                                </div>

                                <div className="attendance-date-content">
                                    <label htmlFor="attendanceDate">Attendance Date</label>

                                    <input
                                        id="attendanceDate"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="attendance-stat-card present">
                                <div className="attendance-stat-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div>
                                    <h3>{presentStudent}</h3>
                                    <span>Present Students</span>
                                </div>
                            </div>

                            <div className="attendance-stat-card absent">
                                <div className="attendance-stat-icon">
                                    <i className="bi bi-x-circle-fill"></i>
                                </div>
                                <div>
                                    <h3>{absentStudent}</h3>
                                    <span>Absent Students</span>
                                </div>
                            </div>
                        </div>
                        <table className="table students-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Roll No.</th>
                                    <th>Registration No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>PhoneNumber</th>
                                    <th>Attendance</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teacher?.sectionSubjectStudents?.content?.length > 0 ?
                                        teacher?.sectionSubjectStudents?.content?.map((student, index) =>
                                            <tr key={student.id}>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{student?.studentResponse?.rollNumber}</td>
                                                <td>{student?.studentResponse?.registrationNumber}</td>
                                                <td>{student?.studentResponse?.firstName} {student?.studentResponse?.lastName}</td>
                                                <td>{student?.studentResponse?.email}</td>
                                                <td>{student?.studentResponse?.phoneNumber}</td>
                                                <td>
                                                    <button
                                                        className={`btn btn-sm custom-reset-btn me-2 ${student.attendance === "PRESENT"
                                                            ? "attendance-present"
                                                            : ""
                                                            }`}
                                                        disabled={student?.attendance === "PRESENT"}
                                                        onClick={() => handleMarkStudentAttendance(student.id, "PRESENT")}
                                                    >
                                                        <i className="bi bi-check-lg me-1"></i>
                                                        P
                                                    </button>

                                                    <button
                                                        className={`btn btn-sm custom-reset-btn me-2 ${student.attendance === "ABSENT"
                                                            ? "attendance-absent"
                                                            : ""
                                                            }`}
                                                        disabled={student?.attendance === "ABSENT"}
                                                        onClick={() => handleMarkStudentAttendance(student.id, "ABSENT")}
                                                    >
                                                        <i className="bi bi-x-lg me-1"></i>
                                                        A
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => setSearchParams({ classId, tab, page: pageNumber, size: pageSize, studentSubjectId: student?.id })}
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No Student Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{teacher?.sectionSubjectStudents?.totalElements || 0}</strong>
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
        </div>
    )
}

export default Student

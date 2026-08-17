import React, { useEffect } from 'react'
import './StudentDetail.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentSubjectById } from '../../../../state/teacher/Action';
const StudentDetail = () => {

    const dispatch = useDispatch();
    const teacher = useSelector((state) => state.teacher)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const classId = searchParams.get("classId")
    const tab = searchParams.get("tab")
    const studentSubjectId = searchParams.get("studentSubjectId")

    const attendancePercent = ((teacher?.studentSubject?.totalPresent / (teacher?.studentSubject?.totalPresent + teacher?.studentSubject?.totalAbsent)) * 100).toFixed(2);

    const handleBack = () => {
        setSearchParams({ classId, tab, page: pageNumber, size: pageSize })
    }

    useEffect(() => {
        dispatch(getStudentSubjectById(studentSubjectId))
    }, [dispatch, studentSubjectId]);

    return (
        <div>
            <div className="student-detail-header">
                <div className="d-flex gap-3">

                </div>
                <button
                    className="student-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div className="profile-card">
                <div className="fee-student-profile-header">
                    <div className="student-profile-info">
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-person-vcard-fill me-2"></i>
                                <strong>Student Details : </strong>
                            </div>
                            <div>
                                <i className="bi bi-person-badge-fill me-2"></i>
                                <span>Roll Number : {teacher?.studentSubject?.studentResponse?.rollNumber} </span>
                            </div>
                            <div>
                                <i className="bi bi-card-heading"></i>
                                <span>Registration Number : {teacher?.studentSubject?.studentResponse?.registrationNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill"></i>
                                <span>Name :  {teacher?.studentSubject?.studentResponse?.firstName} {teacher?.studentSubject?.studentResponse?.lastName}</span>
                            </div>
                            <div>
                                <i className="bi bi-gender-ambiguous"></i>
                                <span>Gender : {teacher?.studentSubject?.studentResponse?.gender}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email :  {teacher?.studentSubject?.studentResponse?.email}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill"></i>
                                <span>Phone Number : {teacher?.studentSubject?.studentResponse?.phoneNumber} </span>
                            </div>
                        </div>
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-people-fill me-2"></i>
                                <strong>Parents Details :</strong>
                            </div>
                            <div>
                                <i className="bi bi-person-fill me-2"></i>
                                <span>Father Name : {teacher?.studentSubject?.studentResponse?.parentResponse?.fatherName} </span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Father Number : {teacher?.studentSubject?.studentResponse?.parentResponse?.fatherNumber} </span>
                            </div>
                            <div>
                                <i className="bi bi-person-heart me-2"></i>
                                <span>Mother Name :   {teacher?.studentSubject?.studentResponse?.parentResponse?.motherName}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Mother Number :  {teacher?.studentSubject?.studentResponse?.parentResponse?.motherNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h5>{attendancePercent}%</h5>
                    <span>Attendance</span>
                    <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-success" style={{ width: `${attendancePercent}%` }}></div>
                    </div>
                </div>
                <div className="stat-card">
                    <i className="bi bi-check-circle-fill"></i>
                    <h3>{teacher?.studentSubject?.totalPresent}</h3>
                    <span>Total Present</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-x-circle-fill"></i>
                    <h3>{teacher?.studentSubject?.totalAbsent}</h3>
                    <span>Total Absent</span>
                </div>
            </div>
        </div>
    )
}

export default StudentDetail

import React, { useEffect } from 'react'
import './StudentResultDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentUniversityExamById } from '../../../state/universityExam/Action'

const StudentResultDetail = () => {

    const dispatch = useDispatch()
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentUniversityExamId = searchParams.get("studentUniversityExamId")

    const handleBack = () => {
        setSearchParams({ universityExamId, tab, page: pageNumber, size: pageSize })
    }

    useEffect(() => {
        dispatch(getStudentUniversityExamById(studentUniversityExamId))
    }, [dispatch, studentUniversityExamId]);

    return (
        <div>
            <div className="student-result-detail-header">
                <div className="result-header-left">
                    <div>
                        <h2>Student Result</h2>
                        <p>
                            View and manage student examination result
                        </p>
                    </div>
                </div>
                <div className="result-header-actions">
                    <button className="action-btn">
                        <i className="bi bi-printer"></i>
                        Print Result
                    </button>
                    <button className="action-btn"
                        onClick={handleBack}>
                        <i className="bi bi-arrow-left"></i>
                        Back
                    </button>
                </div>
            </div>
            <div className="student-detail-card">
                <div className="universityexam-student-detail-header">
                    <div className="student-detail-icon">
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                        <h3>Student Information</h3>
                    </div>
                </div>
                <div className="result-student-details-grid">
                    <div className="result-student-image">
                        {universityExam?.studentUniversityExam?.studentResponse?.photo ? (
                            <img
                                src={
                                    `http://localhost:8080/${universityExam.studentUniversityExam
                                        .studentResponse.photo}`
                                }
                                alt="Student"
                            />
                        ) : (
                            <div className="student-profile-placeholder">
                                <i className="bi bi-person-fill"></i>
                            </div>
                        )}
                    </div>
                    <div className='result-student-info-grid'>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-vcard-fill me-2"></i>
                                Enrollment Number :  {universityExam?.studentUniversityExam?.studentResponse?.enrollmentNumber}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-badge-fill me-2"></i>
                                Roll Number : {universityExam?.studentUniversityExam?.studentResponse?.rollNumber}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person me-2"></i>
                                Student Name : {universityExam?.studentUniversityExam?.studentResponse?.firstName + " " +
                                    universityExam?.studentUniversityExam?.studentResponse?.lastName}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-cake2-fill me-2"></i>
                                Date of birth : {new Date(universityExam?.studentUniversityExam?.studentResponse?.dob)
                                    .toLocaleDateString("en-GB", {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-gender-ambiguous me-2"></i>
                                Gender : {universityExam?.studentUniversityExam?.studentResponse?.gender}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-tags-fill me-2"></i>
                                Cast : {universityExam?.studentUniversityExam?.studentResponse?.cast}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-fill me-2"></i>
                                Father Name : {universityExam?.studentUniversityExam?.studentResponse?.fatherName}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-heart me-2"></i>
                                Mother Name : {universityExam?.studentUniversityExam?.studentResponse?.motherName}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-envelope me-2"></i>
                                Email : {universityExam?.studentUniversityExam?.studentResponse?.email}
                            </label>
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-telephone me-2"></i>
                                Phone Number : {universityExam?.studentUniversityExam?.studentResponse?.phoneNumber}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="student-info-field">
                    <label>
                        <i className="bi bi-building me-2"></i>
                        College :  {universityExam?.studentUniversityExam?.studentResponse?.collegeName}
                        {universityExam?.studentUniversityExam?.studentResponse?.collegeName &&
                            " (" + universityExam?.studentUniversityExam?.studentResponse?.collegeCode + ")"
                        }
                    </label>
                </div>
            </div>
            <div className="result-section-card">
                <div className="result-section-header">
                    <div className="result-section-title">
                        <div className="result-section-icon">
                            <i className="bi bi-mortarboard"></i>
                        </div>
                        <div>
                            <h3>Examination Information</h3>
                            <p>Examination and academic details</p>
                        </div>
                    </div>
                </div>
                <div className="result-info-grid">
                    <div className="result-info-item result-info-wide">
                        <span>Examination</span>
                        <strong>{universityExam?.studentUniversityExam?.universityExamResponse?.name}</strong>
                    </div>
                    <div className="result-info-item">
                        <span>Academic Year</span>
                        <strong>
                            <i className="bi bi-calendar3"></i>
                            {universityExam?.studentUniversityExam?.universityExamResponse?.academicYear}
                        </strong>
                    </div>

                    <div className="result-info-item">
                        <span>Course</span>
                        <strong>
                            <i className="bi bi-building"></i>
                            {universityExam?.studentUniversityExam?.universityExamResponse?.courseCode}
                        </strong>
                    </div>

                    <div className="result-info-item">
                        <span>Year</span>
                        <strong>
                            <i className="bi bi-calendar3"></i>
                            Year {universityExam?.studentUniversityExam?.universityExamResponse?.year}
                        </strong>
                    </div>

                    <div className="result-info-item">
                        <span>Semester</span>
                        <strong>
                            <i className="bi bi-layers"></i>
                            Semester {universityExam?.studentUniversityExam?.universityExamResponse?.semester}
                        </strong>
                    </div>
                </div>
            </div>
            <div className="result-summary-grid">
                <div className="result-summary-card">
                    <div className="summary-icon">
                        <i className="bi bi-journal-check"></i>
                    </div>
                    <div>
                        <span>Total Subjects</span>
                        <strong>{universityExam?.studentUniversityExam?.studentUniversityExamSubjectResponse?.length}</strong>
                    </div>
                </div>
                <div className="result-summary-card">
                    <div className="summary-icon">
                        <i className="bi bi-award"></i>
                    </div>
                    <div>
                        <span>Total Marks</span>
                        <strong>
                            {universityExam?.studentUniversityExam?.totalObtainMarks} / {universityExam?.studentUniversityExam?.totalMarks}
                        </strong>
                    </div>
                </div>

                <div className="result-summary-card">
                    <div className="summary-icon">
                        <i className="bi bi-percent"></i>
                    </div>
                    <div>
                        <span>Percentage</span>
                        <strong>{((universityExam?.studentUniversityExam?.totalObtainMarks / universityExam?.studentUniversityExam?.totalMarks) * 100).toFixed(2)}%</strong>
                    </div>
                </div>
                <div className="result-summary-card">
                    <div className="summary-icon">
                        <i className="bi bi-star"></i>
                    </div>
                    <div>
                        <span>Total Credits</span>
                        <strong>{universityExam?.studentUniversityExam?.earnedCredits}</strong>
                    </div>
                </div>
            </div>
            <div className="result-section-card">
                <div className="result-section-header">
                    <div className="result-section-title">
                        <div className="result-section-icon">
                            <i className="bi bi-table"></i>
                        </div>
                        <div>
                            <h3>Subject-wise Result</h3>
                            <p>Marks and result details for each subject</p>
                        </div>
                    </div>
                </div>
                <div className="student-result-table-wrapper">
                    <table className="student-result-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Subject</th>
                                <th>Code</th>
                                <th>Type</th>
                                <th>Credit</th>
                                <th>Max Marks</th>
                                <th>Obtained</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {universityExam?.studentUniversityExam?.studentUniversityExamSubjectResponse.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}.</td>
                                    <td>{item?.subjectResponse?.name} {item?.subjectResponse?.shortName}</td>
                                    <td>{item?.subjectResponse.code} </td>
                                    <td>{item?.subjectResponse?.subjectType}</td>
                                    <td> {item?.earnedCredits} </td>
                                    <td>{item?.subjectResponse?.maxMarks}</td>
                                    <td>{item?.obtainMarks}</td>
                                    <td>{item?.resultStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="final-result-card">
                <div className="final-result-left">
                    <div className="final-result-icon">
                        <i className="bi bi-trophy-fill"></i>
                    </div>
                    <div>
                        <span>Final Result</span>
                        <h2>
                            {universityExam?.studentUniversityExam?.resultStatus}
                        </h2>
                    </div>
                </div>
                <div className="final-result-details">

                    <div>
                        <span>Total Marks</span>
                        <strong>
                            {universityExam?.studentUniversityExam?.totalObtainMarks} / {universityExam?.studentUniversityExam?.totalMarks}
                        </strong>
                    </div>

                    <div>
                        <span>Percentage</span>
                        <strong>
                            {((universityExam?.studentUniversityExam?.totalObtainMarks / universityExam?.studentUniversityExam?.totalMarks) * 100).toFixed(2)}%
                        </strong>
                    </div>
                    <div>
                        <span>Credits</span>
                        <strong>
                            {universityExam?.studentUniversityExam?.earnedCredits}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentResultDetail
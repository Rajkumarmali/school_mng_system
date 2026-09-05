import React, { useEffect } from 'react'
import './StudentUniversityExam.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { downloadStudentApplicationForm, getStudentUniversityExamsByUserId } from '../../../state/universityExam/Action';
import UniversityExamForm from './UniversityExamForm';

const StudentUniversityExam = () => {

    const dispactch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentUniversityExamId = searchParams.get("studentUniversityExamId")

    const current = new Date();
    const currentDate = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate()
    );


    const formatDate = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const checkRegistrationOpen = (startDate, endDate) => {
        const formStart = new Date(startDate)
        const formStartDate = new Date(
            formStart.getFullYear(),
            formStart.getMonth(),
            formStart.getDate()
        )
        const formEnd = new Date(endDate)
        const formEndDate = new Date(
            formEnd.getFullYear(),
            formEnd.getMonth(),
            formEnd.getDate()
        )
        return currentDate >= formStartDate && currentDate <= formEndDate
    }

    const checkFormClose = (startDate, endDate) => {
        const formEnd = new Date(endDate)
        const formEndDate = new Date(
            formEnd.getFullYear(),
            formEnd.getMonth(),
            formEnd.getDate()
        )

        return currentDate > formEndDate
    }

    const handleDownloadApplicationForm = async (id) => {
        const pdfBlob = await dispactch(downloadStudentApplicationForm(id));
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank")
    }

    useEffect(() => {
        dispactch(getStudentUniversityExamsByUserId(pageNumber, pageSize))
    }, [dispactch, pageNumber, pageSize]);

    return (
        <div className="student-universityexam-container">
            {
                studentUniversityExamId ?
                    <div>
                        <UniversityExamForm />
                    </div>
                    :
                    <div className='students-universityexam-card'>
                        <div className="student-university-header">
                            <div className="student-university-title">
                                <div className="student-university-icon">
                                    <i className="bi bi-mortarboard-fill"></i>
                                </div>
                                <div>
                                    <h2>University Examinations</h2>
                                    <p>
                                        View and register for your university examinations
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="university-exam-info-banner">
                            <div className="info-banner-icon">
                                <i className="bi bi-info-circle-fill"></i>
                            </div>
                            <div>
                                <strong>Examination Registration</strong>
                                <p>
                                    Register for your university examination before the
                                    registration deadline.
                                </p>
                            </div>

                        </div>

                        <div className="student-university-exam-section">
                            <div className="exam-section-header">
                                <div>
                                    <h3>Available Examinations</h3>
                                    <p>
                                        University examinations available for your course
                                    </p>
                                </div>
                            </div>
                            <div className="student-university-exam-list">
                                {universityExam?.studentUniversityExamsByUser?.content?.map((exam) => (
                                    <div
                                        className="student-university-exam-card"
                                        key={exam.id}
                                    >
                                        <div className="student-exam-card-top">
                                            <div className="student-exam-main-info">
                                                <div className="student-exam-card-icon">
                                                    <i className="bi bi-file-earmark-text-fill"></i>
                                                </div>
                                                <div>
                                                    <h3>{exam?.universityExamResponse?.name}</h3>
                                                    <p>
                                                        {exam?.universityExamResponse?.courseName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="student-exam-details">
                                            <div className="student-exam-detail">
                                                <i className="bi bi-book"></i>
                                                <div>
                                                    <span>Course</span>
                                                    <strong>
                                                        {exam.universityExamResponse.courseCode}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="student-exam-detail">
                                                <i className="bi bi-calendar3"></i>
                                                <div>
                                                    <span>Academic Year</span>
                                                    <strong>
                                                        {exam.universityExamResponse.academicYear}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="student-exam-detail">
                                                <i className="bi bi-mortarboard"></i>
                                                <div>
                                                    <span>Year / Semester</span>
                                                    <strong>
                                                        Year {exam.universityExamResponse.year} / Semester {exam.universityExamResponse.semester}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="registration-window">
                                            <div className="registration-date">
                                                <i className="bi bi-calendar-plus"></i>
                                                <div>
                                                    <span>Registration Starts</span>
                                                    <strong>
                                                        {formatDate(exam.universityExamResponse.formStartAt)}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="registration-arrow">
                                                <i className="bi bi-arrow-right"></i>
                                            </div>
                                            <div className="registration-date">
                                                <i className="bi bi-calendar-check"></i>
                                                <div>
                                                    <span>Registration Ends</span>
                                                    <strong>
                                                        {formatDate(exam.universityExamResponse.formEndAt)}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="student-exam-card-footer">
                                            <div className="registration-status">
                                                {
                                                    checkFormClose(exam.universityExamResponse.formStartAt, exam.universityExamResponse.formEndAt) ?
                                                        exam.filledFrom ?
                                                            <>
                                                                <i className="bi bi-check-circle-fill"></i>
                                                                <span>Registration Completed</span>
                                                            </>
                                                            :
                                                            <>
                                                                <i className="bi bi-x-circle-fill"></i>
                                                                <span>Registration Not Completed</span>
                                                            </>
                                                        :
                                                        !checkRegistrationOpen(exam.universityExamResponse.formStartAt, exam.universityExamResponse.formEndAt) ?
                                                            <>
                                                                <i className="bi bi-clock-fill"></i>
                                                                <span>Registration Not Open</span>
                                                            </>
                                                            :
                                                            exam.filledFrom ?
                                                                <>
                                                                    <i className="bi bi-check-circle-fill"></i>
                                                                    <span>Registration Completed</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <i className="bi bi-exclamation-circle-fill"></i>
                                                                    <span>Registration Pending</span>
                                                                </>
                                                }
                                            </div>
                                            <div className="student-exam-actions">
                                                {
                                                    exam.filledFrom &&
                                                    <>
                                                        <button className="register-exam-btn"
                                                            onClick={() => handleDownloadApplicationForm(exam.id)}
                                                        >
                                                            <i className="bi bi-printer-fill me-2"></i>
                                                            Application Print { }
                                                        </button>
                                                        {/* <button className="register-exam-btn"

                                                        >
                                                            <i className="bi bi-person-vcard-fill me-2"></i>
                                                            Admit Card
                                                        </button> */}
                                                    </>
                                                }
                                                {
                                                    checkRegistrationOpen(exam.universityExamResponse.formStartAt, exam.universityExamResponse.formEndAt) ?
                                                        exam.filledFrom ?
                                                            <button className="registered-btn">
                                                                <i className="bi bi-check-lg me-2"></i>
                                                                Registered
                                                            </button>
                                                            :
                                                            <button className="register-exam-btn"
                                                                onClick={() => setSearchParams({ page: pageNumber, size: pageSize, studentUniversityExamId: exam.id })}
                                                            >
                                                                <i className="bi bi-pencil-square me-2"></i>
                                                                Register Now
                                                            </button>
                                                        :
                                                        checkFormClose(exam.universityExamResponse.formStartAt, exam.universityExamResponse.formEndAt) ?
                                                            <button
                                                                className="disabled-register-btn"
                                                                disabled
                                                            >
                                                                <i className="bi bi-lock-fill me-2"></i>
                                                                Registration Closed..
                                                            </button>
                                                            :
                                                            <button
                                                                className="disabled-register-btn"
                                                                disabled
                                                            >
                                                                <i className="bi bi-clock-fill me-2"></i>
                                                                <span>Registration Not Open</span>
                                                            </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default StudentUniversityExam


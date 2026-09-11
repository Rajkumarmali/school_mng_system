import React, { useEffect, useState } from 'react'
import './UniversityExamForm.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentUniversityExamById, getStudentUniversityExamsByUserId, getUniversityExamSubjects, saveStudentUniversityExamForm } from '../../../state/universityExam/Action';


const UniversityExamForm = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentUniversityExamId = searchParams.get("studentUniversityExamId")

    const [selectedSubjects, setSelectedSubjects] = useState([])
    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        )
    }

    const handleBack = () => {
        setSearchParams({ page: pageNumber, size: pageSize })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(saveStudentUniversityExamForm(universityExam?.studentUniversityExam?.id, selectedSubjects))
        await dispatch(getStudentUniversityExamsByUserId(pageNumber, pageSize));
        handleBack();
    }

    useEffect(() => {
        dispatch(getStudentUniversityExamById(studentUniversityExamId))
    }, [dispatch, studentUniversityExamId]);

    useEffect(() => {
        const examId = universityExam?.studentUniversityExam?.universityExamResponse?.id;
        if (!examId) return
        dispatch(getUniversityExamSubjects(examId))
    }, [dispatch, universityExam?.studentUniversityExam?.universityExamResponse?.id])


    return (
        <div className="university-exam-form-container">
            <div className="university-form-header">
                <div className="university-form-title">
                    <div className="university-form-icon">
                        <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div>
                        <h2>University Examination Form</h2>
                        <p>
                            Complete your examination registration form
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="university-form-back-btn"
                    // onClick={() => window.history.back()}
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                </button>
            </div>
            <div className="university-form-card">
                <div className="form-card-header">
                    <div className="form-card-header-icon">
                        <i className="bi bi-file-earmark-text-fill"></i>
                    </div>
                    <div>
                        <h3>Examination Details</h3>
                        <p>
                            Details of the university examination
                        </p>
                    </div>
                </div>
                <div className="exam-info-grid">
                    <div className="exam-info-item">
                        <i className="bi bi-journal-text"></i>
                        <div>
                            <span>Examination</span>
                            <strong>
                                {universityExam?.studentUniversityExam?.universityExamResponse?.name}
                            </strong>
                        </div>
                    </div>
                    <div className="exam-info-item">
                        <i className="bi bi-book"></i>

                        <div>
                            <span>Course</span>
                            <strong>
                                {universityExam?.studentUniversityExam?.universityExamResponse?.courseName} ({universityExam?.studentUniversityExam?.universityExamResponse?.courseCode})
                            </strong>
                        </div>
                    </div>
                    <div className="exam-info-item">
                        <i className="bi bi-calendar3"></i>
                        <div>
                            <span>Academic Year</span>
                            <strong>{universityExam?.studentUniversityExam?.universityExamResponse?.academicYear}</strong>
                        </div>
                    </div>
                    <div className="exam-info-item">
                        <i className="bi bi-mortarboard"></i>
                        <div>
                            <span>Year / Semester</span>
                            <strong>
                                Year {universityExam?.studentUniversityExam?.universityExamResponse?.year} / Semester {universityExam?.studentUniversityExam?.universityExamResponse?.semester}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="university-form-card">
                <div className="form-card-header">
                    <div className="form-card-header-icon">
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                        <h3>Student Information</h3>
                        <p>
                            Verify your personal information
                        </p>
                    </div>
                </div>
                <div className="student-details-grid">
                    <div className="student-profile-image">
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
                    <div className='student-info-grid'>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-vcard-fill me-1"></i>
                                Enrollment Number
                            </label>
                            <input
                                type="text"
                                value={universityExam?.studentUniversityExam?.studentResponse?.enrollmentNumber}
                                readOnly
                            />
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-person-badge-fill me-2"></i>
                                Roll Number
                            </label>
                            <input
                                type="text"
                                value={universityExam?.studentUniversityExam?.studentResponse?.rollNumber}
                                readOnly
                            />
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-credit-card-2-front-fill me-2"></i>
                                Aadhar Number
                            </label>
                            <input
                                type="text"
                                value={universityExam?.studentUniversityExam?.studentResponse?.aadhaarNumber}
                                readOnly
                            />
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-cake2-fill me-2"></i>
                                Date of birth
                            </label>
                            <input
                                type="text"
                                value={new Date(universityExam?.studentUniversityExam?.studentResponse?.dob)
                                    .toLocaleDateString("en-GB", {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                readOnly
                            />
                        </div>
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-gender-ambiguous me-2"></i>
                                Gender
                            </label>
                            <input
                                type="text"
                                value={universityExam?.studentUniversityExam?.studentResponse?.gender}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="student-info-grid">
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-person me-1"></i>
                            Student Name
                        </label>
                        <input
                            type="text"
                            value={universityExam?.studentUniversityExam?.studentResponse?.firstName + " " +
                                universityExam?.studentUniversityExam?.studentResponse?.lastName}
                            readOnly
                        />
                    </div>
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-person-fill me-2"></i>
                            Father Name
                        </label>
                        <input
                            type="email"
                            value={universityExam?.studentUniversityExam?.studentResponse?.fatherName}
                            readOnly
                        />
                    </div>
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-person-heart me-2"></i>
                            Mother Name
                        </label>
                        <input
                            type="email"
                            value={universityExam?.studentUniversityExam?.studentResponse?.motherName}
                            readOnly
                        />
                    </div>
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-tags-fill me-2"></i>
                            Cast
                        </label>
                        <input
                            type="text"
                            value={universityExam?.studentUniversityExam?.studentResponse?.cast}
                            readOnly
                        />
                    </div>
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-envelope me-1"></i>
                            Email
                        </label>
                        <input
                            type="email"
                            value={universityExam?.studentUniversityExam?.studentResponse?.email}
                            readOnly
                        />
                    </div>
                    <div className="student-info-field">
                        <label>
                            <i className="bi bi-telephone me-1"></i>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            value={universityExam?.studentUniversityExam?.studentResponse?.phoneNumber}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div className="university-form-card">
                <div className="form-card-header">
                    <div className="form-card-header-icon">
                        <i className="bi bi-journals"></i>
                    </div>
                    <div>
                        <h3>Select Examination Subjects</h3>
                        <p>
                            Select the subjects for which you want to appear
                        </p>
                    </div>
                </div>
                <div className="subject-table">
                    <div className="subject-table-header">
                        <span>Select</span>
                        <span>Subject Code</span>
                        <span>Subject Name</span>
                        <span>Subject Type</span>
                        <span>Credits</span>
                    </div>
                    {
                        universityExam?.universityExamSubjects?.map(subject => (
                            <label
                                className={`subject-row ${selectedSubjects.includes(subject.id)
                                    ? 'subject-selected'
                                    : ''
                                    }`}
                                key={subject.id}
                            >
                                <div className="subject-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedSubjects.includes(
                                            subject.id
                                        )}
                                        onChange={() =>
                                            handleSubjectChange(subject.id)
                                        }
                                    />
                                </div>
                                <span className="subject">
                                    {subject.subjectResponse?.code}
                                </span>
                                <span className="subject">
                                    {subject.subjectResponse.name}
                                </span>
                                <span className="subject">
                                    {subject.subjectResponse.subjectType}
                                </span>
                                <span className="subject">
                                    {subject.subjectResponse.credit}
                                </span>
                            </label>

                        ))}
                </div>
                <div className="subject-summary">
                    <div>
                        <span>Selected Subjects</span>
                        <strong>
                            {selectedSubjects.length}
                        </strong>
                    </div>
                    <div>
                        <span>Total Subjects</span>
                        <strong>
                            {universityExam?.universityExamSubjects?.length}
                        </strong>
                    </div>
                </div>
            </div>
            <div className="university-form-notice">
                <div className="notice-icon">
                    <i className="bi bi-exclamation-circle-fill"></i>
                </div>
                <div>
                    <strong>Important Information</strong>
                    <p>
                        Please verify all the information before submitting
                        your examination form. Once submitted, changes may
                        not be allowed.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="university-form-declaration">
                    <label>
                        <input
                            type="checkbox"
                            required
                        />
                        <span>
                            I confirm that all the information provided above
                            is correct and I agree to appear for the selected
                            subjects in the university examination.
                        </span>
                    </label>
                </div>
                <div className="university-form-footer">
                    <div className="form-footer-info">
                        <i className="bi bi-shield-check"></i>
                        <span>
                            Please review your form before submitting.
                        </span>
                    </div>
                    <div className="form-footer-actions">
                        <button
                            type="button"
                            className="form-cancel-btn"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="form-submit-btn"
                            disabled={selectedSubjects.length === 0}
                        >
                            {
                                universityExam?.isLoading ?
                                    <>
                                        Submitting...
                                    </>
                                    :
                                    <>
                                        <i className="bi bi-send-fill"></i>
                                        Submit Examination Form
                                    </>
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UniversityExamForm

import React, { useEffect, useState } from 'react'
import './StudentDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getStudentUniversityExamById, updateStudentUniversityExamCenter } from '../../../state/universityExam/Action';

const StudentDetail = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentExamId = searchParams.get("studentExamId")

    const [centerCollegeCode, setCenterCollegeCode] = useState(universityExam?.studentUniversityExam?.examCenterCollegeCode || "");

    const handleBack = () => {
        setSearchParams({
            universityExamId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleUpdateExamCenter = async () => {
        if (!centerCollegeCode || centerCollegeCode.trim() === "") {
            alert("Please enter a valid exam center college code.");
            return;
        }
        await dispatch(updateStudentUniversityExamCenter(studentExamId, centerCollegeCode));
        await dispatch(getStudentUniversityExamById(studentExamId, pageNumber, pageSize));
    }

    useEffect(() => {
        dispatch(getStudentUniversityExamById(studentExamId))
    }, [dispatch, studentExamId]);


    return (
        <div>
            <div className="university-exam-student-detail-header">
                <div className="university-exam-student-detail-title">
                    <h5>Student Exam Detail</h5>
                </div>
                <button
                    type="button"
                    className="university-exam-student-detail-back-btn"
                    // onClick={() => window.history.back()}
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                </button>
            </div>
            <div className="student-detail-card">
                <div className="student-details-card-header">
                    <div className="student-details-card-header-icon">
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
                    <div className="exam-info-item">
                        <i className="bi bi-geo-alt-fill"></i>
                        <div>
                            <span>Exam center
                                <button className='exam-center-edit-btn'
                                    data-bs-toggle="modal"
                                    data-bs-target="#updateExamCenterModal"
                                    onClick={() => setCenterCollegeCode(universityExam?.studentUniversityExam?.examCenterCollegeCode || "")}
                                >
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                            </span>
                            <strong>
                                {universityExam?.studentUniversityExam?.examCenterCollegeName}
                                {
                                    universityExam?.studentUniversityExam?.examCenterCollegeCode &&
                                    " (" + universityExam?.studentUniversityExam?.examCenterCollegeCode + ")"
                                }
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="student-detail-card">
                <div className="universityexam-student-detail-header">
                    <div className="student-detail-icon">
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
                                <i className="bi bi-credit-card-2-front-fill me-2"></i>
                                Aadhar Number : {universityExam?.studentUniversityExam?.studentResponse?.aadhaarNumber}
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
                                <i className="bi bi-tags-fill me-2"></i>
                                Cast : {universityExam?.studentUniversityExam?.studentResponse?.cast}
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
                        <div className="student-info-field">
                            <label>
                                <i className="bi bi-clipboard-check me-2"></i>
                                Application Status : {universityExam?.studentUniversityExam?.filledFrom ? "FILLED" : "PENDING"}
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
            <div className="student-detail-card">
                <div className="subject-card-header">
                    <div className="subject-card-header-icon">
                        <i className="bi bi-journals"></i>
                    </div>
                    <div>
                        <h3>Selected Examination Subjects</h3>
                    </div>
                </div>
                <div className="subject-table">
                    <div className="subject-table-header">
                        <span>S.No</span>
                        <span>Subject Code</span>
                        <span>Subject Name</span>
                        <span>Subject Type</span>
                        <span>Credits</span>
                    </div>
                    {
                        universityExam?.studentUniversityExam?.studentUniversityExamSubjectResponse?.length > 0 ?
                            universityExam?.studentUniversityExam?.studentUniversityExamSubjectResponse?.map((subject, index) =>
                                <label className="subject-row" key={subject.id}>
                                    <span>{index + 1}.</span>
                                    <span className="subject">{subject?.subjectResponse?.code}</span>
                                    <span className="subject">{subject?.subjectResponse?.name}</span>
                                    <span className="subject">{subject?.subjectResponse?.subjectType}</span>
                                    <span className="subject">{subject?.subjectResponse?.credit}</span>
                                </label>
                            )
                            :
                            <div className="no-subjects col-12 text-center">
                                No Subjects Found
                            </div>
                    }
                </div>
            </div>

            <div class="modal fade" id="updateExamCenterModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Exam Center</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Exam Center College Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="centerCollegeCode"
                                        value={centerCollegeCode}
                                        onChange={(e) => setCenterCollegeCode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button

                                    type="button"
                                    class="student-modal-btn"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleUpdateExamCenter}
                                    type="button"
                                    class="student-modal-btn" data-bs-dismiss="modal"
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

export default StudentDetail

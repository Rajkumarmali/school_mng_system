import React, { useEffect } from 'react'
import './StudentDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getStudentFromSectionByStudentId } from '../../../state/section/Action';
import Attendance from './Attendance/Attendance';

const StudentDetail = () => {

    const dispatch = useDispatch();
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const tab = searchParams.get("tab")
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const studentId = searchParams.get("studentId")
    const action = searchParams.get("action")

    const handleBack = () => {
        setSearchParams({ sectionId, tab, page, size })
    }

    useEffect(() => {
        dispatch(getStudentFromSectionByStudentId(studentId))
    }, [dispatch, studentId])

    return (
        <div>
            <div className="section-student-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="back-section-student-detail-btn"
                        onClick={() => setSearchParams({ sectionId, tab, page, size, studentId, action: "studentDetail" })}
                    >
                        Studnt details
                    </button>
                    <button
                        className="back-section-student-detail-btn"
                        onClick={() => setSearchParams({ sectionId, tab, page, size, studentId, action: "attendance" })}
                    >
                        Attendance
                    </button>
                </div>
                <button
                    className="back-section-student-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div>
                {
                    action === "attendance" ?
                        <div>
                            <Attendance />
                        </div>
                        :
                        <div className="section-student-detail-card">
                            <div className="section-student-detail-info">
                                <div className="section-student-detail-contact">
                                    <div>
                                        <i className="bi bi-person-vcard-fill me-2"></i>
                                        <span>
                                            <strong>Student Details  :</strong>
                                        </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-123 me-2"></i>
                                        <span>Roll Number : {section?.sectionStudent?.rollNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-card-heading"></i>
                                        <span>Registration Number : {section?.sectionStudent?.registrationNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-person-fill"></i>
                                        <span>Name :  {section?.sectionStudent?.firstName} {section?.sectionStudent?.lastName}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-gender-ambiguous"></i>
                                        <span>Gender :  {section?.sectionStudent?.gender}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill"></i>
                                        <span>Phone Number :  {section?.sectionStudent?.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-envelope-fill"></i>
                                        <span>Email :  {section?.sectionStudent?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="student-profile-info">
                                <div className="student-profile-contact">
                                    <div>
                                        <i className="bi bi-people-fill me-2"></i>
                                        <span>
                                            <strong>Parents Details  :</strong>
                                        </span>
                                    </div>
                                    <div>
                                        <i className="bi bi-person-fill"></i>
                                        <span>Father Name : {section?.sectionStudent?.parentResponse?.fatherName}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        <span>Father Number : {section?.sectionStudent?.parentResponse?.fatherNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-person-heart me-2"></i>
                                        <span>Mother Name : {section?.sectionStudent?.parentResponse?.motherName}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        <span>Mothe Number : {section?.sectionStudent?.parentResponse?.motherNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default StudentDetail

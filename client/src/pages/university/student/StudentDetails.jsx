import React, { useEffect, useState } from 'react'
import './StudentDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversityStudentById } from '../../../state/university/Action';
import { getDocumentById, getDocuments, updateStudentDocumentStatus } from '../../../state/student/Action';
import { generateStudentEnrollmentAndRollnumber } from '../../../state/college/Action';

const StudentDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")
    const studentId = searchParams.get("studentId")
    const action = searchParams.get("action")

    const dispatch = useDispatch()
    const university = useSelector((state) => state.university)
    const student = useSelector((state) => state.student)

    const [isViewModel, setIsViewModel] = useState(false);
    const [viewDocument, setViewDocument] = useState(null);

    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(viewDocument?.filePath);


    const handleBack = () => {
        if (action === "document") {
            setSearchParams({
                tab,
                page: pageNumber,
                size: pageSize,
                studentId
            })
        } else {
            setSearchParams({
                tab,
                page: pageNumber,
                size: pageSize
            })
        }
    }

    const handleViewDocuments = async () => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize,
            studentId,
            action: "document"
        })
    }

    const handleViewDocument = async (documentId) => {
        await dispatch(getDocumentById(documentId));
        setIsViewModel(true)
    }

    const handleUpdateDocumentStatus = async (documentId, documentType, status) => {
        await dispatch(updateStudentDocumentStatus(documentId, status));
        await dispatch(getDocuments(studentId));
    }

    const handleGenerateEnrollmentAndRoll = async () => {
        await dispatch(generateStudentEnrollmentAndRollnumber(studentId))
        await dispatch(getUniversityStudentById(studentId))
    }

    useEffect(() => {
        if (isViewModel && student?.document) {
            setViewDocument(student?.document)
        }
    }, [student.document, isViewModel]);

    useEffect(() => {
        if (action === 'document') {
            dispatch(getDocuments(studentId))
        }
        dispatch(getUniversityStudentById(studentId))
    }, [dispatch, studentId, action]);

    return (
        <div>
            <div className="university-student-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="university-student-detail-btn"
                        onClick={handleViewDocuments}
                    >
                        Document
                    </button>
                    {
                        !university?.universityStudent?.enrollmentNumber &&
                        <button
                            className="university-student-detail-btn"
                            onClick={handleGenerateEnrollmentAndRoll}
                        >
                            Generate EnrollmentNo
                        </button>
                    }
                </div>
                <button
                    className="university-student-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            {
                action === 'document' ?
                    <div>
                        <table className="table student-document-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student?.documents?.length > 0 ?
                                        student?.documents?.map((document, index) =>
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td>{document.documentType}</td>
                                                <td>{document.documentName}</td>
                                                <td>
                                                    {document.status === "VERIFIED" && (
                                                        <span className="badge bg-success">
                                                            <i className="bi bi-check-circle-fill me-1"></i>
                                                            Verified
                                                        </span>
                                                    )}
                                                    {document.status === "PENDING" && (
                                                        <span className="badge bg-warning text-dark">
                                                            <i className="bi bi-hourglass-split me-1"></i>
                                                            Pending
                                                        </span>
                                                    )}
                                                    {document.status === "REJECTED" && (
                                                        <span className="badge bg-danger">
                                                            <i className="bi bi-x-circle-fill me-1"></i>
                                                            Rejected
                                                        </span>
                                                    )}
                                                </td>
                                                <td className='text-center'>
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#viewDocumentModal"
                                                            onClick={() => handleViewDocument(document.id)}
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>

                                                        {document.status !== "VERIFIED" && (
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    handleUpdateDocumentStatus(
                                                                        document.id,
                                                                        "",
                                                                        "VERIFIED"
                                                                    )
                                                                }
                                                                title="Verify"
                                                            >
                                                                <i className="bi bi-check-lg me-1"></i>
                                                                Verify
                                                            </button>
                                                        )}
                                                        {document.status !== "REJECTED" && (
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    handleUpdateDocumentStatus(
                                                                        document.id,
                                                                        document.documentType,
                                                                        "REJECTED"
                                                                    )
                                                                }
                                                                title="Reject"
                                                            >
                                                                <i className="bi bi-x-lg me-1"></i>
                                                                Reject
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                No Documents Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <div className="university-student-profile-header">
                            <div>
                                <div className="university-student-profile-avatar">
                                    {
                                        university?.universityStudent?.image ?
                                            <img src={`http://localhost:8080/${university?.universityStudent?.image}`} alt=""
                                                className='student-image' />
                                            : <i className="bi bi-person-fill"></i>
                                    }
                                </div>
                            </div>
                            <div className="university-student-profile-info">
                                <div className="university-student-profile-contact">
                                    <div>
                                        <i className="bi bi-person-vcard-fill me-2"></i>
                                        <span>Roll No. : {university?.universityStudent?.rollNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-upc-scan me-2"></i>
                                        <span>Enrollment No. : {university?.universityStudent?.enrollmentNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        <span>Phone No. : {university?.universityStudent?.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        <span>Email : {university?.universityStudent?.email}</span>
                                    </div>
                                </div>
                                <div className="university-student-profile-contact">
                                    <div>
                                        <i className="bi bi-journal-bookmark-fill me-2"></i>
                                        <span>Course : {university?.universityStudent?.course}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-diagram-3-fill me-2"></i>
                                        <span>Department : {university?.universityStudent?.department}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="university-student-profile-body">
                            <div className="simple-section">
                                <div className="info-line">
                                    <h5>Personal Information : </h5>
                                </div>
                                <div className="info-line">
                                    <span><strong>Name :</strong> {university?.universityStudent?.name}</span>
                                    <span><strong>Father Name :</strong> {university?.universityStudent?.parentResponse?.fatherName}</span>
                                    <span><strong>Mother Name :</strong> {university?.universityStudent?.parentResponse?.motherName}</span>
                                    <span><strong>Mobile Number :</strong> {university?.universityStudent?.phoneNumber}</span>
                                    <span><strong>Email :</strong> {university?.universityStudent?.email}</span>
                                    <span><strong>Gender :</strong> {university?.universityStudent?.gender}</span>
                                    <span><strong>Cast :</strong> {university?.universityStudent?.cast}</span>
                                    <span><strong>Aadhar :</strong> {university?.universityStudent?.aadhaarNumber}</span>
                                    <span><strong>DOB :</strong> {university?.universityStudent?.dob}</span>
                                    <span><strong>Father Number :</strong> {university?.universityStudent?.parentResponse?.fatherNumber}</span>
                                    <span><strong>Mother Number :</strong> {university?.universityStudent?.parentResponse?.motherNumber}</span>
                                    <span><strong>Father Occupation :</strong> {university?.universityStudent?.parentResponse?.fatherOccupation}</span>
                                    <span><strong>Mother Occupation :</strong> {university?.universityStudent?.parentResponse?.motherOccupation}</span>
                                </div>
                            </div>
                            <div className="simple-section">
                                <div className="info-line">
                                    <h5>Address Information : </h5>
                                </div>
                                <div className="info-line">
                                    <span><strong>Address :</strong> {university?.universityStudent?.addressResponse?.address}</span>
                                    <span><strong>City :</strong> {university?.universityStudent?.addressResponse?.city}</span>
                                    <span><strong>District :</strong> {university?.universityStudent?.addressResponse?.district}</span>
                                    <span><strong>State :</strong> {university?.universityStudent?.addressResponse?.state}</span>
                                    <span><strong>Country :</strong> {university?.universityStudent?.addressResponse?.country}</span>
                                    <span><strong>Pincode :</strong> {university?.universityStudent?.addressResponse?.pincode}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <div className="modal fade" id="viewDocumentModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {viewDocument?.documentName}
                            </h5>
                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">

                            <p>
                                <strong>Type :</strong> {viewDocument?.documentType}
                            </p>

                            {
                                isImage ? (
                                    <img
                                        src={`http://localhost:8080/${viewDocument?.filePath}`}
                                        className="img-fluid"
                                        alt="Document"
                                    />
                                ) : (
                                    <a
                                        href={`http://localhost:8080/${viewDocument?.filePath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open PDF
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails

import React, { useEffect, useState } from 'react'
import './StudentDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateStudentEnrollmentAndRollnumber, getCollegeStudentById } from '../../../state/college/Action';
import { getDocumentById, getDocuments, updateStudentDocumentStatus } from '../../../state/student/Action';
import { createNotification } from '../../../state/notification/Action';

const StudentDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")
    const collegeId = searchParams.get("collegeId")
    const studentId = searchParams.get("studentId")
    const action = searchParams.get("action")

    const dispatch = useDispatch();
    const college = useSelector((state) => state.college);
    const student = useSelector((state) => state.student)

    const [isViewModel, setIsViewModel] = useState(false);
    const [viewDocument, setViewDocument] = useState(null);

    const [notificationData, setNotificationData] = useState({
        title: "",
        message: "",
        userEmail: college?.college?.email,
    })

    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(viewDocument?.filePath);


    const handleBack = () => {
        if (action === "document") {
            setSearchParams({
                collegeId,
                tab,
                page: pageNumber,
                size: pageSize,
                studentId
            })
        } else {
            setSearchParams({
                collegeId,
                tab,
                page: pageNumber,
                size: pageSize
            })
        }
    }

    const handleGenerateEnrollmentAndRoll = async () => {
        await dispatch(generateStudentEnrollmentAndRollnumber(studentId))
        await dispatch(getCollegeStudentById(studentId))
    }

    const handleViewDocuments = async () => {
        setSearchParams({
            collegeId,
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

    const handleChangeNotification = (e) => {
        const { name, value } = e.target
        setNotificationData({
            ...notificationData,
            [name]: value
        })
    }

    const handleSendNotification = async () => {
        const payload = {
            ...notificationData,
            message: `Student ${college?.collegeStudent?.name}: ${notificationData.message}`,
        };
        await dispatch(createNotification(payload))
    }

    const handleUpdateDocumentStatus = async (documentId, documentType, status) => {
        if (status === "REJECTED") {
            const payload = {
                title: "Student Document Rejected",
                message: `${documentType} submitted by student ${college?.collegeStudent?.name} has been rejected. Please instruct the student to upload a valid document for verification.`,
                userEmail: college?.college?.email
            }
            await dispatch(createNotification(payload))
        }
        await dispatch(updateStudentDocumentStatus(documentId, status));
        await dispatch(getDocuments(studentId));
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
        dispatch(getCollegeStudentById(studentId))
    }, [dispatch, studentId, action]);

    return (
        <div>
            <div className="college-student-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="college-student-detail-btn"
                        onClick={handleViewDocuments}
                    >
                        Document
                    </button>
                    <button
                        className="college-student-detail-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#notificationModal"
                        onClick={() => setNotificationData({
                            title: "",
                            message: "",
                            userEmail: college?.college?.email,
                        })}
                    >
                        Send Notification
                    </button>
                    {
                        !college?.collegeStudent?.enrollmentNumber &&
                        <button
                            className="college-student-detail-btn"
                            onClick={handleGenerateEnrollmentAndRoll}
                        >
                            Generate EnrollmentNo
                        </button>
                    }
                </div>
                <button
                    className="college-student-detail-btn"
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
                        <div className="college-student-profile-header">
                            <div>
                                <div className="college-student-profile-avatar">
                                    {
                                        college?.collegeStudent?.image ?
                                            <img src={`http://localhost:8080/${college?.collegeStudent?.image}`} alt=""
                                                className='student-image' />
                                            : <i className="bi bi-person-fill"></i>
                                    }
                                </div>
                            </div>
                            <div className="college-student-profile-info">
                                <div className="college-student-profile-contact">
                                    <div>
                                        <i className="bi bi-person-vcard-fill me-2"></i>
                                        <span>Roll No. : {college?.collegeStudent?.rollNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-upc-scan me-2"></i>
                                        <span>Enrollment No. : {college?.collegeStudent?.enrollmentNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        <span>Phone No. : {college?.collegeStudent?.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        <span>Email : {college?.collegeStudent?.email}</span>
                                    </div>
                                </div>
                                <div className="college-student-profile-contact">
                                    <div>
                                        <i className="bi bi-journal-bookmark-fill me-2"></i>
                                        <span>Course : {college?.collegeStudent?.course}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-diagram-3-fill me-2"></i>
                                        <span>Department : {college?.collegeStudent?.department}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="college-student-profile-body">
                            <div className="simple-section">
                                <div className="info-line">
                                    <h5>Personal Information : </h5>
                                </div>
                                <div className="info-line">
                                    <span><strong>Name :</strong> {college?.collegeStudent?.name}</span>
                                    <span><strong>Father Name :</strong> {college?.collegeStudent?.parentResponse?.fatherName}</span>
                                    <span><strong>Mother Name :</strong> {college?.collegeStudent?.parentResponse?.motherName}</span>
                                    <span><strong>Mobile Number :</strong> {college?.collegeStudent?.phoneNumber}</span>
                                    <span><strong>Email :</strong> {college?.collegeStudent?.email}</span>
                                    <span><strong>Gender :</strong> {college?.collegeStudent?.gender}</span>
                                    <span><strong>Cast :</strong> {college?.collegeStudent?.cast}</span>
                                    <span><strong>Aadhar :</strong> {college?.collegeStudent?.aadhaarNumber}</span>
                                    <span><strong>DOB :</strong> {college?.collegeStudent?.dob}</span>
                                    <span><strong>Father Number :</strong> {college?.collegeStudent?.parentResponse?.fatherNumber}</span>
                                    <span><strong>Mother Number :</strong> {college?.collegeStudent?.parentResponse?.motherNumber}</span>
                                    <span><strong>Father Occupation :</strong> {college?.collegeStudent?.parentResponse?.fatherOccupation}</span>
                                    <span><strong>Mother Occupation :</strong> {college?.collegeStudent?.parentResponse?.motherOccupation}</span>
                                </div>
                            </div>
                            <div className="simple-section">
                                <div className="info-line">
                                    <h5>Address Information : </h5>
                                </div>
                                <div className="info-line">
                                    <span><strong>Address :</strong> {college?.collegeStudent?.addressResponse?.address}</span>
                                    <span><strong>City :</strong> {college?.collegeStudent?.addressResponse?.city}</span>
                                    <span><strong>District :</strong> {college?.collegeStudent?.addressResponse?.district}</span>
                                    <span><strong>State :</strong> {college?.collegeStudent?.addressResponse?.state}</span>
                                    <span><strong>Country :</strong> {college?.collegeStudent?.addressResponse?.country}</span>
                                    <span><strong>Pincode :</strong> {college?.collegeStudent?.addressResponse?.pincode}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <div className="modal fade" id="notificationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add notification
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="">
                                <div>
                                    <label>Title</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='title'
                                        value={notificationData.title}
                                        onChange={handleChangeNotification} />
                                </div>
                                <div>
                                    <label>Message</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='message'
                                        value={notificationData.message}
                                        onChange={handleChangeNotification}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer ">
                            <button type="button" className="college-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="college-modal-btn"
                                data-bs-dismiss="modal" onClick={handleSendNotification}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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

import React, { useEffect, useRef, useState } from 'react'
import './Document.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocument, getDocumentById, getDocuments, updateStudentDocument, uploadStudentDocument } from '../../state/student/Action';

const Document = () => {

    const [searchParams, setSearchParms] = useSearchParams();
    const studentId = searchParams.get("studentId")

    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const student = useSelector((state) => state.student)

    const [isEditModel, setIsEditModel] = useState(false)
    const [editDocumentId, setEditDocumentId] = useState();

    const [isViewModel, setIsViewModel] = useState(false);
    const [viewDocument, setViewDocument] = useState(null)

    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(viewDocument?.filePath);

    const [file, setFile] = useState(null)
    const [documentData, setDocumentData] = useState({
        documentType: "AADHAAR_CARD",
        documentName: ""
    })

    const handleClearData = () => {
        setDocumentData({
            documentType: "AADHAAR_CARD",
            documentName: ""
        })
        setFile()
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleEditModel = async (documentId) => {
        handleClearData()
        setIsEditModel(true);
        setEditDocumentId(documentId)
        await dispatch(getDocumentById(documentId))
    }

    const handleSave = async () => {
        if (!file) {
            return alert("select file")
        }
        !isEditModel ?
            await dispatch(uploadStudentDocument(studentId, documentData, file))
            :
            await dispatch(updateStudentDocument(editDocumentId, documentData, file))
        await dispatch(getDocuments(studentId))
    }

    const handleDelete = async (documentId) => {
        await dispatch(deleteDocument(documentId))
        await dispatch(getDocuments(studentId))
    }

    const handleViewDocument = async (documentId) => {
        await dispatch(getDocumentById(documentId));
        setIsViewModel(true)

    }

    useEffect(() => {
        if (student?.document && isEditModel) {
            setDocumentData({
                documentType: student?.document?.documentType || "",
                documentName: student?.document?.documentName || ""
            })
        }
    }, [student.document, isEditModel]);

    useEffect(() => {
        if (isViewModel && student?.document) {
            setViewDocument(student?.document)
        }
    }, [student.document, isViewModel]);

    useEffect(() => {
        dispatch(getDocuments(studentId))
    }, [dispatch, studentId]);

    return (
        <div>
            <div className="students-document-container">
                <div className="student-document-header">
                    <div>
                        <h4>Documents</h4>
                    </div>
                    <button
                        className="add-student-document-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#uploadDocumentModal"
                        onClick={() => {
                            handleClearData();
                            setIsEditModel(false)
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Upload
                    </button>
                </div>
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
                                            {document.status}
                                        </td>
                                        <td className='text-center'>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#viewDocumentModal"
                                                onClick={() => handleViewDocument(document.id)}
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-sm custom-reset-btn me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#uploadDocumentModal"
                                                onClick={() => handleEditModel(document.id)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm custom-reset-btn me-2"
                                                onClick={() => handleDelete(document.id)}
                                            >
                                                <i class="bi bi-trash"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ) :
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No Documents Found
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>


            <div class="modal fade" id="uploadDocumentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {
                                    isEditModel ?
                                        "Edit Document"
                                        :
                                        "Add Document"
                                }
                            </h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Select Document Type</label>
                                    <select
                                        className="modal-input"
                                        name='documentType'
                                        value={documentData.documentType}
                                        onChange={(e) => setDocumentData({
                                            ...documentData,
                                            documentType: e.target.value
                                        })}
                                    >
                                        <option value="AADHAAR_CARD">Aadhar Card</option>
                                        <option value="CLASS_10_MARKSHEET">Class 10</option>
                                        <option value="CLASS_12_MARKSHEET">Class 12</option>
                                        <option value="TRANSFER_CERTIFICATE">T.C</option>
                                        <option value="MIGRATION_CERTIFICATE">Migration </option>
                                        <option value="CASTE_CERTIFICATE">cast</option>
                                        <option value="INCOME_CERTIFICATE">Income </option>
                                        <option value="PHOTO">Photo</option>
                                        <option value="SIGNATURE">Signature</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Document Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='documentName'
                                        value={documentData.documentName}
                                        onChange={(e) => setDocumentData({
                                            ...documentData,
                                            documentName: e.target.value
                                        })}
                                    />
                                </div>
                                <div>
                                    <label>Select File</label>
                                    <input type='file'
                                        ref={fileInputRef}
                                        className="modal-input"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
                                class="student-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="student-modal-btn" data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="viewDocumentModal"
                tabIndex="-1"
            >
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

export default Document

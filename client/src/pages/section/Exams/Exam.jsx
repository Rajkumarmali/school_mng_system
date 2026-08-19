import React, { useEffect, useState } from 'react'
import './Exam.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { createExam, getAllSectionSubject, getExamBySectionId } from '../../../state/section/Action'
import ExamDetails from './ExamDetails'
const Exam = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "student"
    const sectionId = searchParams.get("sectionId")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const examId = searchParams.get("examId")

    const [examName, setExamName] = useState("")
    const [examType, setExamType] = useState("OTHER")
    const [examData, setExamData] = useState([])

    const [subjectPagination, setSubjectPagination] = useState({
        pageNumber: 1,
        pageSize: 10
    })

    const totalSubjectPages = section?.sectionSubjects?.totalPages || 0;
    const getSubjectPageNumbers = () => {
        const pages = [];

        if (totalSubjectPages <= 7) {
            for (let i = 1; i <= totalSubjectPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (subjectPagination.pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, subjectPagination.pageNumber - 1);
                i <= Math.min(
                    totalSubjectPages - 1,
                    subjectPagination.pageNumber + 1
                );
                i++
            ) {
                pages.push(i);
            }

            if (subjectPagination.pageNumber < totalSubjectPages - 2) {
                pages.push("...");
            }

            pages.push(totalSubjectPages);
        }

        return pages;
    };

    const totalPages = section?.exams?.totalPages || 0;
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
            sectionId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber + 1,
            size: pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            sectionId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleAddExamModal = async (page = 1, size = 1) => {
        await dispatch(getAllSectionSubject(sectionId, page, size))
    }

    const handleSelectSubject = (subject) => {
        const exits = examData.find(item =>
            item.sectionSubjectId === subject.id
        )
        if (exits) {
            setExamData(examData.filter(item =>
                item.sectionSubjectId !== subject.id
            ))
        } else {
            setExamData([
                ...examData,
                {
                    name: examName || "",
                    type: examType || "OTHER",
                    mode: "OFFLINE",
                    date: "",
                    startTime: "",
                    endTime: "",
                    maxMarks: "",
                    passingMarks: "",
                    status: "SCHEDULED",
                    sectionSubjectId: subject.id
                }
            ])
        }
    }

    const handleChangeExamData = (field, value, subjectId) => {
        setExamData(pre =>
            pre.map(item =>
                item.sectionSubjectId === subjectId ?
                    {
                        ...item,
                        [field]: value
                    }
                    :
                    item
            )
        )
    }

    const handleSave = async () => {
        if (!examName)
            return alert("Enter exam name")
        const payload = examData.map(item => ({
            name: examName || "",
            type: examType || "OTHER",
            mode: item.mode,
            date: item.date || "",
            startTime: item.startTime
                ? `${item.date}T${item.startTime}:00`
                : null,
            endTime: item.endTime
                ? `${item.date}T${item.endTime}:00`
                : null,
            maxMarks: item.maxMarks || "",
            passingMarks: item.passingMarks || "",
            status: "SCHEDULED",
            sectionSubjectId: item.sectionSubjectId
        }))
        await dispatch(createExam(payload))
        await dispatch(getExamBySectionId(sectionId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getExamBySectionId(sectionId, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, sectionId])

    return (
        <div>
            {
                examId ?
                    <div>
                        <ExamDetails />
                    </div>
                    :
                    <div>
                        <div className="section-exam-header">
                            <div>
                                <h2>Exams</h2>
                            </div>
                            {
                                isHod &&
                                <button
                                    className="add-section-exam-btn"
                                    onClick={() => handleAddExamModal()}
                                    data-bs-toggle="modal"
                                    data-bs-target="#examModal"
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Exam
                                </button>
                            }
                        </div>
                        <table className="table section-exam-table">
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Name</th>
                                    <th>SubjectCode</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>MaxMarks</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    section?.exams?.content?.length > 0 ?
                                        section?.exams?.content?.map((exam, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{exam?.name}</td>
                                                <td>{exam?.subjectResponse?.code}</td>
                                                <td>{exam?.subjectResponse?.shortName}</td>
                                                <td>{exam?.date ? new Date(exam?.date).toLocaleDateString("en-GB") : "-"}</td>
                                                <td>{exam?.status}</td>
                                                <td>{exam?.maxMarks}</td>
                                                <td className='text-center'>
                                                    <button
                                                        onClick={() => setSearchParams({ sectionId, tab, page: pageNumber, size: pageSize, examId: exam.id })}
                                                        className="btn btn-sm custom-action-btn me-2">
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No Exam Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{section?.exams?.totalElements || 0}</strong>
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

            <div class="modal fade" id="examModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Add Exam
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Exam Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="examName"
                                        value={examName}
                                        onChange={(e) => setExamName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Select Exam Type</label>
                                    <select
                                        className="modal-input"
                                        name='examType'
                                        value={examType}
                                        onChange={(e) => setExamType(e.target.value)}
                                    >
                                        <option value="MID_TERM">MID_TERM</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <table className="table class-student-modal-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Subject Code</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>StartTime</th>
                                        <th>EndTime</th>
                                        <th>MaxMarks</th>
                                        <th>PassingMarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        section?.sectionSubjects?.content?.length > 0 ?
                                            section?.sectionSubjects?.content?.map((subject) => {

                                                const selectedExam = examData.find(item =>
                                                    item.sectionSubjectId === subject.id
                                                )
                                                return (
                                                    <tr key={subject.id}>
                                                        <td>
                                                            <input
                                                                type='checkbox'
                                                                className="modal-input"
                                                                checked={selectedExam}
                                                                onClick={() => handleSelectSubject(subject)}
                                                            />
                                                        </td>
                                                        <td>
                                                            {subject?.subjectResponse?.code}
                                                        </td>
                                                        <td>
                                                            {subject?.subjectResponse?.shortName}
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="date"
                                                                disabled={!selectedExam}
                                                                value={selectedExam?.date}
                                                                onChange={(e) => handleChangeExamData("date", e.target.value, subject.id)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="time"
                                                                disabled={!selectedExam}
                                                                value={selectedExam?.startTime}
                                                                onChange={(e) => handleChangeExamData("startTime", e.target.value, subject.id)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="time"
                                                                disabled={!selectedExam}
                                                                value={selectedExam?.endTime}
                                                                onChange={(e) => handleChangeExamData("endTime", e.target.value, subject.id)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                disabled={!selectedExam}
                                                                value={selectedExam?.maxMarks}
                                                                onChange={(e) => handleChangeExamData("maxMarks", e.target.value, subject.id)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                disabled={!selectedExam}
                                                                value={selectedExam?.passingMarks}
                                                                onChange={(e) => handleChangeExamData("passingMarks", e.target.value, subject.id)}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )
                                            :
                                            <tr>
                                                <td colSpan="9" className="text-center">
                                                    No Exam Found
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Total : <strong>{section?.sectionSubjects?.totalElements || 0}</strong>
                                </div>
                                <div className="page-size-selector">
                                    <label>Show :</label>
                                    <select
                                        onChange={(e) => {
                                            const newPageSize = Number(e.target.value);
                                            setSubjectPagination({ pageNumber: 1, pageSize: newPageSize });
                                            handleAddExamModal(1, newPageSize)
                                        }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>
                                <ul className="custom-pagination">
                                    <li>
                                        <button
                                            onClick={() => {
                                                const newPageNumber = subjectPagination.pageNumber - 1;
                                                setSubjectPagination({ pageNumber: newPageNumber, pageSize: subjectPagination.pageSize });
                                                handleAddExamModal(newPageNumber, subjectPagination.pageSize);
                                            }}
                                            disabled={subjectPagination.pageNumber === 1}
                                        >
                                            &laquo;
                                        </button>
                                    </li>
                                    {getSubjectPageNumbers().map((page, index) =>
                                        page === "..." ? (
                                            <li key={index} className="dots">
                                                ...
                                            </li>
                                        ) : (
                                            <li key={index}>
                                                <button
                                                    className={
                                                        subjectPagination.pageNumber === page
                                                            ? "active-page"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        setSubjectPagination({
                                                            pageNumber: page, pageSize: subjectPagination.pageSize
                                                        });
                                                        handleAddExamModal(page, subjectPagination.pageSize);
                                                    }}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        )
                                    )}
                                    <li>
                                        <button
                                            onClick={() => {
                                                const newPageNumber = subjectPagination.pageNumber + 1;
                                                setSubjectPagination({
                                                    pageNumber: newPageNumber, pageSize: subjectPagination.pageSize
                                                });
                                                handleAddExamModal(newPageNumber, subjectPagination.pageSize
                                                );
                                            }}
                                            disabled={subjectPagination.pageNumber === totalSubjectPages}
                                        >
                                            &raquo;
                                        </button>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <span className="me-auto text-muted">
                                <i className="bi bi-check2-square me-1"></i>
                                {examData.length} Subject
                                {examData.length !== 1 ? "s" : ""} Selected
                            </span>

                            <button
                                type="button"
                                className="exam-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="exam-modal-btn"
                                data-bs-dismiss="modal"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exam

import React, { useEffect, useState } from 'react';
import './SubjectDetail.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversityExamSubjectById, updateStudentUniversityExamSubjectMarks, updateUniversityExamSubject } from '../../../state/universityExam/Action';

const SubjectDetail = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const subjectId = searchParams.get("subjectId")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const [subjectData, setSubjectData] = useState({
        date: "",
        startTime: "",
        endTime: ""
    });
    const [isEditMarks, setIsEditMarks] = useState(false)
    const [studentExamMarksData, setStudentExamMarksData] = useState([])

    const totalPages = universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.totalPages || 0;
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
            universityExamId,
            tab,
            subjectId,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            universityExamId,
            tab,
            subjectId,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            universityExamId,
            tab,
            subjectId,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            universityExamId,
            tab,
            subjectId,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleBack = () => {
        setSearchParams({ universityExamId, tab })
    }

    const formatTimeForInput = (time) => {
        if (!time) return '';

        const date = new Date(time);

        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const handleUpdateSubjectModal = () => {
        setSubjectData({
            date: universityExam?.universityExamSubject?.date
                ? new Date(universityExam.universityExamSubject.date)
                    .toISOString()
                    .split('T')[0]
                : '',

            startTime: formatTimeForInput(
                universityExam?.universityExamSubject?.startTime
            ),

            endTime: formatTimeForInput(
                universityExam?.universityExamSubject?.endTime
            )
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSave = async () => {
        const payload = {
            date: subjectData.date,
            startTime: `${subjectData.date}T${subjectData.startTime}:00.000Z`,
            endTime: `${subjectData.date}T${subjectData.endTime}:00.000Z`
        };
        await dispatch(updateUniversityExamSubject(subjectId, payload));
        await dispatch(getUniversityExamSubjectById(subjectId, pageNumber, pageSize));
    };

    const handleChangeStudentExamMarks = (studentExamSubjectId, value) => {
        setStudentExamMarksData(pre =>
            pre.map(item =>
                item.studentUniversityExamSubjectId === studentExamSubjectId ? {
                    ...item,
                    obtainMarks: value
                }
                    :
                    item
            )
        )
    }

    const handelUpdateStudentExamMarks = async () => {
        await dispatch(updateStudentUniversityExamSubjectMarks(studentExamMarksData))
        await dispatch(getUniversityExamSubjectById(subjectId, pageNumber, pageSize))
        handleCancelEditMarks()
    }

    const handleCancelEditMarks = () => {
        setIsEditMarks(false)
        if (universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content) {
            setStudentExamMarksData(
                universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content?.map(item => ({
                    studentUniversityExamSubjectId: item.id,
                    obtainMarks: item.obtainMarks || 0
                }))
            )
        } else {
            setStudentExamMarksData([])
        }
    }
    useEffect(() => {
        if (universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content) {
            setStudentExamMarksData(pre => {
                const newData = universityExam?.universityExamSubject
                    ?.studentUniversityExamSubjectResponses?.content.map(item => {
                        const existing = pre.find(
                            oldItem =>
                                oldItem.studentUniversityExamSubjectId === item.id
                        )

                        return existing || {
                            studentUniversityExamSubjectId: item.id,
                            obtainMarks: item.obtainMarks ?? 0
                        }
                    })
                const currentPageIds = new Set(
                    newData.map(
                        item => item.studentUniversityExamSubjectId
                    )
                )
                const oldData = pre.filter(
                    item => !currentPageIds.has(item.studentUniversityExamSubjectId)
                )
                return [...oldData, ...newData]
            })
        }
    }, [universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content])

    useEffect(() => {
        dispatch(getUniversityExamSubjectById(subjectId, pageNumber, pageSize))
    }, [dispatch, subjectId, pageNumber, pageSize]);

    return (
        <div>
            <div className="subject-detail-header">
                <div className="subject-header-left">
                    <div className="subject-icon">
                        <i className="bi bi-book-fill"></i>
                    </div>
                    <div>
                        <h2>{universityExam?.universityExamSubject?.subjectResponse?.name}</h2>
                        <div className="subject-subtitle">
                            <span>
                                <i className="bi bi-code-square"></i>
                                {universityExam?.universityExamSubject?.subjectResponse?.code}
                            </span>
                            <span>
                                <i className="bi bi-bookmark-fill"></i>
                                {universityExam?.universityExamSubject?.subjectResponse?.shortName}
                            </span>
                        </div>
                    </div>
                </div>
                <button className="back-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                </button>
            </div>
            <div className="subject-info-card">
                <div className="section-title">
                    <span>
                        <i className="bi bi-info-circle-fill me-2"></i>
                        Exam Information
                    </span>
                    <span>
                        <button className="subject-edit-btn"
                            onClick={handleUpdateSubjectModal}
                            data-bs-toggle="modal"
                            data-bs-target="#updateSubjectModal"
                        >
                            <i className='bi bi-pencil-square'></i>
                        </button>
                    </span>
                </div>
                <div className="subject-info-grid">
                    <div className="subject-info-item">
                        <div className="info-icon">
                            <i className="bi bi-calendar-event-fill"></i>
                        </div>
                        <div>
                            <span>Exam Date</span>
                            <strong>{universityExam?.universityExamSubject?.date ? new Date(universityExam?.universityExamSubject?.date).toLocaleDateString("en-GB") : "-"}</strong>
                        </div>
                    </div>
                    <div className="subject-info-item">
                        <div className="info-icon">
                            <i className="bi bi-clock-fill"></i>
                        </div>
                        <div>
                            <span>Exam Time</span>
                            <strong>
                                {universityExam?.universityExamSubject?.startTime ? new Date(universityExam?.universityExamSubject?.startTime)?.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                    : "-"} - {universityExam?.universityExamSubject?.endTime ? new Date(universityExam?.universityExamSubject?.endTime)?.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : "-"}
                            </strong>
                        </div>
                    </div>
                    <div className="subject-info-item">
                        <div className="info-icon">
                            <i className="bi bi-award-fill"></i>
                        </div>
                        <div>
                            <span>Maximum Marks</span>
                            <strong>{universityExam?.universityExamSubject?.maxMarks}</strong>
                        </div>
                    </div>
                    <div className="subject-info-item">
                        <div className="info-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div>
                            <span>Passing Marks</span>
                            <strong>{universityExam?.universityExamSubject?.passingMarks}</strong>
                        </div>
                    </div>
                    <div className="subject-info-item">
                        <div className="info-icon">
                            <i className="bi bi-award-fill"></i>
                        </div>
                        <div>
                            <span>Credit</span>
                            <strong>{universityExam?.universityExamSubject?.subjectResponse?.credit}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="students-card">
                <div className="students-card-header">
                    <div>
                        <h3>
                            <i className="bi bi-people-fill me-2"></i>
                            Students
                        </h3>
                        <p>
                            Students registered for this subject
                        </p>
                    </div>
                </div>
                <div className="student-table-wrapper">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Enrollment No.</th>
                                <th>Roll No.</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Internal Marks</th>
                                <th>
                                    ObtainMarks
                                    {
                                        !isEditMarks ?
                                            <button
                                                type="button"
                                                className="exam-edit-btn"
                                                onClick={() => setIsEditMarks(true)}
                                            >
                                                <i className="bi bi-pencil-square me-1"></i>
                                            </button>
                                            :
                                            <>
                                                <button
                                                    className="exam-edit-btn"
                                                    onClick={handelUpdateStudentExamMarks}
                                                >
                                                    <i className="bi bi-check-lg"></i>
                                                </button>
                                                <button
                                                    className="exam-edit-btn"
                                                    onClick={handleCancelEditMarks}
                                                >
                                                    <i class="bi bi-x"></i>
                                                </button>
                                            </>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content?.length > 0 ?
                                    universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.content?.map((student, index) =>
                                        <tr key={student.id}>
                                            <td>
                                                {(pageNumber - 1) * pageSize + index + 1}.
                                            </td>
                                            <td>
                                                {student?.studentResponse?.enrollmentNumber}
                                            </td>

                                            <td>
                                                {student?.studentResponse?.rollNumber}
                                            </td>
                                            <td>{student?.studentResponse?.firstName} {student?.studentResponse?.lastName}</td>
                                            <td>
                                                {student?.studentResponse?.gender}
                                            </td>
                                            <td>
                                                {student?.studentResponse?.email}
                                            </td>
                                            <td>{student?.internameMarks}</td>
                                            <td>
                                                {
                                                    isEditMarks ?
                                                        <input
                                                            type="number"
                                                            value={
                                                                studentExamMarksData.find(item => item.studentUniversityExamSubjectId === student.id)?.obtainMarks ?? 0
                                                            }
                                                            onChange={(e) => handleChangeStudentExamMarks(student.id, e.target.value)}
                                                        />
                                                        :
                                                        student?.obtainMarks

                                                }
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No Student Found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{universityExam?.universityExamSubject?.studentUniversityExamSubjectResponses?.totalElements || 0}</strong>
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

            <div class="modal fade" id="updateSubjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Subject Exam Info</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Date</label>
                                    <input type="date"
                                        className="modal-input"
                                        name="date"
                                        value={subjectData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Start Time</label>
                                    <input type="time"
                                        className="modal-input"
                                        name="startTime"
                                        value={subjectData.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>End Time</label>
                                    <input type="time"
                                        className="modal-input"
                                        name="endTime"
                                        value={subjectData.endTime}
                                        onChange={handleChange}
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
                                <button onClick={handleSave} type="button"
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
    );
};

export default SubjectDetail;
import React, { useEffect, useState } from 'react'
import './UniversityExam.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { createUniversityExam, getAllUniversityExams } from '../../state/universityExam/Action';
import UniversityExamDetails from './UniversityExamDetails';

const UniversityExam = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const universityExamId = searchParams.get("universityExamId")

    const [universityExamData, setUniversityExamData] = useState({
        name: "",
        formStartAt: "",
        formEndAt: "",
        academicYear: "",
        year: "",
        semester: "",
        courseCode: ""
    })

    const totalPages = universityExam?.universityExams?.totalPages || 0;
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
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUniversityExamData({
            ...universityExamData,
            [name]: value
        })
    }

    const clearData = () => {
        setUniversityExamData({
            name: "",
            formStartAt: "",
            formEndAt: "",
            academicYear: "",
            year: "",
            semester: "",
            courseCode: ""
        })
    }

    const handleSave = async () => {
        const payload = {
            ...universityExamData,
            formStartAt: universityExamData.formStartAt ? new Date(universityExamData.formStartAt).toISOString() : null,
            formEndAt: universityExamData.formEndAt ? new Date(universityExamData.formEndAt).toISOString() : null
        }
        await dispatch(createUniversityExam(payload))
        await dispatch(getAllUniversityExams(pageNumber, pageSize))
        clearData()
    }



    useEffect(() => {
        dispatch(getAllUniversityExams(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className="university-exam-container">
            {
                universityExamId ?
                    <div>
                        <UniversityExamDetails />
                    </div>
                    :
                    <div>
                        <div className="universtiy-exam-header">
                            <div>
                                <h2>Universtiy Exam Management</h2>
                            </div>
                            <button className="add-universtiy-exam-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#examModal">
                                <i className="bi bi-plus-circle me-2"></i>
                                Add New Exam
                            </button>
                        </div>
                        <div className="universtiy-exam-card">
                            <table className="table universtiy-exam-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Year</th>
                                        <th>Semester</th>
                                        <th>FromStartDate</th>
                                        <th>FormEndDate</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        universityExam?.universityExams?.content?.length > 0 ?
                                            universityExam?.universityExams?.content?.map((exam, index) =>
                                                <tr key={exam.id}>
                                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{exam?.name}</td>
                                                    <td>{exam?.courseCode}</td>
                                                    <td>{exam?.year} year</td>
                                                    <td>{exam?.semester} sem</td>
                                                    <td>{exam?.formStartAt ? new Date(exam.formStartAt).toLocaleDateString("en-GB") : "-"}</td>
                                                    <td>{exam?.formEndAt ? new Date(exam.formEndAt).toLocaleDateString("en-GB") : "-"}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            onClick={() => setSearchParams({ universityExamId: exam.id })}
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            <tr>
                                                <td colSpan="8" className="text-center">
                                                    No Exam Found
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>

                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Total : <strong>{universityExam?.universityExams?.totalElements || 0}</strong>
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
                    </div>
            }

            <div class="modal fade" id="examModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Exam</h1>
                            <button onClick={clearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Exam Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={universityExamData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Course Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="courseCode"
                                        value={universityExamData.courseCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Academic Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="academicYear"
                                        value={universityExamData.academicYear}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Year</label>
                                    <input type="number"
                                        className="modal-input"
                                        name="year"
                                        value={universityExamData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Semester</label>
                                    <input type="number"
                                        className="modal-input"
                                        name="semester"
                                        value={universityExamData.semester}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Form Start</label>
                                    <input type="date"
                                        className="modal-input"
                                        name="formStartAt"
                                        value={universityExamData.formStartAt}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Form End</label>
                                    <input type="date"
                                        className="modal-input"
                                        name="formEndAt"
                                        value={universityExamData.formEndAt}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    onClick={clearData}
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
    )
}

export default UniversityExam

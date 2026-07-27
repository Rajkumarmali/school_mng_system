import React, { useEffect, useState } from 'react'
import './Subject.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { createSubject, getSubjects } from '../../../state/subject/Action'
import SubjectDetails from './SubjectDetails'

const Subject = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isSuperAdmin = roles.includes("SUPER_ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const courseId = searchParams.get("courseId")
    const tab = searchParams.get("tab")
    const subjectId = searchParams.get("subjectId")

    const dispatch = useDispatch();
    const subject = useSelector((state) => state.subject)

    const [subjectData, setSubjectData] = useState({
        name: "",
        shortName: "",
        description: "",
        semester: '',
        year: '',
        subjectType: "THEORY",
        credit: "",
        maxMarks: "",
        passingMarks: ""
    })

    const totalPages = subject?.subjects?.totalPages || 0;
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
            courseId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({
            ...subjectData,
            [name]: value
        })
    }

    const handleClearData = () => {
        setSubjectData({
            name: "",
            shortName: "",
            description: "",
            semester: '',
            year: '',
            subjectType: "THEORY",
            credit: "",
            maxMarks: "",
            passingMarks: ""
        })
    }

    const handleSave = async () => {
        await dispatch(createSubject(courseId, subjectData))
        await dispatch(getSubjects(courseId, pageNumber, pageSize))
        handleClearData()
    }

    const handleViewSubjectDetails = (subjectId) => {
        setSearchParams({
            courseId,
            tab,
            page: pageNumber,
            size: pageSize,
            subjectId
        })
    }



    useEffect(() => {
        dispatch(getSubjects(courseId, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, courseId]);

    return (
        <div>
            {
                subjectId ?
                    <div>
                        <SubjectDetails />
                    </div>
                    :
                    <div>
                        <div>
                            {
                                isSuperAdmin &&
                                <div className="subject-header">
                                    <div>

                                    </div>
                                    <button className="add-subject-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#subjectModal">
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Add New Subject
                                    </button>
                                </div>
                            }
                        </div>
                        <table className="table subject-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Year</th>
                                    <th>Semester</th>
                                    <th>Credit</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subject?.subjects?.content?.length > 0 ?
                                        subject?.subjects?.content?.map((subject, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{subject.code}</td>
                                                <td>{subject.shortName}</td>
                                                <td>{subject.subjectType}</td>
                                                <td>{subject.year} Year</td>
                                                <td>{subject.semester} Sem</td>
                                                <td>{subject.credit}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => handleViewSubjectDetails(subject.id)}
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No Subject Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{subject?.subjects?.totalElements || 0}</strong>
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

            <div class="modal fade" id="subjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Subject</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={subjectData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Short Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='shortName'
                                        value={subjectData.shortName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <input type="email"
                                        className="modal-input"
                                        name='description'
                                        value={subjectData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='year'
                                        value={subjectData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Semester</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='semester'
                                        value={subjectData.semester}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Credit</label>
                                    <input
                                        className="modal-input"
                                        name='credit'
                                        value={subjectData.credit}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Max Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='maxMarks'
                                        value={subjectData.maxMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Passing Marks</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='passingMarks'
                                        value={subjectData.passingMarks}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Subject Type</label>
                                    <select
                                        className="modal-input"
                                        name='subjectType'
                                        value={subjectData.subjectType}
                                        onChange={handleChange}
                                    >
                                        <option value="THEORY">Theory</option>
                                        <option value="PRACTICAL">Practical</option>
                                        <option value="ELECTIVE">Elective</option>
                                    </select>
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

        </div>
    )
}

export default Subject

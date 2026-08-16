import React, { useEffect, useState } from 'react'
import './Subject.css'
import { jwtDecode } from 'jwt-decode'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addSubjectInSection, getAllSectionSubject } from '../../../state/section/Action'
import SubjectDetails from './SubjectDetails'

const Subject = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isHod = roles.includes("HOD")

    const [searchParams, setSearchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId")
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const sectionSubjectId = searchParams.get("sectionSubjectId")

    const dispatch = useDispatch();
    const section = useSelector((state) => state.section)

    const [sectionSubjectData, setSectionSubjectData] = useState({
        subjectCode: "",
        teacherEmpIdOrEmail: "",
        addAllSectionStudent: false
    })

    const totalPages = section?.sectionSubjects?.totalPages || 0;
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
            size: pageSize
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

    const handleClearData = () => {
        setSectionSubjectData({
            subjectCode: "",
            teacherEmpIdOrEmail: "",
            addAllSectionStudent: false
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSectionSubjectData({
            ...sectionSubjectData,
            [name]:
                name === "addAllSectionStudent" ?
                    value === "true"
                    :
                    value
        })
    }

    const handleSave = async () => {
        await dispatch(addSubjectInSection(sectionId, sectionSubjectData))
        await dispatch(getAllSectionSubject(sectionId, pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getAllSectionSubject(sectionId, pageNumber, pageSize))
    }, [dispatch, sectionId, pageNumber, pageSize]);

    return (
        <div>
            {
                sectionSubjectId ?
                    <div>
                        <SubjectDetails />
                    </div>
                    :
                    <div>
                        {
                            isHod &&
                            <div className="section-subject-header">
                                <div>

                                </div>
                                <button className="add-subject-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#subjectModal"
                                    onClick={handleClearData}>
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add New Subject
                                </button>
                            </div>
                        }
                        <div>
                            <table className="table section-subject-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Subject Code</th>
                                        <th>Subject</th>
                                        <th>Teacher</th>
                                        <th>Teacher Phone No.</th>
                                        <th>Students</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        section?.sectionSubjects?.content?.length > 0 ?
                                            section?.sectionSubjects?.content?.map((subject, index) =>
                                                <tr>
                                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{subject?.subjectResponse?.code ? subject?.subjectResponse?.code : "-"}</td>
                                                    <td>{subject?.subjectResponse?.shortName ? subject?.subjectResponse?.shortName : "-"}</td>
                                                    <td>{subject?.teacherResponse?.firstName} {subject?.teacherResponse?.lastName}</td>
                                                    <td>{subject?.teacherResponse?.phoneNumber}</td>
                                                    <td>{subject?.subjectResponse?.totalStudent}</td>
                                                    <td className='text-center'>
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            onClick={() => setSearchParams({ sectionId, tab, page: pageNumber, size: pageSize, sectionSubjectId: subject.id })}
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
                                    Total : <strong>{section?.sectionSubjects?.totalElements || 0}</strong>
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

            <div class="modal fade" id="subjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Subject</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Subject Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="subjectCode"
                                        value={sectionSubjectData.subjectCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Teacher EmpId or Email</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='teacherEmpIdOrEmail'
                                        value={sectionSubjectData.teacherEmpIdOrEmail}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Add all section student</label>
                                    <select
                                        className="modal-input"
                                        name='addAllSectionStudent'
                                        value={sectionSubjectData.addAllSectionStudent}
                                        onChange={handleChange}
                                    >
                                        <option value={false}>Add Students Later</option>
                                        <option value={true}>Add all student</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button"
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

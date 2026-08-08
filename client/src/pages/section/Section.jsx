import React, { useEffect, useState } from 'react'
import './Section.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { createSection, deleteSection, getAllDepartmentsSection, getAllSection } from '../../state/section/Action'
import SectionDetails from './SectionDetails'

const Section = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAdmin = roles.includes("ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const sectionId = searchParams.get("sectionId")

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [sectionData, setSectionData] = useState({
        name: "",
        academicYear: "",
        year: "",
        semester: "",
        employeeEmailOrEmployeeId: ""
    })

    const handleClearData = () => {
        setSectionData({
            name: "",
            academicYear: "",
            semester: "",
            employeeEmailOrEmployeeId: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData({
            ...sectionData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(createSection(sectionData))
        await dispatch(getAllDepartmentsSection(pageNumber, pageSize))
        handleClearData()
    }

    const handleDelete = async (sectionId) => {
        await dispatch(deleteSection(sectionId))
        if (isAdmin) {
            await dispatch(getAllSection(pageNumber, pageSize))
        }
        else {
            await dispatch(getAllDepartmentsSection(pageNumber, pageSize))
        }
    }

    const handleViewSectionDetails = (sectionId) => {
        setSearchParams({
            sectionId
        })
    }

    const totalPages = isAdmin ? (section?.sections?.totalPages || 0) :
        (section?.departmentsSections?.totalPages || 0);
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

    useEffect(() => {
        if (isAdmin) {
            dispatch(getAllSection(pageNumber, pageSize))
        }
        else {
            dispatch(getAllDepartmentsSection(pageNumber, pageSize))
        }
    }, [dispatch, isAdmin, pageNumber, pageSize])

    return (
        <div className='sections-container'>
            {
                sectionId ?
                    <div>
                        <SectionDetails />
                    </div>
                    :
                    <div>
                        <div className="sections-header">
                            <div>
                                <h2>Section Management</h2>
                            </div>
                            {
                                !isAdmin &&
                                <button className="add-section-btn" data-bs-toggle="modal" data-bs-target="#sectionModal">
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add New Section
                                </button>
                            }
                        </div>
                        <div className="sections-card">
                            <table className="table sections-table">
                                <thead>
                                    <tr>
                                        <th>S No.</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Year</th>
                                        <th>Semester</th>
                                        <th>academic Year</th>
                                        <th>departmentCode</th>
                                        <th>Status</th>
                                        <th>Class Teacher</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (
                                            (isAdmin && section?.sections?.content?.length === 0) ||
                                            (!isAdmin && section?.departmentsSections?.content?.length === 0)
                                        ) ?
                                            (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Section Found
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            (
                                                isAdmin ? section?.sections?.content
                                                    : section?.departmentsSections?.content
                                            )?.map((section, index) =>
                                                <tr key={section.id}>
                                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{section.code}</td>
                                                    <td>{section.name}</td>
                                                    <td>{section.year} Year</td>{
                                                        section.semester ?
                                                            <td>{section.semester} Sem</td>
                                                            :
                                                            <td>-</td>
                                                    }

                                                    <td>{section.academicYear}</td>
                                                    <td>{section.departmentCode}</td>
                                                    <td>{section.sectionStatus}</td>
                                                    <td>{section.classTeacherResponse?.name}</td>
                                                    <td className="text-center">
                                                        <button
                                                            onClick={() => handleViewSectionDetails(section.id)}
                                                            className="btn btn-sm custom-action-btn me-2">
                                                            <i class="bi bi-eye"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(section.id)}
                                                            className="btn btn-sm custom-action-btn me-2">
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Total :
                                    {
                                        isAdmin ? <strong> {section?.sections?.totalElements || 0}</strong>
                                            : <strong> {section?.departmentsSections?.totalElements || 0}</strong>
                                    }

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
            <div className="modal fade" id="sectionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"           >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content custom-modal">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Section</h1>
                            <button onClick={handleClearData} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>section Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={sectionData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Academic Year</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='academicYear'
                                        value={sectionData.academicYear}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Year</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='year'
                                        value={sectionData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Semester</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='semester'
                                        value={sectionData.semester}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Class Teacher Email or EmployeeId</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='employeeEmailOrEmployeeId'
                                        value={sectionData.employeeEmailOrEmployeeId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
                                class="college-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleSave} type="button"
                                class="college-modal-btn" data-bs-dismiss="modal"
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

export default Section

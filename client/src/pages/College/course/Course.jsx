import React, { useEffect, useState } from 'react'
import './Course.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { assignCourseToCollege, getCollegeCourse } from '../../../state/college/Action';

const Course = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const collegeId = searchParams.get("collegeId")
    const tab = searchParams.get("tab")

    const dispatch = useDispatch();
    const college = useSelector((state) => state.college)

    const [courseCode, setCourseCode] = useState('');

    const totalPages = college?.collegeCourses?.totalPages || 0
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
            collegeId,
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            collegeId,
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            collegeId,
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            collegeId,
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleSave = async () => {
        if (!courseCode)
            return alert("enter course code")
        await dispatch(assignCourseToCollege(collegeId, courseCode))
        await dispatch(getCollegeCourse(collegeId, pageNumber, pageSize))
    }


    useEffect(() => {
        dispatch(getCollegeCourse(collegeId, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, collegeId]);


    return (
        <div>
            <div className="course-header">
                <div>
                    <h2>Course Management</h2>
                </div>
                <button className="add-course-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#addCourseToCollegeModal"
                    onClick={() => setCourseCode('')}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Course
                </button>
            </div>
            <table className="table course-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Duration Type</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        college?.collegeCourses?.content?.length > 0 ?
                            college?.collegeCourses?.content?.map((course, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{course.courseCode}</td>
                                    <td>{course.shortName}</td>
                                    <td>{course.duration}</td>
                                    <td className='text-center'>
                                        <button
                                            className="btn btn-sm custom-reset-btn me-2"
                                        >
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No Course Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total :<strong>{college?.collegeCourses?.totalElements || 0}</strong>
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

            <div className="modal fade" id="addCourseToCollegeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add Course
                            </h1>
                            <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="">
                                <div>
                                    <label>Enter course Code</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='courseCode'
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer ">
                            <button type="button" className="college-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="college-modal-btn"
                                data-bs-dismiss="modal" onClick={handleSave}
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

export default Course

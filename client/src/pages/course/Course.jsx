import React, { useEffect, useState } from 'react'
import './Course.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { createCourse, getAllCourse } from '../../state/course/Action';
import CourseDetails from './CourseDetails';

const Course = () => {

    const dispatch = useDispatch();
    const course = useSelector((state) => state.course)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const courseId = searchParams.get("courseId")

    const [courseData, setCourseData] = useState({
        name: "",
        shortName: "",
        duration: "",
        courseDurationType: "YEAR",
        totalSemester: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        })
    }

    const handleClearData = () => {
        setCourseData({
            name: "",
            shortName: "",
            duration: "",
            courseDurationType: "YEAR",
            totalSemester: "",
            description: ""
        })
    }

    const handleSave = async () => {
        await dispatch(createCourse(courseData))
        await dispatch(getAllCourse(pageNumber, pageSize))
    }

    const handleViewCourseDetails = (courseId) => {
        setSearchParams({
            courseId
        })

    }

    const totalPages = course?.courses?.totalPages || 0;
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
        dispatch(getAllCourse(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className="course-container">
            {
                courseId ?
                    <div>
                        <CourseDetails />
                    </div>
                    :
                    <div>
                        <div className="course-header">
                            <div>
                                <h2>Course Management</h2>
                            </div>
                            <button className="add-course-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClearData}>
                                <i className="bi bi-plus-circle me-2"></i>
                                Add New Course
                            </button>
                        </div>
                        <div className="course-card">
                            <table className="table course-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Duration Type</th>
                                        <th>Duration</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        course?.courses?.content?.length > 0 ?
                                            course?.courses?.content?.map((course, index) =>
                                                <tr>
                                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{course.courseCode}</td>
                                                    <td>{course.shortName}</td>
                                                    <td>{course.courseDurationType}</td>
                                                    <td>{course.duration} Year</td>
                                                    <td className='text-center'>
                                                        <button
                                                            onClick={() => handleViewCourseDetails(course.id)}
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
                                    Total : <strong>{course?.courses?.totalElements || 0}</strong>
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

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Course</h1>
                            <button onClick={handleClearData} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div>
                                    <label>Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name="name"
                                        value={courseData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Short Name</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='shortName'
                                        value={courseData.shortName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Duratioin</label>
                                    <input type="number"
                                        className="modal-input"
                                        name='duration'
                                        value={courseData.duration}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Duration Type</label>
                                    <select
                                        className="modal-input"
                                        name='courseDurationType'
                                        value={courseData.courseDurationType}
                                        onChange={handleChange}
                                    >
                                        <option>YEAR</option>
                                        <option>SEMESTER</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Total Semester</label>
                                    <input type='number'
                                        className="modal-input"
                                        name='totalSemester'
                                        value={courseData.totalSemester}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div>
                                    <label>Description</label>
                                    <input type="text"
                                        className="modal-input"
                                        name='description'
                                        value={courseData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onClick={handleClearData} type="button"
                                class="course-modal-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSave} type="button"
                                class="course-modal-btn" data-bs-dismiss="modal"
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

import React, { useEffect, useState } from 'react'
import './CourseDetails.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById, updateCourse } from '../../state/course/Action';
import Department from './department/Department';
import Student from './student/Student';
import Subject from './subject/Subject';

const CourseDetails = () => {


    // const token = localStorage.getItem("token")
    // const decoded = jwtDecode(token)
    // const roles = decoded.roles;
    // const isSuperAdmin = roles.includes("SUPER_ADMIN")

    const [searchParams, setSearchParams] = useSearchParams();
    const courseId = searchParams.get("courseId")
    const activeTab = searchParams.get("tab")

    const dispatch = useDispatch()
    const course = useSelector((state) => state.course)

    const [courseData, setCourseData] = useState({
        name: "",
        shortName: "",
        duration: "",
        courseDurationType: "YEAR",
        description: ""
    })

    const handleSetdata = () => {
        setCourseData({
            name: course?.course?.name || "",
            shortName: course?.course?.shortName || "",
            duration: course?.course?.duration || "",
            courseDurationType: course?.course?.courseDurationType || "YEAR",
            description: course?.course?.description || ""
        })
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        })
    }

    const handleSave = async () => {
        await dispatch(updateCourse(courseId, courseData))
        await dispatch(getCourseById(courseId))
    }

    useEffect(() => {
        dispatch(getCourseById(courseId))
    }, [dispatch, courseId]);

    return (
        <div>
            <nav className="course-nav-card navbar-expand-lg ">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ courseId, tab: "info" })}
                        >
                            Course Info
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ courseId, tab: "department" })}
                        >
                            Department
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ courseId, tab: "student" })}
                        >
                            Student
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ courseId, tab: "subject" })}
                        >
                            Subject
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="fee-card">
                {
                    activeTab === "student" ?
                        <div>
                            <Student />
                        </div>
                        :
                        activeTab === "department" ?
                            <div>
                                <Department />
                            </div>
                            :
                            activeTab === "subject" ?
                                <div>
                                    <Subject />
                                </div>
                                :
                                <div>
                                    <div className="course-details-info">
                                        <div className="course-details-contact">
                                            <div>
                                                <i className="bi bi-upc-scan me-2"></i>
                                                <span> <strong>Code :  </strong>{course?.course?.courseCode}</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-journal-bookmark-fill me-2"></i>
                                                <span> <strong>Name:  </strong>{course?.course?.name} ({course?.course?.shortName})</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-calendar-range-fill me-2"></i>
                                                <span> <strong>Duration Type:  </strong>{course?.course?.courseDurationType} </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-clock-history me-2"></i>
                                                <span> <strong>Duration :  </strong>{course?.course?.duration} Year</span>
                                            </div>
                                            <div>
                                                <i className="bi bi-collection-fill me-2"></i>
                                                <span> <strong>Total Semester:  </strong>{course?.course?.totalSemester} </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-card-text me-2"></i>
                                                <span> <strong>Description:  </strong>{course?.course?.description} </span>

                                                <button className="edit-icon-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editCourseModal"
                                                    onClick={handleSetdata}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="stats-container">
                                        <div className="stat-card">
                                            <i className="bi bi-bank me-2"></i>
                                            <h3>{course?.course?.totalDepartment}</h3>
                                            <span>Total College</span>
                                        </div>

                                        <div className="stat-card">
                                            <i className="bi bi-diagram-3-fill me-2"></i>
                                            <h3>{course?.course?.totalDepartment}</h3>
                                            <span>Total Departments</span>
                                        </div>

                                        <div className="stat-card">
                                            <i className="bi bi-mortarboard-fill me-2"></i>
                                            <h3>{course?.course?.totalStudent}</h3>
                                            <span>Total Students</span>
                                        </div>
                                    </div> */}
                                </div>

                }
            </div>

            <div className="modal fade" id="editCourseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Course</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                            <button type="button"
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

export default CourseDetails

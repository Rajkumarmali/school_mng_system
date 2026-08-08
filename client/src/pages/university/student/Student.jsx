import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getUniversityAdmission, getUniversityStudent } from '../../../state/university/Action';
import StudentDetails from './StudentDetails';

const Student = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")
    const studentId = searchParams.get("studentId")

    const dispatch = useDispatch()
    const university = useSelector((state) => state.university)

    const totalPages =
        tab === "student" ?
            university?.universityStudents?.totalPages || 0
            :
            university?.universityAdmission?.totalPages || 0;
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
            tab,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            tab,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        tab === "student" ?
            dispatch(getUniversityStudent(pageNumber, pageSize))
            :
            dispatch(getUniversityAdmission(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize, tab])

    return (
        <div>
            {
                studentId ?
                    <div>
                        <StudentDetails />
                    </div>
                    :
                    <div>
                        <table className="table students-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    {
                                        tab === "student" &&
                                        <>
                                            <th>Enrollment No.</th>
                                            <th>Roll No.</th>
                                        </>
                                    }
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (
                                        (tab === "student" && university?.universityStudents?.content?.length === 0) ||
                                        (tab === "admission" && university?.universityAdmission?.content?.length === 0)
                                    ) ?
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No Student Found
                                            </td>
                                        </tr>
                                        :
                                        (tab === "student" ?
                                            university?.universityStudents?.content
                                            :
                                            university?.universityAdmission?.content
                                        )?.map((student, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                {
                                                    tab === "student" &&
                                                    <>
                                                        <td>{student?.enrollmentNumber}</td>
                                                        <td>{student?.rollNumber}</td>
                                                    </>
                                                }
                                                <td>{student?.name}</td>
                                                <td>{student?.email}</td>
                                                <td>{student?.phoneNumber}</td>
                                                <td>{student?.gender}</td>
                                                <td>{student?.course}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => setSearchParams({ tab, page: pageNumber, size: pageSize, studentId: student.id })}
                                                    >
                                                        <i class="bi bi-eye"></i>
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
                                    tab === "student" ?
                                        <strong>{university?.universityStudents?.totalElements || 0}</strong>
                                        :
                                        <strong>{university?.universityAdmission?.totalElements || 0}</strong>
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
            }
        </div>
    )
}

export default Student

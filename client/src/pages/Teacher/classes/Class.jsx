import React, { useEffect } from 'react'
import './Class.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTeacherClasses } from '../../../state/teacher/Action'
import ClassDetails from './ClassDetails'
const Class = () => {

    const dispatch = useDispatch()
    const teacher = useSelector((state) => state.teacher)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10
    const classId = searchParams.get("classId")

    const totalPages = teacher?.teacherClasses?.totalPages || 0;
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
        dispatch(getTeacherClasses(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className='teacher-classes-container'>
            {
                classId ?
                    <div>
                        <ClassDetails />
                    </div>
                    :
                    <div>
                        <div className="teacher-classes-card">
                            <table className="table teacher-classes-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>SectionCode</th>
                                        <th>Year</th>
                                        <th>Semester</th>
                                        <th>SubjectCode</th>
                                        <th>Subject</th>
                                        <th>Students</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        teacher?.teacherClasses?.content?.length > 0 ?
                                            teacher?.teacherClasses?.content?.map((clas, index) =>
                                                <tr>
                                                    <td> {(pageNumber - 1) * pageSize + index + 1}.</td>
                                                    <td>{clas?.sectionResponse?.code}</td>
                                                    <td>{clas?.sectionResponse?.year}</td>
                                                    <td>{clas?.sectionResponse?.semester}</td>
                                                    <td>{clas?.subjectResponse?.code}</td>
                                                    <td>{clas?.subjectResponse?.shortName}</td>
                                                    <td>{clas?.totalStudent}</td>
                                                    <td className='text-center'>
                                                        <button
                                                            className="btn btn-sm custom-reset-btn me-2"
                                                            onClick={() => setSearchParams({ classId: clas.id })}
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            <tr>
                                                <td colSpan="10" className="text-center">
                                                    No Classes Found
                                                </td>
                                            </tr>

                                    }
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Total : <strong>{teacher?.teacherClasses?.totalElements || 0}</strong>
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
        </div>
    )
}

export default Class

import React, { useEffect } from 'react'
import './Student.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getStudentExamByExamId } from '../../../../state/section/Action'
const Student = () => {

    const dispatch = useDispatch()
    const section = useSelector((state) => state.section)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "student"
    const sectionId = searchParams.get("sectionId")
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const examId = searchParams.get("examId")
    const action = searchParams.get("action")
    const pageNumber = Number(searchParams.get("pageNumber")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    const totalPages = section?.studentExams?.totalPages || 0;
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
            page,
            size,
            examId,
            action,
            pageNumber: 1,
            pageSize: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: pageNumber - 1,
            pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            sectionId,
            tab,
            page,
            size,
            examId,
            action,
            pageNumber: pageNumber + 1,
            pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            sectionId,
            tab,
            page: 1,
            size: size,
            examId,
            action,
            pageNumber,
            pageSize,
        })
    }

    useEffect(() => {
        dispatch(getStudentExamByExamId(examId, pageNumber, pageSize))
    }, [dispatch, examId, pageNumber, pageSize])

    return (
        <div>
            <table className="table section-exam-student-table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>RollNo.</th>
                        <th>Registration No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>ObtainMarks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        section?.studentExams?.content?.length > 0 ?
                            section?.studentExams?.content?.map((stu, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{stu?.studentResponse?.rollNumber}</td>
                                    <td>{stu?.studentResponse?.registrationNumber}</td>
                                    <td>{stu?.studentResponse?.firstName} {stu?.studentResponse?.lastName}</td>
                                    <td>{stu?.studentResponse?.email}</td>
                                    <td>{stu?.status}</td>
                                    <td>{stu?.obtainMarks}</td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="9" className="text-center">
                                    Not Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{section?.studentExams?.totalElements || 0}</strong>
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
    )
}

export default Student

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getOngoingStudentExam } from '../../../state/exam/Action'
import OnGoingExamDetail from './OnGoingExamDetail'
const OnGoingExam = () => {

    const dispatch = useDispatch()
    const exam = useSelector((state) => state.exam)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentExamId = searchParams.get("studentExamId")

    const totalPages = exam?.onGoingStudentExams?.totalPages || 0;
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
            size: pageSize,
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
        dispatch(getOngoingStudentExam(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div>
            {
                studentExamId ?
                    <div>
                        <OnGoingExamDetail />
                    </div>
                    :
                    <div>
                        <table className="table student-exam-table">
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Name</th>
                                    <th>SubjectCode</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    exam?.onGoingStudentExams?.content?.length > 0 ?
                                        exam?.onGoingStudentExams?.content?.map((exam, index) =>
                                            <tr>
                                                <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                <td>{exam.examResponse.name}</td>
                                                <td>{exam.examResponse.subjectResponse.code}</td>
                                                <td>{exam.examResponse.subjectResponse.shortName}</td>
                                                <td>
                                                    {exam?.examResponse?.date
                                                        ? new Date(exam.examResponse.date)
                                                            .toLocaleDateString("en-GB")
                                                        : "-"}
                                                </td>
                                                <td>{exam?.examResponse?.startTime
                                                    ? new Date(exam?.examResponse?.startTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    }).toUpperCase()
                                                    : "-"}
                                                </td>
                                                <td>{exam?.examResponse?.endTime
                                                    ? new Date(exam?.examResponse?.endTime).toLocaleTimeString("en-IN", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    }).toUpperCase()
                                                    : "-"}
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        onClick={() => setSearchParams({ tab, page: pageNumber, size: pageSize, studentExamId: exam?.id })}
                                                        className="btn btn-sm custom-action-btn me-2">
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No Exam Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total : <strong>{exam?.onGoingStudentExams?.totalElements || 0}</strong>
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

export default OnGoingExam

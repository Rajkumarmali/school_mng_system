import React, { useEffect } from 'react'
import './Students.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { getStudents } from '../../../state/fee/Action';
import StudentDetails from './StudentDetails';

const Students = () => {

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")
    const studentId = searchParams.get("studentId")

    const totalPages = fee?.students?.totalPages || 0;
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

    const handleViewStudent = (stu) => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize,
            studentId: stu.id
        })
    }

    useEffect(() => {
        dispatch(getStudents(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])


    return (
        <div>
            {studentId ?
                <div>
                    <StudentDetails />
                </div>
                :
                <div>
                    <table className="table students-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>RegistrationNumber</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>PhoneNumber</th>
                                <th>Total Fee</th>
                                <th>Paid Fee</th>
                                <th>Due Fee</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fee?.students?.content?.length > 0 ?
                                    fee?.students?.content?.map((stu, index) =>
                                        <tr>
                                            <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                            <td>{stu.registrationNumber}</td>
                                            <td>{stu.name}</td>
                                            <td>{stu.email}</td>
                                            <td>{stu.phoneNumber}</td>
                                            <td>{stu.totalFee}</td>
                                            <td>{stu.totalPaidFee}</td>
                                            <td>{stu.totalPendingFee}</td>
                                            <td className='text-center'>
                                                <button
                                                    className="btn btn-sm custom-reset-btn me-2"
                                                    onClick={() => handleViewStudent(stu)}
                                                >
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan="10" className="text-center">
                                            No Student Found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Total : <strong>{fee?.students?.totalElements || 0}</strong>
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

export default Students

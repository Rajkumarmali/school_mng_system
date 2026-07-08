import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './FeeStudents.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeeStudent, getAllPaidFeeStudent, getAllUnpaidFeeStudent } from '../../state/fee/Action';
import FeeStudentDetails from './FeeStudentDetails';

const FeeStudents = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const feeStructureId = searchParams.get("id")
    const studentStatus = searchParams.get("studentStatus")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 1;
    const feeStudentId = searchParams.get("feeStudentId")

    const dispatch = useDispatch();
    const fee = useSelector((stats) => stats.fee)

    const handleBack = () => {
        setSearchParams({
            tab,
            id: feeStructureId
        })
    }

    const totalPages = studentStatus === 'all' ? (fee?.feeStudents?.totalPages || 0) :
        studentStatus === 'paid' ? (fee?.paidFeeStudents?.totalPages || 0) :
            (fee?.unpaidFeeStudents?.totalPages || 0)
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
            id: feeStructureId,
            studentStatus,
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus,
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus,
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus,
            page: pageNumber,
            size: pageSize
        })
    }

    const handleView = (feeStudentId) => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus,
            page: pageNumber,
            size: pageSize,
            feeStudentId: feeStudentId
        })
    }

    useEffect(() => {
        studentStatus === "all" ?
            dispatch(getAllFeeStudent(feeStructureId, pageNumber, pageSize))
            : studentStatus === "paid" ?
                dispatch(getAllPaidFeeStudent(feeStructureId, pageNumber, pageSize))
                : dispatch(getAllUnpaidFeeStudent(feeStructureId, pageNumber, pageSize));
    }, [dispatch, pageNumber, pageSize, feeStructureId, studentStatus]);

    return (
        <div>
            {
                !feeStudentId ?
                    <div div >
                        <div className="fee-student-detail-header">
                            <div>
                                <h2>
                                    {
                                        studentStatus === "all" ?
                                            "Students"
                                            : studentStatus === "paid" ?
                                                "Paid Students "
                                                : "Unpaid Students"
                                    }
                                </h2>
                            </div>
                            <button
                                className="back-fee-student-detail-btn"
                                onClick={handleBack}
                            >
                                <i className="bi bi-arrow-left"></i>
                                Back
                            </button>
                        </div>
                        <table className="table fee-student-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>RegistrationNo.</th>
                                    <th>Name</th>
                                    <th>PhoneNumber</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (
                                        (studentStatus === "all" && fee?.feeStudents?.content?.length === 0) ||
                                        (studentStatus === "paid" && fee?.paidFeeStudents?.content?.length === 0) ||
                                        (studentStatus === "unpaid" && fee?.unpaidFeeStudents?.content?.length === 0)
                                    ) ?
                                        (
                                            <tr>
                                                <td colSpan="10" className="text-center">
                                                    No Student Found
                                                </td>
                                            </tr>
                                        )
                                        :
                                        (
                                            (studentStatus === "all" ? fee?.feeStudents?.content
                                                : studentStatus === "paid" ? fee?.paidFeeStudents?.content
                                                    : fee?.unpaidFeeStudents?.content)?.map((s, index) =>
                                                        <tr key={s.id}>
                                                            <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                                            <td>{s.registrationNumber}</td>
                                                            <td>{s.name}</td>
                                                            <td>{s.phoneNumber}</td>
                                                            <td>{s.email}</td>
                                                            <td>{s.amount}</td>
                                                            <td>{s.status}</td>
                                                            <td className='text-center'>
                                                                <button
                                                                    onClick={() => handleView(s.id)}
                                                                    className="btn btn-sm custom-action-btn me-2">
                                                                    <i class="bi bi-eye"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                        )
                                }
                            </tbody>
                        </table>
                        <div className="pagination-container">
                            <div className="pagination-info">
                                Total :
                                {
                                    studentStatus === 'all' ? <strong> {fee?.feeStudents?.totalElements || 0}</strong>
                                        : studentStatus === 'paid' ? <strong> {fee?.paidFeeStudents?.totalElements || 0}</strong>
                                            : <strong> {fee?.unpaidFeeStudents?.totalElements || 0}</strong>
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
                    :
                    <div>
                        <FeeStudentDetails />
                    </div>
            }
        </div>
    )
}

export default FeeStudents

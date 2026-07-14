import React, { useEffect } from 'react'
import './PaidFee.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { getStudentPaidFee } from '../../../state/student/Action';

const PaidFee = () => {

    const dispatch = useDispatch();
    const student = useSelector((state) => state.student)

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const totalPages = student?.studentPaidFees?.totalPages || 0
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
        dispatch(getStudentPaidFee(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);
    console.log(student.studentPaidFees)

    return (
        <div>
            <table className="table student-fee-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Fee Type</th>
                        <th>Academic Year</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Receipt No.</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student?.studentPaidFees?.content?.length > 0 ?
                            student?.studentPaidFees?.content?.map((fee, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{fee.feeTypename}</td>
                                    <td>{fee.academicYear}</td>
                                    <td>{fee.amount}</td>
                                    <td>{fee.feePaymentResponse.paymentMode}</td>
                                    <td>{fee.feePaymentResponse.receiptNumber}</td>
                                    <td>
                                        {
                                            fee.feePaymentResponse.paymentDataAndTime ?
                                                new Date(fee.feePaymentResponse.paymentDataAndTime).toLocaleDateString("en-GB").replace(/\//g, "-")
                                                : "-"
                                        }
                                    </td>
                                    <td>{fee.status}</td>
                                    <td>-</td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="10" className="text-center">
                                    No Fee Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total :
                    <strong> {student?.studentPaidFees?.totalElements || 0}</strong>
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

export default PaidFee

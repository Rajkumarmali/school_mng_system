import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getPayments } from '../../state/fee/Action';
import './Payments.css'

const Payments = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const totalPages = fee?.payments?.totalPages || 0;
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
        dispatch(getPayments(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div>
            <table className="table students-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Registration No.</th>
                        <th>Student Name</th>
                        <th>Fee Type</th>
                        <th>Academic Year</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Receipt No.</th>
                        <th>Payment Date</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fee?.payments?.content?.length > 0 ?
                            fee?.payments?.content?.map((payment, index) =>
                                <tr>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
                                    <td>{payment.studentResponse.registrationNumber}</td>
                                    <td>{payment.studentResponse.name}</td>
                                    <td>{payment.feeTypename}</td>
                                    <td>{payment.academicYear}</td>
                                    <td>{payment.feePaymentResponse.amount}</td>
                                    <td>{payment.feePaymentResponse.paymentMode}</td>
                                    <td>{payment.feePaymentResponse.receiptNumber}</td>
                                    <td>
                                        {new Date(payment.feePaymentResponse.paymentDataAndTime)
                                            .toLocaleDateString("en-GB")
                                            .replace(/\//g, "-")}
                                    </td>
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
                                <td colSpan="10" className="text-center">
                                    No Paymnet Found
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="pagination-info">
                    Total : <strong>{fee?.payments?.totalElements || 0}</strong>
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

export default Payments

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import './StudentDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { downloadFeeReceipt, getFeeStudentById, getStudentById, getStudentsFees, payFeeByCash } from '../../../state/fee/Action';
import { jwtDecode } from 'jwt-decode';
import { getStudentScholarship } from '../../../state/scholarship/Action';

const StudentDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const studentId = searchParams.get("studentId")

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)
    const scholarship = useSelector((state) => state.scholarship)

    const handleBack = () => {
        setSearchParams({
            tab,
            page,
            size,
        })
    }

    const [viewFeeDetail, setViewFeDetails] = useState(false);
    const [view, setView] = useState("fees");
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
    })
    const [scholarshipPagintion, setScholarshipPagination] = useState({
        pageNumber: 1,
        pageSize: 10
    })


    const totalPages = fee?.studentsFees?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pagination.pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pagination.pageNumber - 1);
                i <= Math.min(totalPages - 1, pagination.pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pagination.pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setPagination({
            pageNumber: 1,
            pageSize: pageSize,
        })
    }

    const handleGetPerviousPageData = () => {
        setPagination({
            pageNumber: pagination.pageNumber - 1,
            pageSize: pagination.pageSize,
        })
    }

    const handleGetNextPageData = () => {
        setPagination({
            pageNumber: pagination.pageNumber + 1,
            pageSize: pagination.pageSize,
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setPagination({
            pageNumber: pageNumber,
            pageSize: pagination.pageSize,
        })
    }


    const totalScholarshipPages = scholarship?.student?.scholarshipResponses?.totalPages || 0;
    const geScholarshipPageNumbers = () => {
        const pages = [];

        if (totalScholarshipPages <= 7) {
            for (let i = 1; i <= totalScholarshipPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (scholarshipPagintion.pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, scholarshipPagintion.pageNumber - 1);
                i <= Math.min(totalScholarshipPages - 1, scholarshipPagintion.pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (scholarshipPagintion.pageNumber < totalScholarshipPages - 2) {
                pages.push("...");
            }

            pages.push(totalScholarshipPages);
        }

        return pages;
    };

    const handleChangeScholarshipPageSize = (e) => {
        const pageSize = e.target.value
        setScholarshipPagination({
            pageNumber: 1,
            pageSize: pageSize,
        })
    }

    const handleGetScholarshipNextPageData = () => {
        setScholarshipPagination({
            pageNumber: scholarshipPagintion.pageNumber + 1,
            pageSize: scholarshipPagintion.pageSize,
        })
    }

    const handleGetScholarshipPerviousPageData = () => {
        setScholarshipPagination({
            pageNumber: scholarshipPagintion.pageNumber - 1,
            pageSize: scholarshipPagintion.pageSize,
        })
    }

    const handleGetScholarshipPageNumberData = (pageNumber) => {
        setScholarshipPagination({
            pageNumber: pageNumber,
            pageSize: scholarshipPagintion.pageSize,
        })
    }


    const handleViewFeeDetail = async (studentFeeId) => {
        setViewFeDetails(true)
        await dispatch(getFeeStudentById(studentFeeId))
    }

    const handlePayFee = async (studentFeeId) => {
        await dispatch(payFeeByCash(studentFeeId))
        await dispatch(getFeeStudentById(studentFeeId))
        await dispatch(getStudentById(studentId));
        await dispatch(getStudentsFees(studentId, pagination.pageNumber, pagination.pageSize))
    }

    const handleDownloadFeeReceipt = async (studentFeeId) => {
        const pdfBlob = await dispatch(downloadFeeReceipt(studentFeeId));
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");
    };

    useEffect(() => {
        dispatch(getStudentById(studentId));
    }, [dispatch, studentId]);

    useEffect(() => {
        dispatch(getStudentsFees(studentId, pagination.pageNumber, pagination.pageSize))
    }, [dispatch, pagination, studentId]);

    useEffect(() => {
        dispatch(getStudentScholarship(studentId, scholarshipPagintion.pageNumber, scholarshipPagintion.pageSize))
    }, [dispatch, scholarshipPagintion, studentId]);

    return (
        <div>
            <div className="student-detail-header">
                <div className="d-flex gap-3">
                    <button
                        className="back-student-detail-btn"
                        onClick={() => setView("fees")}
                    >
                        Fees
                    </button>
                    <button
                        className="back-student-detail-btn"
                        onClick={() => setView("scholarships")}
                    >

                        Scholarship
                    </button>
                </div>
                <button
                    className="back-student-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div className="profile-card">
                <div className="fee-student-profile-header">
                    <div className="student-profile-info">
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-card-heading"></i>
                                <span>Registration Number : {fee?.student?.registrationNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill"></i>
                                <span>Name :  {fee?.student?.name}</span>
                            </div>
                            <div>
                                <i className="bi bi-gender-ambiguous"></i>
                                <span>Gender :  {fee?.student?.gender}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill"></i>
                                <span>Phone Number :  {fee?.student?.phoneNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email :  {fee?.student?.email}</span>
                            </div>
                            <div>
                                <i className="bi bi-mortarboard-fill"></i>
                                <span>Class : </span>
                            </div>
                        </div>
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-diagram-3-fill"></i>
                                <span>Department : </span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill me-2"></i>
                                <span>Father Name :  {fee?.student?.fatherName}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Father Number :  {fee?.student?.fatherNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-heart me-2"></i>
                                <span>Mother Name :  {fee?.student?.motherName}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Mother Number :  {fee?.student?.motherNumber}</span>
                            </div>
                        </div>
                        <div className="student-profile-contact">
                            <div>
                                <i className="bi bi-wallet2 me-2"></i>
                                <span>Total Fee :  {fee?.student?.totalFee}</span>
                            </div>
                            <div>
                                <i className="bi bi-cash-coin me-2"></i>
                                <span>Paid Fee:  {fee?.student?.totalPaidFee}</span>
                            </div>
                            <div>
                                <i className="bi bi-hourglass-split me-2"></i>
                                <span>Pending Fee :  {fee?.student?.totalPendingFee}</span>
                            </div>
                            <div>
                                <i className="bi bi-award-fill me-2 "></i>
                                <span>Scholarship : {fee?.student?.totalScholarship}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    view === "scholarships" ?
                        <div>
                            <div className="table-card">
                                <table className="table students-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Scholarship(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            scholarship?.student?.scholarshipResponses?.content?.length > 0 ?
                                                scholarship?.student?.scholarshipResponses?.content?.map((scholarship, index) =>
                                                    <tr>
                                                        <td>{(scholarshipPagintion.pageNumber - 1) * scholarshipPagintion.pageSize + index + 1}.</td>
                                                        <td>{scholarship?.code}</td>
                                                        <td>{scholarship?.name}</td>
                                                        <td>{scholarship?.status}</td>
                                                        <td>{scholarship?.scholarshipPercent}%</td>
                                                    </tr>
                                                )
                                                :
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Scholarship found
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="pagination-container">
                                    <div className="pagination-info">
                                        Total : <strong>{scholarship?.student?.scholarshipResponses?.totalElements || 0}</strong>
                                    </div>
                                    <div className="page-size-selector">
                                        <label>Show :</label>
                                        <select
                                            value={pagination.pageSize}
                                            onChange={handleChangeScholarshipPageSize}
                                        >
                                            <option value={10}>10</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                    <ul className="custom-pagination">
                                        <li>
                                            <button
                                                onClick={handleGetScholarshipPerviousPageData}
                                                disabled={scholarshipPagintion.pageNumber === 1}
                                            >
                                                &laquo;
                                            </button>
                                        </li>
                                        {geScholarshipPageNumbers().map((page, index) =>
                                            page === "..." ? (
                                                <li key={index} className="dots">
                                                    ...
                                                </li>
                                            ) : (
                                                <li key={index}>
                                                    <button
                                                        className={scholarshipPagintion.pageNumber === page ? "active-page" : ""}
                                                        onClick={() => handleGetScholarshipPageNumberData(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                        <li>
                                            <button
                                                onClick={handleGetScholarshipNextPageData}
                                                disabled={scholarshipPagintion.pageNumber === totalScholarshipPages}
                                            >
                                                &raquo;
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            {
                                !viewFeeDetail ?
                                    <div className="table-card">
                                        <table className="table students-table">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Fee Type</th>
                                                    <th>Academiv Year</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Due Data</th>
                                                    <th>Payment Date</th>
                                                    <th>Mode</th>
                                                    <th>ReceiptNo</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    fee?.studentsFees?.content?.length > 0 ?
                                                        fee?.studentsFees?.content?.map((fee, index) =>
                                                            <tr>
                                                                <td>{(pagination.pageNumber - 1) * pagination.pageSize + index + 1}.</td>
                                                                <td>{fee.feeTypename}</td>
                                                                <td>{fee.academicYear}</td>
                                                                <td>{fee.amount}</td>
                                                                <td>{fee.status}</td>
                                                                <td>
                                                                    {fee.DueDate
                                                                        ? new Date(fee.DueDate).toLocaleDateString("en-GB").replace(/\//g, "-")
                                                                        : "-"}
                                                                </td>
                                                                <td>
                                                                    {fee.feePaymentResponse?.paymentDataAndTime
                                                                        ? new Date(fee.feePaymentResponse?.paymentDataAndTime).toLocaleDateString("en-GB").replace(/\//g, "-")
                                                                        : "-"}
                                                                </td>
                                                                <td>{fee?.feePaymentResponse?.paymentMode}</td>
                                                                <td>{fee?.feePaymentResponse?.receiptNumber}</td>
                                                                <td className='text-center'>
                                                                    <button
                                                                        className="btn btn-sm custom-reset-btn me-2"
                                                                        onClick={() => handleViewFeeDetail(fee.id)}
                                                                    >
                                                                        <i class="bi bi-eye"></i>
                                                                    </button>
                                                                </td>
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
                                                Total : <strong>{fee?.studentsFees?.totalElements || 0}</strong>
                                            </div>
                                            <div className="page-size-selector">
                                                <label>Show :</label>
                                                <select
                                                    value={pagination.pageSize}
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
                                                        disabled={pagination.pageNumber === 1}
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
                                                                className={pagination.pageNumber === page ? "active-page" : ""}
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
                                                        disabled={pagination.pageNumber === totalPages}
                                                    >
                                                        &raquo;
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div className="student-fee-info">
                                        <div className="student-fee-header">
                                            <h4>Fee Details</h4>
                                            <div>
                                                {
                                                    fee?.feeStudent?.feePaymentResponse ?
                                                        <button className="print-btn"
                                                            onClick={() => handleDownloadFeeReceipt(fee?.feeStudent?.id)}
                                                        >
                                                            <i class="bi bi-printer-fill"></i>
                                                        </button>
                                                        :
                                                        isAccountant &&
                                                        <button className="print-btn"
                                                            onClick={() => handlePayFee(fee?.feeStudent?.id)}
                                                        >
                                                            Collect Cash
                                                        </button>
                                                }
                                                <button className="print-btn"
                                                    onClick={() => setViewFeDetails(false)}
                                                >
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="student-fee-grid">
                                            <div>
                                                <i className="bi bi-cash-stack"></i>
                                                <span>
                                                    <strong>Fee Type :</strong> {fee?.feeStudent?.feeTypename}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-credit-card-fill"></i>
                                                <span>
                                                    <strong>Payment Mode :</strong>{" "}
                                                    {fee?.feeStudent?.feePaymentResponse?.paymentMode || "-"}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-currency-rupee"></i>
                                                <span>
                                                    <strong>Amount :</strong> ₹ {fee?.feeStudent?.amount}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-receipt-cutoff"></i>
                                                <span>
                                                    <strong>Receipt No :</strong>{" "}
                                                    {fee?.feeStudent?.feePaymentResponse?.receiptNumber || "-"}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-calendar-event-fill"></i>
                                                <span>
                                                    <strong>Academic Year :</strong> {fee?.feeStudent?.academicYear}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-upc-scan"></i>
                                                <span>
                                                    <strong>Transaction Id :</strong>{" "}
                                                    {fee?.feeStudent?.feePaymentResponse?.transactionId || "-"}
                                                </span>
                                            </div>
                                            <div>
                                                <i
                                                    className={
                                                        fee?.feeStudent?.status === "PAID"
                                                            ? "bi bi-patch-check-fill text-success"
                                                            : "bi bi-hourglass-split text-warning"
                                                    }
                                                ></i>
                                                <span>
                                                    <strong>Status :</strong> {fee?.feeStudent?.status}
                                                </span>
                                            </div>
                                            <div>
                                                <i className="bi bi-clock-history"></i>
                                                <span>
                                                    <strong>Payment Date :</strong>{" "}
                                                    {fee?.feeStudent?.feePaymentResponse?.paymentDataAndTime
                                                        ? new Date(
                                                            fee.feeStudent.feePaymentResponse.paymentDataAndTime
                                                        )
                                                            .toLocaleDateString("en-GB")
                                                            .replace(/\//g, "-")
                                                        : "-"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                }

            </div>
        </div>
    )
}

export default StudentDetails

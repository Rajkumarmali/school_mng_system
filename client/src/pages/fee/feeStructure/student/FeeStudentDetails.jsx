import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import './FeeStudentDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { downloadFeeReceipt, getFeeStudentById, payFeeByCash } from '../../../../state/fee/Action';
import { jwtDecode } from 'jwt-decode';



const FeeStudentDetails = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;
    const isAccountant = roles.includes("ACCOUNTANT")

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const feeStructureId = searchParams.get("id")
    const studentStatus = searchParams.get("studentStatus")
    const pageNumber = Number(searchParams.get('page'))
    const pageSize = Number(searchParams.get("size"))
    const studentFeeId = searchParams.get("feeStudentId")

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)


    const handleBack = () => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus: studentStatus,
            page: pageNumber,
            size: pageSize
        })
    }

    const handlePayFee = async (studentFeeId) => {
        await dispatch(payFeeByCash(studentFeeId))
        await dispatch(getFeeStudentById(studentFeeId))
    }

    const handleDownloadFeeReceipt = async (studentFeeId) => {
        const pdfBlob = await dispatch(downloadFeeReceipt(studentFeeId));
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");
    };

    useEffect(() => {
        dispatch(getFeeStudentById(studentFeeId))
    }, [dispatch, studentFeeId]);

    return (
        <div>
            <div className="fee-student-detail-header">
                <div>
                    <h2>

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
            <div className="fee-student-profile-header">
                <div>
                    <div className="fee-student-profile-avatar">
                        {
                            fee?.feeStudent?.studentResponse?.image ?
                                <img src={`http://localhost:8080/${fee?.feeStudent?.studentResponse?.image}`} alt=""
                                    className='fee-student-image' />
                                : <i className="bi bi-person-fill"></i>
                        }
                    </div>
                </div>
                <div className="fee-student-profile-info">
                    <div className="fee-student-profile-contact">
                        <div>
                            <i className="bi bi-card-heading"></i>
                            <span>Registration Number : {fee?.feeStudent?.studentResponse?.registrationNumber}</span>
                        </div>
                        <div>
                            <i className="bi bi-person-fill"></i>
                            <span>Name : {fee?.feeStudent?.studentResponse?.name}</span>
                        </div>
                        <div>
                            <i className="bi bi-gender-ambiguous"></i>
                            <span>Gender : {fee?.feeStudent?.studentResponse?.gender}</span>
                        </div>
                        <div>
                            <i className="bi bi-telephone-fill"></i>
                            <span>Phone Number : {fee?.feeStudent?.studentResponse?.phoneNumber}</span>
                        </div>

                    </div>
                    <div className="fee-student-profile-contact">
                        <div>
                            <i className="bi bi-envelope-fill"></i>
                            <span>Email : {fee?.feeStudent?.studentResponse?.email}</span>
                        </div>
                        <div>
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Class : {fee?.feeStudent?.className} ({fee?.feeStudent?.classCode})</span>
                        </div>
                        <div>
                            <i className="bi bi-diagram-3-fill"></i>
                            <span>Department : {fee?.feeStudent?.departmentName} ({fee?.feeStudent?.departmentCode})</span>
                        </div>
                        <div>
                            <i className="bi bi-calendar-event"></i>
                            <span>Academic Year : {fee?.feeStudent?.academicYear}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fee-student-fee-info">
                <div className="fee-student-fee-header">
                    <h4>Fee Details</h4>
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
                </div>

                <div className="fee-student-fee-grid">
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
        </div>
    )
}

export default FeeStudentDetails

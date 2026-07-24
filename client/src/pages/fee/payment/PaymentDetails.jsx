import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { downloadFeeReceipt, getPaymentById } from '../../../state/fee/Action';
import './PaymentDetails.css'

const PaymentDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const paymentId = searchParams.get("paymentId")

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const handleBack = () => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize,

        })
    }

    const handleDownloadFeeReceipt = async (studentFeeId) => {
        const pdfBlob = await dispatch(downloadFeeReceipt(studentFeeId));
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, "_blank");
    };

    useEffect(() => {
        dispatch(getPaymentById(paymentId))
    }, [dispatch, paymentId])

    return (
        <div>
            <div className="payment-detail-header">
                <div>
                    <h2>Payment Details</h2>
                </div>
                <button
                    className="back-payment-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div className="payment-profile-card">
                <div className="fee-payment-profile-header">
                    <div className="payment-profile-info">
                        <div className="payment-profile-contact">
                            <div>
                                <i className="bi bi-card-heading"></i>
                                <span>Registration Number : {fee?.payment?.studentResponse?.registrationNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill"></i>
                                <span>Name :  {fee?.payment?.studentResponse?.name}</span>
                            </div>
                            <div>
                                <i className="bi bi-gender-ambiguous"></i>
                                <span>Gender :   {fee?.payment?.studentResponse?.gender}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill"></i>
                                <span>Phone Number :   {fee?.payment?.studentResponse?.phoneNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email :  {fee?.payment?.studentResponse?.email}</span>
                            </div>
                            <div>
                                <i className="bi bi-mortarboard-fill"></i>
                                <span>Class : </span>
                            </div>
                        </div>
                        <div className="payment-profile-contact">
                            <div>
                                <i className="bi bi-diagram-3-fill"></i>
                                <span>Department : </span>
                            </div>
                            <div>
                                <i className="bi bi-person-fill me-2"></i>
                                <span>Father Name :  {fee?.payment?.studentResponse?.fatherName}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Father Number :  {fee?.payment?.studentResponse?.fatherNumber}</span>
                            </div>
                            <div>
                                <i className="bi bi-person-heart me-2"></i>
                                <span>Mother Name :   {fee?.payment?.studentResponse?.motherName}</span>
                            </div>
                            <div>
                                <i className="bi bi-telephone-fill me-2"></i>
                                <span>Mother Number :   {fee?.payment?.studentResponse?.motherNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-fee-info">
                <div className="payment-fee-header">
                    <h4>Fee Details</h4>
                    <button className="print-btn"
                        onClick={() => handleDownloadFeeReceipt(fee?.payment?.id)}>
                        <i class="bi bi-printer-fill"></i>
                    </button>
                </div>

                <div className="payment-fee-grid">
                    <div>
                        <i className="bi bi-cash-stack"></i>
                        <span>
                            <strong>Fee Type :</strong> {fee?.payment?.feeTypename}
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-credit-card-fill"></i>
                        <span>
                            <strong>Payment Mode :</strong>{" "}
                            {fee?.payment?.feePaymentResponse?.paymentMode || "-"}
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-currency-rupee"></i>
                        <span>
                            <strong>Amount :</strong> ₹ {fee?.payment?.feePaymentResponse?.amount}
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-receipt-cutoff"></i>
                        <span>
                            <strong>Receipt No :</strong>{" "}
                            {fee?.payment?.feePaymentResponse?.receiptNumber || "-"}
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-calendar-event-fill"></i>
                        <span>
                            <strong>Academic Year :</strong> {fee?.payment?.academicYear}
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-upc-scan"></i>
                        <span>
                            <strong>Transaction Id :</strong>{" "}
                            {fee?.payment?.feePaymentResponse?.transactionId || "-"}
                        </span>
                    </div>
                    <div>
                        <i
                            className=
                            "bi bi-patch-check-fill text-success"
                        ></i>
                        <span>
                            <strong>Status :</strong> PAID
                        </span>
                    </div>
                    <div>
                        <i className="bi bi-clock-history"></i>
                        <span>
                            <strong>Payment Date :</strong>{" "}
                            {fee?.payment?.feePaymentResponse?.paymentDataAndTime
                                ? new Date(
                                    fee.payment.feePaymentResponse.paymentDataAndTime
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

export default PaymentDetails

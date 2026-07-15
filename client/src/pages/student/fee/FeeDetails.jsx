import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import './FeeDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFeeStudentById, payFeeByRazor, updatePayment } from '../../../state/fee/Action';


const FeeDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const studentFeeId = searchParams.get("feeId")
    const paymentId = searchParams.get("razorpay_payment_id")

    const paymentProcessed = useRef(false);

    const dispatch = useDispatch();
    const fee = useSelector((state) => state.fee)

    const handleBack = () => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    const handlePayFee = async () => {
        await dispatch(payFeeByRazor(studentFeeId));
    }

    useEffect(() => {
        const loadData = async () => {
            if (paymentId && !paymentProcessed.current) {
                const payload = {
                    paymentId,
                    studentFeeId
                }
                paymentProcessed.current = true;
                await dispatch(updatePayment(payload))
            }
            await dispatch(getFeeStudentById(studentFeeId))
        }

        loadData();
    }, [dispatch, studentFeeId, tab, paymentId, setSearchParams])


    return (
        <div>
            <div className="fee-detail-header">
                <div>
                    <h2>Fee Details</h2>
                </div>

                <button
                    className="back-fee-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div className="student-fee-info">
                <div className="student-fee-header">
                    <h4>Fee Details</h4>
                    <div>
                        {
                            !fee?.feeStudent?.feePaymentResponse ?
                                <button className="btn btn-sm custom-reset-btn me-2"
                                    onClick={handlePayFee}>
                                    Pay Fee
                                </button>
                                :
                                <button className="print-btn">
                                    <i class="bi bi-printer-fill"></i>
                                </button>
                        }

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
        </div>
    )
}

export default FeeDetails

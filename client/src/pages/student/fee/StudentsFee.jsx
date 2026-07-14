import React, { useEffect } from 'react'
import './StudentsFee.css'
import { useSearchParams } from 'react-router-dom';
import PendingFee from './PendingFee';
import PaidFee from './PaidFee';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentFeeOverview } from '../../../state/student/Action';

const StudentsFee = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab")

    const dispatch = useDispatch();
    const student = useSelector((state) => state.student)
    useEffect(() => {
        dispatch(getStudentFeeOverview())
    }, [dispatch]);

    const processPercent = ((student?.studentFeeOverview?.totalPaidFee / student?.studentFeeOverview?.totalFee) * 100).toFixed(2);


    return (
        <div className="student-fee-container">
            <nav class="student-fee-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "pending-fee" })}
                        >
                            Pending Fees
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "paid-fee" })}
                        >
                            Paid Fees
                        </button>
                    </li>
                </ul>
            </nav>
            <div className='student-fee-card'>
                {
                    activeTab === "pending-fee" ?
                        <PendingFee />
                        :
                        activeTab === 'paid-fee' ?
                            <PaidFee />
                            :
                            <div>
                                <div className="stats-container">
                                    <div className="stat-card">
                                        <i className="bi bi-wallet2"></i>
                                        <h3>{student?.studentFeeOverview?.totalFee}</h3>
                                        <span>Total Fee Amount</span>
                                    </div>
                                    <div className="stat-card">
                                        <i className="bi bi-cash-coin"></i>
                                        <h3>{student?.studentFeeOverview?.totalPaidFee}</h3>
                                        <span>Total Paid Fee</span>
                                    </div>
                                    <div className="stat-card">
                                        <i className="bi bi-hourglass-split"></i>
                                        <h3>{student?.studentFeeOverview?.totalPendingFee}</h3>
                                        <span>Total Pending Fee</span>
                                    </div>
                                    <div className="stat-card">
                                        <h5>{processPercent}%</h5>
                                        <span>Payment Progress</span>
                                        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar bg-success" style={{ width: `${processPercent}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default StudentsFee

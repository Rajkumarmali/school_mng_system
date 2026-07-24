import React, { useEffect } from 'react'
import './Fee.css'
import { useSearchParams } from 'react-router-dom'
import FeeType from './FeeType/FeeType';
import FeeStructure from './feeStructure/FeeStructure';
import Students from './students/Students';
import Payments from './payment/Payment';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeOverview } from '../../state/fee/Action';
import Scholarship from './scholarship/Scholarship';



const Fee = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "fee"

    const dispatch = useDispatch()
    const fee = useSelector((state) => state.fee)

    const processPercent = ((fee?.feeOverview?.totalPaidFee / fee?.feeOverview?.totalFee) * 100).toFixed(2);

    useEffect(() => {
        dispatch(getFeeOverview())
    }, [dispatch])


    return (
        <div className='fee-container'>
            <nav class="fee-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee" })}
                        >
                            Fee Dashboard
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-type" })}
                        >
                            Fee Type
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-structure" })}
                        >
                            Fee Structure
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-scholarship" })}
                        >
                            Scholarship
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-student" })}
                        >
                            Students
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-payment" })}
                        >
                            Payments
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="fee-card">
                {
                    activeTab === "fee-type" ?
                        <FeeType />
                        :
                        activeTab === "fee-structure" ?
                            <FeeStructure />
                            :
                            activeTab === "fee-student" ?
                                <Students />
                                :
                                activeTab === "fee-payment" ?
                                    <Payments />
                                    :
                                    activeTab === "fee-scholarship" ?
                                        <Scholarship />
                                        :
                                        <div>
                                            <div className="stats-container">
                                                <div className="stat-card">
                                                    <i className="bi bi-wallet2"></i>
                                                    <h3>{fee?.feeOverview?.totalFee}</h3>
                                                    <span>Total Collection Amount</span>
                                                </div>
                                                <div className="stat-card">
                                                    <i className="bi bi-cash-coin"></i>
                                                    <h3>{fee?.feeOverview?.totalPaidFee}</h3>
                                                    <span>Total Collected Amount</span>
                                                </div>
                                                <div className="stat-card">
                                                    <i className="bi bi-hourglass-split"></i>
                                                    <h3>{fee?.feeOverview?.totalPendingFee}</h3>
                                                    <span>Total Pending Amount</span>
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

export default Fee

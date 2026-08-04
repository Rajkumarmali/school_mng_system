import React, { useEffect } from 'react'
import './SectionDetails.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeSectionById } from '../../../state/fee/Action';
const SectionDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const tab = searchParams.get("tab")
    const sectionId = searchParams.get("sectionId")

    const dispatch = useDispatch()
    const fee = useSelector((state) => state.fee)

    const handleBack = () => {
        setSearchParams({
            tab,
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        dispatch(getFeeSectionById(sectionId))
    }, [dispatch, sectionId])

    return (
        <div>
            <div className="fee-section-detail-header">
                <div>
                    <h2>Section Details</h2>
                </div>
                <button
                    className="back-fee-section-detail-btn"
                    onClick={handleBack}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
            </div>
            <div className="fee-section-detail-card">
                <div className="fee-section-detail-header">
                    <div className="fee-section-detail-info">
                        <div className="fee-section-detail-contact">
                            <div>
                                <i className="bi bi-book-fill me-2"></i>
                                <span>Course Name : {fee?.feeSection?.courseName}</span>
                            </div>
                            <div>
                                <i className="bi bi-bookmark-fill me-2"></i>
                                <span>Course Code : {fee?.feeSection?.courseCode}</span>
                            </div>
                            <div>
                                <i className="bi bi-building-fill me-2"></i>
                                <span>Department Name : {fee?.feeSection?.departmentName}</span>
                            </div>
                            <div>
                                <i className="bi bi-diagram-3-fill me-2"></i>
                                <span>Department Code : {fee?.feeSection?.departmentCode}</span>
                            </div>
                        </div>
                        <div className="fee-section-detail-contact">
                            <div>
                                <i className="bi bi-door-open-fill me-2"></i>
                                <span>Section Name : {fee?.feeSection?.name} ({fee?.feeSection?.code})</span>
                            </div>
                            <div>
                                <i className="bi bi-mortarboard-fill me-2"></i>
                                <span>Year / semester : {fee?.feeSection?.year}  / {fee?.feeSection?.semester ? fee?.feeSection?.semester : "-"}</span>
                            </div>
                            <div>
                                <i className="bi bi-calendar2-week-fill"></i>
                                <span> Academic Year : {fee?.feeSection?.AcademicYear}</span>
                            </div>
                            <div>
                                <i
                                    className={`bi ${fee?.feeSection?.status === "ACTIVE"
                                        ? "bi-check-circle-fill"
                                        : "bi-x-circle-fill"
                                        } me-2`}
                                ></i>
                                <span>Status : {fee?.feeSection?.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stats-container">
                <div className="stat-card">
                    <i className="bi bi-people-fill stat-icon"></i>
                    <h3>{fee?.feeSection?.totalStudent}</h3>
                    <span>Total Student</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-wallet2 stat-icon"></i>
                    <h3>{fee?.feeSection?.totalFee}</h3>
                    <span>Total Fee</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-cash-stack stat-icon"></i>
                    <h3>{fee?.feeSection?.collectedFee}</h3>
                    <span>Total Collection Amount</span>
                </div>
                <div className="stat-card">
                    <i className="bi bi-hourglass-split stat-icon"></i>
                    <h3>{fee?.feeSection?.totalPendingFee}</h3>
                    <span>Total Pending Fee</span>
                </div>
            </div>
        </div>
    )
}

export default SectionDetails

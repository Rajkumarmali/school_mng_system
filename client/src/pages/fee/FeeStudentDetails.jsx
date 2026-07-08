import React from 'react'
import { useSearchParams } from 'react-router-dom';


const FeeStudentDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab")
    const feeStructureId = searchParams.get("id")
    const studentStatus = searchParams.get("studentStatus")
    const pageNumber = Number(searchParams.get('page'))
    const pageSize = Number(searchParams.get("size"))

    const handleBack = () => {
        setSearchParams({
            tab,
            id: feeStructureId,
            studentStatus: studentStatus,
            page: pageNumber,
            size: pageSize
        })
    }

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
        </div>
    )
}

export default FeeStudentDetails

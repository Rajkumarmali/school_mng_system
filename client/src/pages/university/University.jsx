import React, { useEffect } from 'react'
import './University.css'
import { useSearchParams } from 'react-router-dom'
import Student from './student/Student';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversity } from '../../state/university/Action';
const University = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab")

    const dispatch = useDispatch()
    const university = useSelector((state) => state.university)

    useEffect(() => {
        dispatch(getUniversity())
    }, [dispatch]);

    return (
        <div className='university-container'>
            <nav className="university-nav-card navbar-expand-lg ">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ tab: "overview" })}
                        >
                            Overview
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ tab: "student" })}
                        >
                            Students
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => setSearchParams({ tab: "admission" })}
                        >
                            Admissions
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="university-card">
                {
                    (activeTab === "student" || activeTab === "admission") ?
                        <div>
                            <Student />
                        </div>
                        :
                        <div>
                            <div className="university-header">
                                <div className="university-logo">
                                    <i className="bi bi-building"></i>
                                </div>
                                <div>
                                    <h2>{university?.university?.name}({university?.university?.shortName})</h2>
                                    <p>Code : {university?.university?.universityCode}</p>
                                    <p>Email : {university?.university?.email}</p>
                                    <p>Phone : {university?.university?.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="university-info">
                                <div className="section-header">
                                    <h4>Address : </h4>
                                </div>
                                <div className="info-grid">
                                    <div>
                                        <strong>Address :</strong> {university?.university?.addressResponse?.address}
                                    </div>

                                    <div>
                                        <strong>City :</strong>{university?.university?.addressResponse?.city}
                                    </div>

                                    <div>
                                        <strong>District :</strong>{university?.university?.addressResponse?.district}
                                    </div>

                                    <div>
                                        <strong>State :</strong>{university?.university?.addressResponse?.state}
                                    </div>

                                    <div>
                                        <strong>Country :</strong> {university?.university?.addressResponse?.country}
                                    </div>

                                    <div>
                                        <strong>Pincode :</strong> {university?.university?.addressResponse?.pincode}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default University

import React, { useEffect } from 'react'
import './TimeTable.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getUniversityExamTimeTable } from '../../../state/universityExam/Action';

const TimeTable = ({ exam }) => {

    const dispactch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;
    const universityExamId = searchParams.get("universityExamId")

    const handleBack = () => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

    useEffect(() => {
        dispactch(getUniversityExamTimeTable(universityExamId))
    }, [dispactch, universityExamId])

    return (
        <div className="students-universityexam-timetable-card">
            <div className="timetable-header">
                <div className="timetable-title">
                    <div className="timetable-icon">
                        <i className="bi bi-calendar3"></i>
                    </div>
                    <div>
                        <h3>Examination Time Table</h3>
                        <p>
                            Your upcoming university examination schedule
                        </p>
                    </div>
                </div>
                <button className="timetable-back-btn" onClick={handleBack}>
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                </button>
            </div>
            <div className="timetable-table-wrapper">
                <table className="timetable-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Date & Day</th>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Exam Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {universityExam?.universityExamTimetable?.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    {index + 1}.
                                </td>
                                <td>
                                    {item.date ? new Date(item.date)?.toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        weekday: 'long'
                                    }) : "-"}
                                </td>
                                <td>
                                    {item.subjectResponse.name}
                                </td>
                                <td>
                                    {item.subjectResponse.code}
                                </td>
                                <td>{item.subjectResponse.subjectType}</td>
                                <td>
                                    {item.startTime ? new Date(item.startTime)?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "-"}
                                    {" - "} {item.endTime ? new Date(item.endTime)?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="timetable-footer" >
                <div className="footer-message">
                    <i className="bi bi-check-circle"></i>
                    <span>
                        Time table has been released by the University
                    </span>
                </div>
                <button className="print-timetable-btn">
                    <i className="bi bi-printer"></i>
                    Print Time Table
                </button>
            </div>
        </div>
    )
}

export default TimeTable


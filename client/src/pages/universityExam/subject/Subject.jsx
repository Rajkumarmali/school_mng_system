import React, { useEffect } from 'react'
import './Subject.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getUniversityExamSubjects } from '../../../state/universityExam/Action';
import SubjectDetail from './SubjectDetail';

const Subject = () => {

    const dispatch = useDispatch();
    const universityExam = useSelector((state) => state.universityExam)

    const [searchParams, setSearchParams] = useSearchParams();
    const universityExamId = searchParams.get("universityExamId")
    const tab = searchParams.get("tab")
    const subjectId = searchParams.get("subjectId")

    useEffect(() => {
        dispatch(getUniversityExamSubjects(universityExamId))
    }, [dispatch, universityExamId]);

    return (
        <div>
            {
                subjectId ?
                    <div>
                        <SubjectDetail />
                    </div>
                    :
                    <div>
                        <table className="table universtiy-exam-subject-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>SubjectCode</th>
                                    <th>Name</th>
                                    <th>SubjectType</th>
                                    <th>ExamDate</th>
                                    <th>TotalStudents</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    universityExam?.universityExamSubjects?.length > 0 ?
                                        universityExam?.universityExamSubjects?.map((subject, index) =>
                                            <tr key={subject.id}>
                                                <td>{index + 1}.</td>
                                                <td>{subject?.subjectResponse?.code}</td>
                                                <td>{subject?.subjectResponse?.shortName}</td>
                                                <td>{subject?.subjectResponse?.subjectType}</td>
                                                <td>{subject?.date ? new Date(subject?.date).toLocaleDateString("en-GB") : '-'}</td>
                                                <td>{subject?.totalStudents}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className="btn btn-sm custom-reset-btn me-2"
                                                        onClick={() => setSearchParams({ universityExamId, tab, subjectId: subject.id })}
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No Exam Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default Subject

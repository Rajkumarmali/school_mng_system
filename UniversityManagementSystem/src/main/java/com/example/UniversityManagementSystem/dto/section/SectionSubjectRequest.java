package com.example.UniversityManagementSystem.dto.section;

public class SectionSubjectRequest {
    private String subjectCode;
    private String teacherEmpIdOrEmail;
    private Boolean addAllSectionStudent;

    public SectionSubjectRequest() {
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getTeacherEmpIdOrEmail() {
        return teacherEmpIdOrEmail;
    }

    public void setTeacherEmpIdOrEmail(String teacherEmpIdOrEmail) {
        this.teacherEmpIdOrEmail = teacherEmpIdOrEmail;
    }

    public Boolean getAddAllSectionStudent() {
        return addAllSectionStudent;
    }

    public void setAddAllSectionStudent(Boolean addAllSectionStudent) {
        this.addAllSectionStudent = addAllSectionStudent;
    }
}

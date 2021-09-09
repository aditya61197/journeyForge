package journeyForge.DataProfiling;

public class Properties {

    private Object skillsRequested;
    private Object averageSalary;
    private Object totalJobOpenings;
    private Object commonJobTitles;
    private Object requestedEducation;


    public Properties(Object skillsRequested, Object averageSalary, Object totalJobOpenings, Object commonJobTitles, Object requestedEducation) {
        this.skillsRequested = skillsRequested;
        this.averageSalary = averageSalary;
        this.totalJobOpenings = totalJobOpenings;
        this.commonJobTitles = commonJobTitles;
        this.requestedEducation = requestedEducation;
    }

    public Object getCommonJobTitles() {
        return commonJobTitles;
    }

    public void setCommonJobTitles(Object commonJobTitles) {
        this.commonJobTitles = commonJobTitles;
    }

    public Object getRequestedEducation() {
        return requestedEducation;
    }

    public void setRequestedEducation(Object requestedEducation) {
        this.requestedEducation = requestedEducation;
    }

    public Properties() {
    }

    public Object getSkillsRequested() {
        return skillsRequested;
    }

    public void setSkillsRequested(Object skillsRequested) {
        this.skillsRequested = skillsRequested;
    }

    public Object getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(Object averageSalary) {
        this.averageSalary = averageSalary;
    }

    public Object getTotalJobOpenings() {
        return totalJobOpenings;
    }

    public void setTotalJobOpenings(Object totalJobOpenings) {
        this.totalJobOpenings = totalJobOpenings;
    }
}

package com.stackroute.journeyservice.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Domain")
public class Domain {
    @Id
    private String domainId;
    private String domainName;
    private String domainDescription;
    private String domainCreatedBy;
    private LocalDateTime domainCreatedOn;
    private String domainUpdatedBy;
    private LocalDateTime domainUpdatedOn;
    private String[] tags;
    private String domainImage;

    public Domain() {
    }

    public Domain(String domainId, String domainName, String domainDescription, String domainCreatedBy,
            LocalDateTime domainCreatedOn, String domainUpdatedBy, LocalDateTime domainUpdatedOn, String[] tags,
            String domainImage) {
        this.domainId = domainId;
        this.domainName = domainName;
        this.domainDescription = domainDescription;
        this.domainCreatedBy = domainCreatedBy;
        this.domainCreatedOn = domainCreatedOn;
        this.domainUpdatedBy = domainUpdatedBy;
        this.domainUpdatedOn = domainUpdatedOn;
        this.tags = tags;
        this.domainImage = domainImage;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public String getDomainImage() {
        return domainImage;
    }

    public void setDomainImage(String domainImage) {
        this.domainImage = domainImage;
    }

    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getDomainDescription() {
        return domainDescription;
    }

    public void setDomainDescription(String domainDescription) {
        this.domainDescription = domainDescription;
    }

    public String getDomainCreatedBy() {
        return domainCreatedBy;
    }

    public void setDomainCreatedBy(String domainCreatedBy) {
        this.domainCreatedBy = domainCreatedBy;
    }

    public LocalDateTime getDomainCreatedOn() {
        return domainCreatedOn;
    }

    public void setDomainCreatedOn(LocalDateTime domainCreatedOn) {
        this.domainCreatedOn = domainCreatedOn;
    }

    public String getDomainUpdatedBy() {
        return domainUpdatedBy;
    }

    public void setDomainUpdatedBy(String domainUpdatedBy) {
        this.domainUpdatedBy = domainUpdatedBy;
    }

    public LocalDateTime getDomainUpdatedOn() {
        return domainUpdatedOn;
    }

    public void setDomainUpdatedOn(LocalDateTime domainUpdatedOn) {
        this.domainUpdatedOn = domainUpdatedOn;
    }

}

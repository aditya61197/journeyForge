package com.stackroute.journeyservice.NodeCategory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document
public class NodeCategory {

    @Id
    private String nodeCategoryId;

    private String nodeCategoryName;
    private String domainId;

//    @DBRef
//    private Domain domain;

    private String[] fields;
    private String description;
    private String createdBy;
    private LocalDateTime createdOn;

    public NodeCategory() {
    }

    public NodeCategory(String nodeCategoryName, String description, String createdBy, String[] fields) {
        this.nodeCategoryName = nodeCategoryName;
        this.description = description;
        this.createdBy = createdBy;
        this.fields = fields;
    }

    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(UUID domainId) {
        this.domainId = domainId.toString();
    }

    public String getNodeCategoryId() {
        return nodeCategoryId;
    }

    public void setNodeCategoryId(UUID nodeCategoryId) {
        this.nodeCategoryId = nodeCategoryId.toString();
    }

    public String[] getFields() {
        return fields;
    }

    public void setFields(String[] fields) {
        this.fields = fields;
    }

    public String getNodeCategoryName() {
        return nodeCategoryName;
    }

    public void setNodeCategoryName(String nodeCategoryName) {
        this.nodeCategoryName = nodeCategoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }
}

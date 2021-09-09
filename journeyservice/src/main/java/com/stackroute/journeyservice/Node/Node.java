package com.stackroute.journeyservice.Node;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDateTime;
import java.util.UUID;

@Document
public class Node {

    @Id
    private String nodeId;
    private String nodeName;
//    private String nodeCategoryName;

    private String nodeCategoryId;
    private String domainId;
//    private Map<String, String> properties;
    private Object properties;
    private String createdBy;

    private LocalDateTime createdOn;
    private String updatedBy;


    private LocalDateTime updatedOn;

    public Node() {
    }

    public Node(String nodeName, String nodeCategoryId, String createdBy, Object properties) {
        this.nodeName = nodeName;
        this.nodeCategoryId = nodeCategoryId;
        this.createdBy = createdBy;
        this.properties = properties;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(UUID nodeId) {
        this.nodeId = nodeId.toString();
    }

//    public String getNodeCategoryName() {
//        return nodeCategoryName;
//    }
//
//    public void setNodeCategoryName(String nodeCategoryName) {
//        this.nodeCategoryName = nodeCategoryName;
//    }


    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeCategoryId() {
        return nodeCategoryId;
    }

    public void setNodeCategoryId(String nodeCategoryId) {
        this.nodeCategoryId = nodeCategoryId;
    }

    public Object getProperties() {
        return properties;
    }

    public void setProperties(Object properties) {
        this.properties = properties;
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

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }
}

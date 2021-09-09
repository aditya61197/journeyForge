package com.stackroute.journeyservice.Journey;
import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Node
public class Journey {
    @Id
    private String nodeId;
    private String nodeName;
    private String nodeCategoryId;
    private String domainId;
//   private Map<String, String> properties;
    private Object properties;
    private String createdBy;
    private LocalDateTime createdOn;
    private String updatedBy;
    private LocalDateTime updatedOn;
    private String nodeCategoryLabel;
    private String status;

    public String getNodeCategoryLabel() {
        return nodeCategoryLabel;
    }

    public void setNodeCategoryLabel(String nodeCategoryLabel) {
        this.nodeCategoryLabel = nodeCategoryLabel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Relationship(type = "Next", direction = Relationship.Direction.OUTGOING)
    private List<Journey> journey;

    Journey(){

    }
    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
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

    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
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

    public List<Journey> getJourney() {
        return journey;
    }

    public void setJourney(List<Journey> journey) {
        this.journey = journey;
    }

    public Journey(String nodeId, String nodeName, String nodeCategoryId, String domainId, Map<String,
            String> properties, String createdBy, LocalDateTime createdOn, String updatedBy,
                   LocalDateTime updatedOn, List<Journey> journey,String nodeCategoryLabel,String status) {
        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.nodeCategoryId = nodeCategoryId;
        this.domainId = domainId;
        this.properties = properties;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
        this.journey = journey;
        this.nodeCategoryLabel=nodeCategoryLabel;
        this.status=status;
    }

}

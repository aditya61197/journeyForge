package com.stackroute.journeyservice.Journey;

import java.util.List;

public interface JourneyService {

    String createRelations(Journey journey);

    List<Journey> getAllTrees(String domainId,String status);

    List<Journey>  getTreesByPropertyName(String nodeId, String nodeCategoryId, String domainId,String nodeCategoryLabel,String status);

    List<Journey> getSubTreeOfJourney(String sourceNode, String endNode,String status);

    //String deleteRelation(String sourceNodeId, String endNodeId);
}

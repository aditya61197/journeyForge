package com.stackroute.journeyservice.Node;

import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeAlreadyExistsInSpecifiedCategory;

import java.util.List;

public interface NodeService {

    Node addNode(Node node, String username) throws NodeAlreadyExistsInSpecifiedCategory, DomainDontExists;

    Node getNodeByNodeId(String nodeId);

    Node deleteNode(String nodeId);

    Node updateNode(Node node, String username) throws DomainDontExists, NodeAlreadyExistsInSpecifiedCategory;

    List<Node> getAllNodesByNodeNameAndNodeCategoryIdAndDomainId(String nodeName, String nodeCategoryId, String domainId);

    List<Node> getAllNodesByNodeNameAndNodeCategoryIdAndDomainIdWithPage(String nodeName, String nodeCategoryId, String domainId, int page, int limit);

    List<Node> getNodesByNodeCategoryId(String nodeCategoryId);
    Node updatePropertiesForNode(Node node, Object properties);
}


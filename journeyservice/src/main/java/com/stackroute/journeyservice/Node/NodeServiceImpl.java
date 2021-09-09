package com.stackroute.journeyservice.Node;

import com.stackroute.journeyservice.Domain.Domain;
import com.stackroute.journeyservice.Domain.DomainRepository;
import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeAlreadyExistsInSpecifiedCategory;
//import com.stackroute.journeyservice.Journey.Journey;
//import com.stackroute.journeyservice.Journey.JourneyRepository;
import com.stackroute.journeyservice.NodeCategory.NodeCategory;
import com.stackroute.journeyservice.NodeCategory.NodeCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NodeServiceImpl implements NodeService{

    private NodeRepository nodeRepository;
    private NodeCategoryService nodeCategoryService;
    private DomainRepository domainRepository;
    @Autowired
    public NodeServiceImpl(NodeRepository nodeRepository, NodeCategoryService nodeCategoryService, DomainRepository domainRepository)
    {
        this.nodeRepository = nodeRepository;
        this.nodeCategoryService = nodeCategoryService;
        this.domainRepository = domainRepository;
    }

    @Override
    public Node addNode(Node node, String username) throws NodeAlreadyExistsInSpecifiedCategory, DomainDontExists {

        Optional<Domain> domain = this.domainRepository.findById(node.getDomainId());
        if(domain.isEmpty())
        {
            throw new DomainDontExists("Domain doesn't Exists");
        }
        NodeCategory nodeCategory = this.nodeCategoryService.getNodeCategoryByNodeCategoryId(node.getNodeCategoryId());
        if(nodeCategory == null)
        {
            return null;
        }
        List<Node> nodesInCategoryWithSameName = getNodesByNodeCategoryId(node.getNodeCategoryId()).stream().filter(item -> item.getNodeName().equals(node.getNodeName())).collect(Collectors.toList());
        if(!nodesInCategoryWithSameName.isEmpty())
        {
            throw new NodeAlreadyExistsInSpecifiedCategory("Node Already Exists In Specified Category (or) Node Exists with given Id");
        }
        node.setNodeId(UUID.randomUUID());
        LocalDateTime currentTime = LocalDateTime.now();
        node.setCreatedOn(currentTime);
        node.setUpdatedOn(currentTime);
        node.setCreatedBy(username);
        node.setUpdatedBy(username);
        node.setNodeCategoryId(nodeCategory.getNodeCategoryId());

        Node savedNode = this.nodeRepository.insert(node);
  
        if(savedNode != null)
        {
            return savedNode;
        }
        return null;
    }
    @Override
    public Node updatePropertiesForNode(Node node, Object properties)
    {
        node.setProperties(properties);
        node.setUpdatedBy("Journey Forge System");
        node.setUpdatedOn(LocalDateTime.now());
        Node nodeSaved = this.nodeRepository.save(node);
        if(nodeSaved != null)
        {
            return nodeSaved;
        }
        return null;
    }

    @Override
    public Node updateNode(Node node,String username) throws DomainDontExists, NodeAlreadyExistsInSpecifiedCategory {
        Node existingNode = getNodeByNodeId(node.getNodeId());
        if(existingNode != null)
        {
            if(this.domainRepository.findById(node.getDomainId()).isEmpty())
            {
                throw new DomainDontExists("Domain doesn't exists");
            }

            existingNode.setDomainId(node.getDomainId());
            existingNode.setUpdatedOn(LocalDateTime.now());
            existingNode.setUpdatedBy(username);
            NodeCategory nodeCategory = this.nodeCategoryService.getNodeCategoryByNodeCategoryId(node.getNodeCategoryId());
            if(nodeCategory == null)
            {
                return null;
            }

            List<Node> nodesInCategoryWithSameName = getNodesByNodeCategoryId(node.getNodeCategoryId()).stream().filter(item -> item.getNodeName().equals(node.getNodeName())).collect(Collectors.toList());
            if(nodesInCategoryWithSameName.size() > 1)
            {
                throw new NodeAlreadyExistsInSpecifiedCategory("Node Already Exists In Specified Category (or) Node Exists with given Id");
            }

            existingNode.setNodeName(node.getNodeName());
            existingNode.setNodeCategoryId(nodeCategory.getNodeCategoryId());
            existingNode.setProperties(node.getProperties());

            Node updatedNode = this.nodeRepository.save(existingNode);
            
            if(updatedNode != null)
            {
                return updatedNode;
            }
        }
        return null;
    }



    @Override
    public Node getNodeByNodeId(String nodeId) {
        Optional<Node> node = this.nodeRepository.findById(nodeId);
        if(node.isPresent())
        {
            return node.get();
        }
        return null;
    }

    @Override
    public Node deleteNode(String nodeId) {
        Node node = getNodeByNodeId(nodeId);
        if(node != null)
        {
            this.nodeRepository.delete(node);
            return node;
        }
        return null;
    }

    @Override
    public List<Node> getNodesByNodeCategoryId(String nodeCategoryId) {

        List<Node> requiredNodes = this.nodeRepository.findAllByNodeCategoryId(nodeCategoryId);
        return requiredNodes;
    }

    @Override
    public List<Node> getAllNodesByNodeNameAndNodeCategoryIdAndDomainId(String nodeName, String nodeCategoryId, String domainId) {
        return this.nodeRepository.findAllNodesByNodeNameAndNodeCategoryIdAndDomainId(nodeName, nodeCategoryId, domainId);
    }

    @Override
    public List<Node> getAllNodesByNodeNameAndNodeCategoryIdAndDomainIdWithPage(String nodeName, String nodeCategoryId, String domainId, int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return this.nodeRepository.findAllNodesByNodeNameAndNodeCategoryIdAndDomainIdWithPage(nodeName, nodeCategoryId, domainId, pageable);
    }


//    @Override
//    public Node updatePropertiesForNode(Node node, Object properties)
//    {
//        node.setProperties(properties);
//        node.setUpdatedBy("Journey Forge System");
//        node.setUpdatedOn(LocalDateTime.now());
//        Node nodeSaved = this.nodeRepository.save(node);
//        if(nodeSaved != null)
//        {
//            return nodeSaved;
//        }
//        return null;
//    }

}

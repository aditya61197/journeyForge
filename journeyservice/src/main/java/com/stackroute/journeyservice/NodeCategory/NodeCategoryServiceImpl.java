package com.stackroute.journeyservice.NodeCategory;

import com.stackroute.journeyservice.Domain.Domain;
import com.stackroute.journeyservice.Domain.DomainRepository;
import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeCategoryAlreadyExists;
import com.stackroute.journeyservice.Node.Node;
import com.stackroute.journeyservice.Node.NodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NodeCategoryServiceImpl implements NodeCategoryService{

    private NodeCategoryRepository nodeCategoryRepository;
    private NodeRepository nodeRepository;
    private DomainRepository domainRepository;

    @Autowired
    public NodeCategoryServiceImpl(NodeCategoryRepository nodeCategoryRepository, NodeRepository nodeRepository, DomainRepository domainRepository)
    {
        this.nodeCategoryRepository = nodeCategoryRepository;
        this.nodeRepository = nodeRepository;
        this.domainRepository = domainRepository;
    }

    @Override
    public NodeCategory addNodeCategory(NodeCategory nodeCategory, String username) throws NodeCategoryAlreadyExists, DomainDontExists {
        Optional<Domain> domain = this.domainRepository.findById(nodeCategory.getDomainId());
        if(domain.isEmpty())
        {
            throw new DomainDontExists("Domain Doesn't exists");
        }

        List<NodeCategory> categories = this.nodeCategoryRepository.findByNodeCategoryNameExactMatchAndDomainId(nodeCategory.getNodeCategoryName(), nodeCategory.getDomainId());
        if(!categories.isEmpty())
        {
            throw new NodeCategoryAlreadyExists("Node Category Already Exists in selected Domain with specified Category Name");
        }

        nodeCategory.setCreatedOn(LocalDateTime.now());
        nodeCategory.setCreatedBy(username);
        nodeCategory.setNodeCategoryId(UUID.randomUUID());
        NodeCategory savedNoteCategory = this.nodeCategoryRepository.insert(nodeCategory);
        if(savedNoteCategory != null)
        {
            return savedNoteCategory;
        }
        return null;
    }

    @Override
    public NodeCategory deleteNodeCategory(String nodeCategoryId) {
        NodeCategory nodeCategory = getNodeCategoryByNodeCategoryId(nodeCategoryId);

        List<Node> requiredNodes = this.nodeRepository.findAllByNodeCategoryId(nodeCategoryId);

        if(nodeCategory != null && requiredNodes.isEmpty())
        {
            this.nodeCategoryRepository.delete(nodeCategory);
            return nodeCategory;
        }
        return null;
    }

    @Override
    public NodeCategory getNodeCategoryByNodeCategoryId(String nodeCategoryId) {
        Optional<NodeCategory> nodeCategory = this.nodeCategoryRepository.findById(nodeCategoryId);
        if(nodeCategory.isPresent())
        {
            return nodeCategory.get();
        }
        return null;
    }

    @Override
    public List<NodeCategory> getAllNodeCategories() {
        List<NodeCategory> nodeCategories = this.nodeCategoryRepository.findAll();
        return nodeCategories;
    }

    @Override
    public List<NodeCategory> getAllNodeCategoriesByNodeCategoryName(String nodeCategoryName) {

        List<NodeCategory> nodeCategories = this.nodeCategoryRepository.findAllByNodeCategoryName(nodeCategoryName);
        return nodeCategories;
    }


    @Override
    public List<NodeCategory> getAllNodeCategoriesByDomainId(String domainId) {
        List<NodeCategory> nodeCategories = this.nodeCategoryRepository.findAllByDomainId(domainId);
        return nodeCategories;
    }

    @Override
    public List<NodeCategory> getAllNodeCategoriesByDomainIdAndNodeCategoryName(String nodeCategoryName, String domainId) {
        List<NodeCategory> nodeCategories = this.nodeCategoryRepository.findAllByNodeCategoryNameAndDomainId(nodeCategoryName, domainId);
        return nodeCategories;
    }


}

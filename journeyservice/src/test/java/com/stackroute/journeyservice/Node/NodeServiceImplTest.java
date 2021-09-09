package com.stackroute.journeyservice.Node;


import com.stackroute.journeyservice.Domain.Domain;
import com.stackroute.journeyservice.Domain.DomainRepository;
import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeAlreadyExistsInSpecifiedCategory;
import com.stackroute.journeyservice.NodeCategory.NodeCategory;
import com.stackroute.journeyservice.NodeCategory.NodeCategoryService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.when;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
public class NodeServiceImplTest {

    @Mock
    private NodeRepository nodeRepository;

    @Mock
    private DomainRepository domainRepository;

    @Mock
    private NodeCategoryService nodeCategoryService;

    @InjectMocks
    private NodeServiceImpl nodeService;


    @MockBean
    Node savedNode;

    @MockBean
    Node newNode;

    @MockBean
    Domain domain;

    @MockBean
    NodeCategory nodeCategory;

    @Before
    public void init() {

        MockitoAnnotations.initMocks(this);

        domain = new Domain();
        domain.setDomainId("045eba1d-66d4-46c9-8f8f-f24c2ab4113f");
        domain.setDomainName("Engineering");
        domain.setDomainDescription("Engineering Domain");
        domain.setDomainCreatedBy("test@test.com");
        domain.setDomainUpdatedOn(LocalDateTime.now());
//        domain.setTags(new String[] {"engineer", "innovation"});


        nodeCategory = new NodeCategory();
        nodeCategory.setNodeCategoryId(UUID.fromString("b5a62a85-7e97-4035-b8e0-39606f2ad1d9"));
        nodeCategory.setNodeCategoryName("Learning Engineering");
        nodeCategory.setDomainId(UUID.fromString(domain.getDomainId()));
        nodeCategory.setFields(new String[] {"courses"});
        nodeCategory.setDescription("Category -> Learning Engineering");
        nodeCategory.setCreatedBy("test@test.com");
        nodeCategory.setCreatedOn(LocalDateTime.now());


        newNode = new Node();
        newNode.setNodeName("Mechanical");
        newNode.setNodeCategoryId("b5a62a85-7e97-4035-b8e0-39606f2ad1d9");
        newNode.setDomainId("045eba1d-66d4-46c9-8f8f-f24c2ab4113f");
        newNode.setCreatedBy("test@test.com");
        newNode.setUpdatedBy("test@test.com");


        savedNode = new Node();
        savedNode.setNodeId(UUID.fromString("ae12f0e6-d300-4baa-b340-4b10f33fa931"));
        savedNode.setNodeName("Mechanical");
        savedNode.setNodeCategoryId("b5a62a85-7e97-4035-b8e0-39606f2ad1d9");
        savedNode.setDomainId("045eba1d-66d4-46c9-8f8f-f24c2ab4113f");
        savedNode.setCreatedBy("test@test.com");
        savedNode.setUpdatedBy("test@test.com");
        savedNode.setCreatedOn(LocalDateTime.now());
        savedNode.setUpdatedOn(LocalDateTime.now());
    }

    @Test(expected = DomainDontExists.class)
    public void addNodeFailure() throws DomainDontExists, NodeAlreadyExistsInSpecifiedCategory {
        String username = "test@test.com";

        when(domainRepository.findById(newNode.getDomainId())).thenReturn(Optional.empty());
        Node node = nodeService.addNode(newNode, username);
        Assert.assertEquals(node, savedNode);
    }

    @Test
    public void addNodeSuccess() throws DomainDontExists, NodeAlreadyExistsInSpecifiedCategory {
        String username = "test@test.com";

        when(nodeRepository.insert(newNode)).thenReturn(savedNode);
        when(nodeRepository.findAllByNodeCategoryId(nodeCategory.getNodeCategoryId())).thenReturn(List.of());
        when(domainRepository.findById(newNode.getDomainId())).thenReturn(Optional.of(domain));
        when(nodeCategoryService.getNodeCategoryByNodeCategoryId(nodeCategory.getNodeCategoryId())).thenReturn(nodeCategory);
        Node node = nodeService.addNode(newNode, username);
        Assert.assertEquals(node, savedNode);
    }

    @Test
    public void getNodeByIdSuccess()
    {
        when(nodeRepository.findById(savedNode.getNodeId())).thenReturn(Optional.of(savedNode));
        Node node = nodeService.getNodeByNodeId(savedNode.getNodeId());
        Assert.assertEquals(savedNode.getNodeId(), node.getNodeId());
    }

    @Test
    public void deleteNodeSuccess()
    {
        when(nodeRepository.findById(savedNode.getNodeId())).thenReturn(Optional.of(savedNode));
        Node node = nodeService.deleteNode(savedNode.getNodeId());
        Assert.assertEquals(savedNode.getNodeId(), node.getNodeId());
    }

    @Test
    public void updateNodeSuccess() throws DomainDontExists, NodeAlreadyExistsInSpecifiedCategory {
        String username = "test@test.com";

        when(nodeRepository.save(savedNode)).thenReturn(savedNode);
        when(nodeRepository.findAllByNodeCategoryId(nodeCategory.getNodeCategoryId())).thenReturn(List.of());
        when(nodeRepository.findById(savedNode.getNodeId())).thenReturn(Optional.of(savedNode));
        when(domainRepository.findById(newNode.getDomainId())).thenReturn(Optional.of(domain));
        when(nodeCategoryService.getNodeCategoryByNodeCategoryId(nodeCategory.getNodeCategoryId())).thenReturn(nodeCategory);
        Node node = nodeService.updateNode(savedNode, username);
        Assert.assertEquals(node,savedNode);
    }


}

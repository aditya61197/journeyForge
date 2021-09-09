package com.stackroute.journeyservice.NodeCategory;

import com.stackroute.journeyservice.Domain.Domain;
import com.stackroute.journeyservice.Domain.DomainRepository;
import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeCategoryAlreadyExists;
import com.stackroute.journeyservice.Node.NodeRepository;
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
public class NodeCategoryServiceImplTest {
    @Mock
    private NodeCategoryRepository nodeCategoryRepository;

    @Mock
    private DomainRepository domainRepository;

    @Mock
    private NodeRepository nodeRepository;

    @InjectMocks
    private NodeCategoryServiceImpl nodeCategoryService;

    @MockBean
    NodeCategory savedNodeCategory;

    @MockBean
    NodeCategory newNodeCategory;

    @MockBean
    Domain domain;

    @Before
    public void init() {

        MockitoAnnotations.initMocks(this);

        domain = new Domain();
        domain.setDomainId("045eba1d-66d4-46c9-8f8f-f24c2ab4113f");
        domain.setDomainName("Engineering");
        domain.setDomainDescription("Engineering Domain");
        domain.setDomainCreatedBy("Aditya");
        domain.setDomainUpdatedOn(LocalDateTime.now());
//        domain.setTags(new String[] {"engineer", "innovation"});

        newNodeCategory = new NodeCategory();
        newNodeCategory.setNodeCategoryName("Learning Engineering");
        newNodeCategory.setDomainId(UUID.fromString(domain.getDomainId()));
        newNodeCategory.setFields(new String[] {"courses"});
        newNodeCategory.setDescription("Category -> Learning Engineering");
        newNodeCategory.setCreatedBy("Admin");

        savedNodeCategory = new NodeCategory();
        savedNodeCategory.setNodeCategoryId(UUID.fromString("b5a62a85-7e97-4035-b8e0-39606f2ad1d9"));
        savedNodeCategory.setNodeCategoryName("Learning Engineering");
        savedNodeCategory.setDomainId(UUID.fromString(domain.getDomainId()));
        savedNodeCategory.setFields(new String[] {"courses"});
        savedNodeCategory.setDescription("Category -> Learning Engineering");
        savedNodeCategory.setCreatedBy("Admin");
        savedNodeCategory.setCreatedOn(LocalDateTime.now());

    }


    @Test
    public void addNodeCategorySuccess() throws DomainDontExists, NodeCategoryAlreadyExists {
        String username = "test@test.com";

        when(domainRepository.findById(domain.getDomainId())).thenReturn(Optional.of(domain));
        when(nodeCategoryRepository.findByNodeCategoryNameExactMatchAndDomainId(newNodeCategory.getNodeCategoryName(), newNodeCategory.getDomainId())).thenReturn(List.of());
        when(nodeCategoryRepository.insert(newNodeCategory)).thenReturn(savedNodeCategory);
        NodeCategory nodeCategory = nodeCategoryService.addNodeCategory(newNodeCategory, username);
        Assert.assertEquals(nodeCategory, savedNodeCategory);

    }

    @Test(expected = DomainDontExists.class)
    public void addNodeCategoryFailure() throws DomainDontExists, NodeCategoryAlreadyExists {
        String username = "test@test.com";

        when(domainRepository.findById(newNodeCategory.getDomainId())).thenReturn(Optional.empty());
        NodeCategory nodeCategory = nodeCategoryService.addNodeCategory(newNodeCategory, username);
        Assert.assertEquals(nodeCategory, savedNodeCategory);
    }

    @Test
    public void getNodeCategoryByIdSuccess()
    {
        when(nodeCategoryRepository.findById(savedNodeCategory.getNodeCategoryId())).thenReturn(Optional.of(savedNodeCategory));
        NodeCategory nodeCategory = nodeCategoryService.getNodeCategoryByNodeCategoryId(savedNodeCategory.getNodeCategoryId());
        Assert.assertEquals(savedNodeCategory.getNodeCategoryId(), nodeCategory.getNodeCategoryId());
    }

    @Test
    public void deleteNodeCategorySuccess()
    {
        when(nodeCategoryRepository.findById(savedNodeCategory.getNodeCategoryId())).thenReturn(Optional.of(savedNodeCategory));
        NodeCategory nodeCategory = nodeCategoryService.deleteNodeCategory(savedNodeCategory.getNodeCategoryId());
        Assert.assertEquals(savedNodeCategory.getNodeCategoryId(), nodeCategory.getNodeCategoryId());
    }

    @Test
    public void updateNodeCategorySuccess() throws DomainDontExists, NodeCategoryAlreadyExists {
        String username = "test@test.com";

        when(domainRepository.findById(domain.getDomainId())).thenReturn(Optional.of(domain));
        when(nodeCategoryRepository.findByNodeCategoryNameExactMatchAndDomainId(newNodeCategory.getNodeCategoryName(), newNodeCategory.getDomainId())).thenReturn(List.of());
        when(nodeCategoryRepository.findById(savedNodeCategory.getNodeCategoryId())).thenReturn(Optional.of(savedNodeCategory));
        when(nodeCategoryRepository.insert(newNodeCategory)).thenReturn(savedNodeCategory);
        NodeCategory nodeCategory = nodeCategoryService.addNodeCategory(newNodeCategory, username);
        Assert.assertEquals(nodeCategory, savedNodeCategory);

    }
}

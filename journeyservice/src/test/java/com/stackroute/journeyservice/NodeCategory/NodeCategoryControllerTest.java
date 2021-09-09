package com.stackroute.journeyservice.NodeCategory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stackroute.journeyservice.Domain.Domain;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
public class NodeCategoryControllerTest {

//    @Autowired
    @Mock
    private MockMvc mockMvc;

    @Mock
    private NodeCategoryService nodeCategoryService;

    @InjectMocks
    private NodeCategoryController nodeCategoryController;

    @MockBean
    NodeCategory savedNodeCategory;

    @MockBean
    NodeCategory newNodeCategory;

    @MockBean
    Domain domain;


    @Before
    public void init() {

        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(nodeCategoryController).build();

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
    public void addNodeCategorySuccess() throws Exception {
        String username = "test@test.com";

        when(nodeCategoryService.addNodeCategory(newNodeCategory, username)).thenReturn(savedNodeCategory);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/nodecategories").contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(newNodeCategory)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }


    @Test
    public void deleteNodeCategorySuccess() throws Exception {
        when(nodeCategoryService.deleteNodeCategory(savedNodeCategory.getNodeCategoryId())).thenReturn(savedNodeCategory);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/nodecategories/" + savedNodeCategory.getNodeCategoryId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void getNodeCategoryByCategoryId() throws Exception {
        when(nodeCategoryService.getNodeCategoryByNodeCategoryId(savedNodeCategory.getNodeCategoryId())).thenReturn(savedNodeCategory);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/nodecategories/" + savedNodeCategory.getNodeCategoryId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isFound())
                .andDo(MockMvcResultHandlers.print());
    }



    private static String asJsonString(final Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

package com.stackroute.journeyservice.Node;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stackroute.journeyservice.Domain.Domain;
import com.stackroute.journeyservice.NodeCategory.NodeCategory;
import com.stackroute.journeyservice.utils.UserNameFromCookie;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.servlet.http.Cookie;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
public class NodeControllerTest {

    //    @Autowired
    @Mock
    private MockMvc mockMvc;

    @Mock
    private NodeService nodeService;

    @Mock
    private UserNameFromCookie userNameFromCookie;

    @InjectMocks
    private NodeController nodeController;



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
        mockMvc = MockMvcBuilders.standaloneSetup(nodeController).build();

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


        savedNode = new Node();
        savedNode.setNodeId(UUID.fromString("ae12f0e6-d300-4baa-b340-4b10f33fa931"));
        savedNode.setNodeName("Mechanical");
        savedNode.setNodeCategoryId("b5a62a85-7e97-4035-b8e0-39606f2ad1d9");
        savedNode.setDomainId("045eba1d-66d4-46c9-8f8f-f24c2ab4113f");
        savedNode.setCreatedOn(LocalDateTime.now());
        savedNode.setUpdatedOn(LocalDateTime.now());



    }


    @Test
    public void addNodeSuccess() throws Exception {
        when(userNameFromCookie.getUserNameFromCookie(any())).thenReturn("test@test.com");
        when(nodeService.addNode(newNode, "test@test.com")).thenReturn(savedNode);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/nodes")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void updateNoteSuccess() throws Exception {
        when(nodeService.updateNode(any(), "test@test.com")).thenReturn(savedNode);
        when(userNameFromCookie.getUserNameFromCookie(any())).thenReturn("test@test.com");
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/nodes")
                        .contentType(MediaType.APPLICATION_JSON)
                        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }


    @Test
    public void deleteNodeSuccess() throws Exception {
        when(nodeService.deleteNode(savedNode.getNodeId())).thenReturn(savedNode);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/nodes/" + savedNode.getNodeId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void getNodeByNodeId() throws Exception {
        when(nodeService.getNodeByNodeId(savedNode.getNodeId())).thenReturn(savedNode);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/nodes/" + savedNode.getNodeId())
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

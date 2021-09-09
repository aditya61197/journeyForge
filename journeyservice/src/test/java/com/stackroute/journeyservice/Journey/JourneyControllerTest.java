package com.stackroute.journeyservice.Journey;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.time.LocalDateTime;
import java.util.ArrayList;
import static org.mockito.Mockito.when;
import java.util.List;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
public class JourneyControllerTest {

    @Mock
    private MockMvc mockMvc;

    private List<Journey> journeyList = null;
    @Mock
    private JourneyService journeyService;
    @InjectMocks
    private JourneyController journeyController;
    List<Journey> journey1;
    List<Journey> journey2;
    Journey journeyNode1;
    Journey journeyNode2;
    @Before
    public void init(){
       MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(journeyController).build();
       journeyList = new ArrayList<>();

        journey1 =  new ArrayList<>();
        journey2 =  new ArrayList<>();
        journey1.add(new Journey("600","JS","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey2,"Learning","pending"));

        journey1.add(new Journey("601","TS","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),null,"Learning","pending"));

        journey1.add(new Journey("603","bootstrap","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),null,"Learning","pending"));

        journey2.add(new Journey("604","nodeJS","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),null,"Learning","pending"));

        journeyNode1=new Journey("602","css","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey1,"Learning","pending");


      journeyList.add(journeyNode1);
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


    @Test
    public void createJourneyTest() throws Exception {
        String message = "Node Relations added";
        when(journeyService.createRelations(journeyNode1)).thenReturn(message);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/tree/nodes/relate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(journeyNode1)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void getAllJourneysTest() throws Exception {
        when(journeyService.getAllTrees(journeyNode1.getDomainId(),"pending")).thenReturn(journeyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tree/"+journeyNode1.getDomainId()+"/journey")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getSubTreeOfJourney() throws Exception {
        when(journeyService.getSubTreeOfJourney(journeyNode1.getNodeId(),journey1.get(0).getNodeId(),"pending")).thenReturn(journeyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tree/nodes/"+journeyNode1.getNodeId()+"/path/target/"+journey1.get(0).getNodeId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getSubTreeOfJourneyFailure() throws Exception {
        when(journeyService.getSubTreeOfJourney(journeyNode1.getNodeId(),journey1.get(0).getNodeId(),"active")).thenReturn(journeyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tree/nodes/"+journeyNode1.getNodeId()+"/path/target/"+journey1.get(0).getNodeId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
    @Test
    public void getNodesOfJourney() throws Exception {
        when(journeyService.getTreesByPropertyName("","111","999","","pending")).thenReturn(journeyList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tree/sub/journey/")
                .param("nodeCategoryId","111")
                .param("domainId","999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
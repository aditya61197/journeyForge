package com.stackroute.journeyservice.Journey;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)

class JourneyServiceTest {

   @Mock
    private  JourneyRepository journeyRepository;

   @InjectMocks
    private JourneyServiceImpl journeyService;

    List<Journey> journey1;
    List<Journey> journey2;
    Journey journeyNode1;
    Journey journeyNode2;
     Collection<Journey> journeyList;

    @BeforeEach
    public void init() {
        journey1 =  new ArrayList<>();
        journey2 =  new ArrayList<>();
          journey1.add(new Journey("600","JS","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey2,"Learning","pending"));

          journey1.add(new Journey("601","TS","111","999",null,
                  "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey2,"Learning","pending"));

        journey1.add(new Journey("603","bootstrap","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),null,"Learning","pending"));

        journey2.add(new Journey("604","nodeJS","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),null,"Learning","pending"));

        journeyNode1=new Journey("602","css","111","999",null,
                "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey1,"Learning","pending");

         journeyNode2=new Journey("601","TS","111","999",null,
                 "Admin",LocalDateTime.now(),"Expert", LocalDateTime.now(),journey2,"Learning","pending");
    }

    @Test
    public void createNodes() {
      String value=journeyService.createRelations(journeyNode1);
      assertEquals("Journey Node added",value);
    }

    @Test
    public void getAllJourneysByDomainIdTest() {
        List<Journey> list = new ArrayList<Journey>();
        list.add(journeyNode1);
        when(journeyRepository.getAllJourneysByDomainId(journeyNode1.getDomainId(),"pending")).thenReturn(list);
        Collection<Journey> journeyList = journeyService.getAllTrees(journeyNode1.getDomainId(),"pending");
        assertEquals(1, journeyList.size());
    }

    @Test
    public void getSubTreeOfJourneyTest(){
        List<Journey> list = new ArrayList<Journey>();
        list.add(journeyNode1);
        list.add(journeyNode2);
        when(journeyRepository.getSubTreeOfJourney(journeyNode1.getNodeId(),journeyNode2.getNodeId(),"pending")).thenReturn(list);
        List<Journey>journeyList = journeyService.getSubTreeOfJourney(journeyNode1.getNodeId(),journeyNode2.getNodeId(),"pending");
        assertEquals(list,journeyList);
        assertEquals(2,journeyList.size());
    }

    @Test
    public void getAllNodesByProperties(){
        List<Journey> list = new ArrayList<Journey>();
        list.add(journeyNode1);
        when(journeyRepository.getTreesByPropertyName("","111","999","","pending")).thenReturn(list);
        List<Journey>journeyList =journeyService.getTreesByPropertyName("","111","999","","pending");
        assertEquals(list,journeyList);
    }
}

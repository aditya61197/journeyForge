package com.stackroute.journeyservice.Journey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JourneyServiceImpl implements JourneyService{
    @Autowired
   private JourneyRepository journeyRepository;
    JourneyServiceImpl(){
    }

    @Override
    public String createRelations(Journey journey) {
        journeyRepository.save(journey);
        return "Journey Node added";
    }
    @Override
    public List<Journey> getAllTrees(String domainId,String status) {
        List<Journey> journey1=  journeyRepository.getAllJourneysByDomainId(domainId,status);
        return journey1;
    }

    @Override
    public List<Journey> getTreesByPropertyName(String nodeId, String nodeCategoryId, String domainId,String nodeCategoryLabel,String status) {
        List<Journey> journey1=journeyRepository.getTreesByPropertyName(nodeId, nodeCategoryId, domainId,nodeCategoryLabel,status);
        return journey1;
    }

    @Override
    public List<Journey> getSubTreeOfJourney(String startNode_id, String ToNode_id,String status) {
        List<Journey> journey= journeyRepository.getSubTreeOfJourney(startNode_id,ToNode_id,status);
        return journey;
    }

//    @Override
//    public String deleteRelation(String sourceNodeId, String endNodeId) {
//        journeyRepository.deleteRelation()
//    }
}

package com.stackroute.journeyservice.Journey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class JourneyController {
    JourneyController(){
    }
    @Autowired
    private JourneyService journeyService;

    @PostMapping("/tree/nodes/relate")
    public ResponseEntity<?> createJourney(@RequestBody Journey journey) {
        journeyService.createRelations(journey);
        return new ResponseEntity<Journey>(journey,HttpStatus.OK);
    }

    @GetMapping("/tree/{domainId}/journey")
    public ResponseEntity<?> getAllJourneys(@PathVariable String domainId,
                                              @RequestParam(name = "status", required = false,defaultValue = "pending") String status) {
        List<Journey> journey1=  journeyService.getAllTrees(domainId,status);
        if(journey1.isEmpty())
        {
            return new ResponseEntity<>("Relation Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Journey>>(journey1,HttpStatus.OK);
    }

    @GetMapping("/tree/sub/journey")
    public ResponseEntity<?> getAllNodes(@RequestParam(name = "nodeId", required = false,defaultValue = "") String nodeId,
                                         @RequestParam(name = "nodeCategoryId", required = false,defaultValue = "") String nodeCategoryId,
                                         @RequestParam(name = "domainId", required = false,defaultValue = "") String domainId,
                                         @RequestParam(name = "nodeCategoryLabel", required = false,defaultValue = "") String nodeCategoryLabel,
                                         @RequestParam(name = "status", required = false,defaultValue = "pending") String status) {
        List<Journey> journey=journeyService.getTreesByPropertyName(nodeId,nodeCategoryId,domainId,nodeCategoryLabel,status);
        if(journey.isEmpty())
        {
            return new ResponseEntity<>("Relation Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Journey>>(journey,HttpStatus.OK);
   }

   @GetMapping("/tree/nodes/{startNode_id}/path/target/{ToNode_id}")
    public ResponseEntity<?> getSubTreeOfJourney(@PathVariable String startNode_id, @PathVariable String ToNode_id,
                                                   @RequestParam(name = "status", required = false,defaultValue = "pending") String status){
       List<Journey> journey1=journeyService.getSubTreeOfJourney(startNode_id,ToNode_id,status);
       if(journey1.isEmpty())
       {
           return new ResponseEntity<>("Relation Not Found", HttpStatus.NOT_FOUND);
       }
       return new ResponseEntity<List<Journey>>(journey1,HttpStatus.OK);
    }
}

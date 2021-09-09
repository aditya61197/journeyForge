package com.stackroute.journeyservice.Node;

import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeAlreadyExistsInSpecifiedCategory;
import com.stackroute.journeyservice.utils.UserNameFromCookie;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
//import java.util.HashMap;
import java.util.List;
//import java.util.Map;

@RestController
@RequestMapping("api/v1")
public class NodeController {

    private NodeService nodeService;
    private RabbitTemplate rabbitTemplate;

    @Autowired
    public NodeController(NodeService nodeService,RabbitTemplate rabbitTemplate) {

        this.nodeService = nodeService;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Autowired
    private UserNameFromCookie userNameFromCookie;

    @PostMapping("/nodes")
    public ResponseEntity<?> addNode(@RequestBody Node node, HttpServletRequest httpServletRequest) {
        try {

            String username = userNameFromCookie.getUserNameFromCookie(httpServletRequest);

            Node savedNode = this.nodeService.addNode(node, username);
//            Map<String,Object> map= new HashMap<String, Object>();
           Object[] updateProperty={node.getNodeName(),node.getNodeId(),node.getProperties()};
//            map.put("nodeName", node.getNodeName());
//            map.put("nodeId",node.getNodeId());
//            map.put("properties",node.getProperties());
            rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE, RabbitMqConfig.ROUTING_KEY, updateProperty);
            if (savedNode == null) {
                return new ResponseEntity<>("Unable to create Node (or) Node Category Not Found", HttpStatus.CONFLICT);
            }
            return new ResponseEntity<Node>(savedNode, HttpStatus.CREATED);

        } catch (NodeAlreadyExistsInSpecifiedCategory naeisc) {
            return new ResponseEntity<>(naeisc.getMessage(), HttpStatus.CONFLICT);
        } catch (DomainDontExists dde) {
            return new ResponseEntity<>(dde.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/nodes")
    public ResponseEntity<?> updateNode(@RequestBody Node node, HttpServletRequest httpServletRequest) {
        try {
            String username = userNameFromCookie.getUserNameFromCookie(httpServletRequest);
            Node updatedNode = this.nodeService.updateNode(node, username);
            if (updatedNode == null) {
                return new ResponseEntity<>("Node with given Id doesn't exists (or) Unable to find Node Category with given Category Name", HttpStatus.CONFLICT);
            }
            return new ResponseEntity<Node>(updatedNode, HttpStatus.OK);
        } catch (DomainDontExists dde) {
            return new ResponseEntity<>(dde.getMessage(), HttpStatus.NOT_FOUND);
        } catch (NodeAlreadyExistsInSpecifiedCategory naesc) {
            return new ResponseEntity<>(naesc.getMessage(), HttpStatus.CONFLICT);
        }


    }

//    @PutMapping("/nodes/{nodeId}/properties")
//    public ResponseEntity<?> updatePropertiesOfNode(@RequestBody Object properties, HttpServletRequest httpServletRequest, @PathVariable("nodeId") String nodeId)
//    {
//        Node node = this.nodeService.getNodeByNodeId(nodeId);
//        if(node != null)
//        {
//            Node propsUpdatedNode = this.nodeService.updatePropertiesForNode(node, properties);
//            if(propsUpdatedNode != null)
//            {
//                return new ResponseEntity<>(propsUpdatedNode, HttpStatus.OK);
//            }
//            else
//            {
//                return new ResponseEntity<>("Unable to update the properties of Node with given Node ID", HttpStatus.CONFLICT);
//            }
//        }
//        return new ResponseEntity<>("Node not found with given Node ID", HttpStatus.CONFLICT);
//    }

    @GetMapping("/nodes/{nodeId}")
    public ResponseEntity<?> getNodeByNodeId(@PathVariable("nodeId") String nodeId) {
        Node node = this.nodeService.getNodeByNodeId(nodeId);
        if (node == null) {
            return new ResponseEntity<>("Node not found with given Id", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Node>(node, HttpStatus.OK);
    }

    @DeleteMapping("/nodes/{nodeId}")
    public ResponseEntity<?> deleteNode(@PathVariable("nodeId") String nodeId) {
        Node node = this.nodeService.deleteNode(nodeId);
        if (node == null) {
            return new ResponseEntity<>("Node Not Found", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Node>(node, HttpStatus.OK);
    }

    @GetMapping("/nodes")
    public ResponseEntity<?> getAllNodes(@RequestParam(name = "nodename", required = false, defaultValue = "") String nodeName,
                                         @RequestParam(name = "nodecategoryid", required = false, defaultValue = "") String nodeCategoryId,
                                         @RequestParam(name = "domainid", required = false, defaultValue = "") String domainId,
                                         @RequestParam(name = "page", required = false, defaultValue = "") String page,
                                         @RequestParam(name = "limit", required = false, defaultValue = "") String limit) {
        List<Node> nodes = new ArrayList<>();
        if(page.equals(""))
        {
            nodes = this.nodeService.getAllNodesByNodeNameAndNodeCategoryIdAndDomainId(nodeName, nodeCategoryId, domainId);
        }
        else
        {
            int pageno = Integer.parseInt(page);
            int noOfItemsToBeDisplayed = Integer.parseInt(limit);
            nodes = this.nodeService.getAllNodesByNodeNameAndNodeCategoryIdAndDomainIdWithPage(nodeName, nodeCategoryId, domainId, pageno, noOfItemsToBeDisplayed);
        }
        
        return new ResponseEntity<List<Node>>(nodes, HttpStatus.OK);
    }
    @PutMapping("/nodes/{nodeId}/properties")
    public ResponseEntity<?> updatePropertiesOfNode(@RequestBody Object properties, HttpServletRequest httpServletRequest, @PathVariable("nodeId") String nodeId)
    {
        Node node = this.nodeService.getNodeByNodeId(nodeId);
        if(node != null)
        {
            Node propsUpdatedNode = this.nodeService.updatePropertiesForNode(node, properties);
            if(propsUpdatedNode != null)
            {
                return new ResponseEntity<>(propsUpdatedNode, HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<>("Unable to update the properties of Node with given Node ID", HttpStatus.CONFLICT);
            }
        }
        return new ResponseEntity<>("Node not found with given Node ID", HttpStatus.CONFLICT);
    }


}

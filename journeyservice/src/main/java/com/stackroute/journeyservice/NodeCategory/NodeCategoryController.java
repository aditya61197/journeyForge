package com.stackroute.journeyservice.NodeCategory;

import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeCategoryAlreadyExists;
import com.stackroute.journeyservice.utils.UserNameFromCookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class NodeCategoryController {

    private NodeCategoryService nodeCategoryService;


    @Autowired
    public NodeCategoryController(NodeCategoryService nodeCategoryService)
    {
        this.nodeCategoryService = nodeCategoryService;
    }

    @Autowired
    private UserNameFromCookie userNameFromCookie;

    @PostMapping("/nodecategories")
    public ResponseEntity<?> addNodeCategory(@RequestBody NodeCategory nodeCategory, HttpServletRequest httpServletRequest)
    {
        try
        {

            String username = userNameFromCookie.getUserNameFromCookie(httpServletRequest);
            NodeCategory savedNodeCategory = this.nodeCategoryService.addNodeCategory(nodeCategory, username);
            if(savedNodeCategory == null)
            {
                return new ResponseEntity<>("Unable to create Node Category", HttpStatus.CONFLICT);
            }
            return new ResponseEntity<NodeCategory>(savedNodeCategory, HttpStatus.CREATED);
        }
        catch(DomainDontExists ddo)
        {
            return new ResponseEntity<>(ddo.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(NodeCategoryAlreadyExists ncae)
        {
            return new ResponseEntity<>(ncae.getMessage(), HttpStatus.CONFLICT);
        }


    }

    @DeleteMapping("/nodecategories/{nodeCategoryId}")
    public ResponseEntity<?> deleteNodeCategory(@PathVariable("nodeCategoryId") String nodeCategoryId)
    {
        NodeCategory deletedNodeCategory = this.nodeCategoryService.deleteNodeCategory(nodeCategoryId);
        if(deletedNodeCategory == null)
        {
            return new ResponseEntity<>("Unable to delete Node Category Since some nodes belong to the selected node category", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<NodeCategory>(deletedNodeCategory, HttpStatus.OK);
    }

    @GetMapping("/nodecategories/{nodeCategoryId}")
    public ResponseEntity<?> getNodeCategoryByNodeCategoryId(@PathVariable("nodeCategoryId") String nodeCategoryId)
    {
        NodeCategory nodeCategory = this.nodeCategoryService.getNodeCategoryByNodeCategoryId(nodeCategoryId);
        if(nodeCategory == null)
        {
            return new ResponseEntity<>("Node Category Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<NodeCategory>(nodeCategory, HttpStatus.OK);
    }

    @GetMapping("/nodecategories")
    public ResponseEntity<?> getAllNodeCategories(@RequestParam(name = "nodecategoryname", required = false, defaultValue = "") String nodeCategoryName,
                                                  @RequestParam(name = "domainid", required = false, defaultValue = "") String domainId)
    {

        List<NodeCategory> nodeCategories = new ArrayList<>();
        nodeCategories = this.nodeCategoryService.getAllNodeCategoriesByDomainIdAndNodeCategoryName(nodeCategoryName, domainId);
        return new ResponseEntity<List<NodeCategory>>(nodeCategories, HttpStatus.OK);
    }

}

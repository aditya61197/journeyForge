package com.stackroute.journeyservice.NodeCategory;

import com.stackroute.journeyservice.Exceptions.DomainDontExists;
import com.stackroute.journeyservice.Exceptions.NodeCategoryAlreadyExists;

import java.util.List;

public interface NodeCategoryService {

    NodeCategory addNodeCategory(NodeCategory nodeCategory, String username) throws NodeCategoryAlreadyExists, DomainDontExists;

    NodeCategory deleteNodeCategory(String nodeCategoryId);

    NodeCategory getNodeCategoryByNodeCategoryId(String nodeCategoryId);

    List<NodeCategory> getAllNodeCategories();

    List<NodeCategory> getAllNodeCategoriesByNodeCategoryName(String nodeCategoryName);

    List<NodeCategory> getAllNodeCategoriesByDomainId(String domainId);

    List<NodeCategory> getAllNodeCategoriesByDomainIdAndNodeCategoryName(String nodeCategoryName,String domainId);


}

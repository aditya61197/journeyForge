package com.stackroute.journeyservice.Node;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NodeRepository extends MongoRepository<Node, String> {

    @Query("{ 'nodeCategoryId' : { $regex : ?0 } }")
    List<Node> findAllByNodeCategoryId(String nodeCategoryId);

    @Query("{ 'nodeName' : ?0 }")
    List<Node> findAllByNodeName(String nodeName);

    @Query("{ 'nodeName' : { $regex : ?0 }, 'nodeCategoryId' : { $regex : ?1 }, 'domainId' : ?2 }")
    List<Node> findAllNodesByNodeNameAndNodeCategoryIdAndDomainId(String nodeName, String nodeCategoryId, String domainId);
        
    @Query("{ 'nodeName' : { $regex : ?0 }, 'nodeCategoryId' : { $regex : ?1 }, 'domainId' : ?2 }")
    List<Node> findAllNodesByNodeNameAndNodeCategoryIdAndDomainIdWithPage(String nodeName, String nodeCategoryId, String domainId, Pageable pageable);
} 

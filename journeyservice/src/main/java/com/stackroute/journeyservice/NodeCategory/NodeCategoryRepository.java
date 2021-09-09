package com.stackroute.journeyservice.NodeCategory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NodeCategoryRepository extends MongoRepository<NodeCategory, String> {

    @Query("{'nodeCategoryName' : { $regex : ?0 } }")
    List<NodeCategory> findAllByNodeCategoryName(String nodeCategoryName);

    @Query("{'domainId' : { $regex : ?0 } }")
    List<NodeCategory> findAllByDomainId(String domainId);

    @Query("{'nodeCategoryName' : { $regex : ?0 }, 'domainId' : ?1 }")
    List<NodeCategory> findAllByNodeCategoryNameAndDomainId(String nodeCategoryName, String domainId);

    @Query("{'nodeCategoryName' : ?0, 'domainId' : ?1 }")
    List<NodeCategory> findByNodeCategoryNameExactMatchAndDomainId(String nodeCategoryName, String domainId);

}

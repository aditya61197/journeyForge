package com.stackroute.journeyservice.Journey;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JourneyRepository extends Neo4jRepository<Journey, String> {

    Journey save(Journey journey);

    @Query("MATCH p=(m:Journey)-[:Next*]->(:Journey)\n" +
            "WHERE (m.status=$status AND m.domainId=$domainId)"+
            "\tRETURN m, collect(nodes(p)),collect(relationships(p));")
    List<Journey> getAllJourneysByDomainId(@Param("domainId") String domainId,@Param("status") String status);

    @Query("MATCH p=(m:Journey)-[:Next*]->(n:Journey) " +
            "\tWHERE (m.nodeId=$nodeId AND m.domainId=$domainId AND m.status=$status) OR (m.domainId=$domainId AND m.nodeCategoryId=$nodeCategoryId AND m.status=$status)\n " +
            "\tOR (m.nodeId=$nodeId AND m.nodeCategoryId=$nodeCategoryId AND m.status=$status)" +
            "\t OR (m.nodeCategoryLabel=$nodeCategoryLabel AND m.domainId=$domainId)"+
            "\tRETURN m,collect(nodes(p)),collect(relationships(p));")
        //"\t OR (m.nodeName=$nodeName OR  m.domainId=$domainId OR n.nodeCategoryId=$nodeCategoryId )" +
    List<Journey> getTreesByPropertyName(@Param("nodeId") String nodeId,@Param("nodeCategoryId") String nodeCategoryId,@Param("domainId") String domainId,@Param("nodeCategoryLabel") String nodeCategoryLabel,@Param("status") String status);

    @Query("MATCH p=(m:Journey)-[:Next*]->(n:Journey)"+
           "\tWHERE (m.nodeId=$nodeId AND n.nodeId=$nodeId2 AND m.status=$status)"+
           "\tRETURN m,collect(nodes(p)),collect(relationships(p));")
    List<Journey> getSubTreeOfJourney(@Param("nodeId") String nodeId1,@Param("nodeId2") String nodeId2,@Param("status") String status);

//    @Query(value="MATCH (n:Journey{nodeId:($id1)})-[r:Next]->(p:Journey{nodeId:($id2)})  DELETE r")
//    Journey deleteRelation(@Param("id1") int id1,@Param("id2") int id2);

}

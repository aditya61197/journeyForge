package journeyForge.DataProfiling;


import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.google.gson.JsonSyntaxException;

import org.json.simple.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;



@Component
public class NodeListner {
    Node node1 = new Node();

    @Value(value = "${Url}")
    String jsonUrl;

    @Autowired
    private NodeClientService nodeClientService;

    Logger logger = LoggerFactory.getLogger(NodeListner.class);

    @RabbitListener(queues = RabbitMqConfig.QUEUE)
    public void listner(Object[] nodeToUpdate)  {
        try {
            //extracting message information from rabbitmq message
            String name = (String) nodeToUpdate[0];
            String nodeId = (String) nodeToUpdate[1];
            Object propertiesTemp = nodeToUpdate[2];
            logger.info("Response nodeName-------> "+name);
            logger.info("Response nodeId--------> "+nodeId);
            System.out.println("Response Node Properties-----> "+propertiesTemp);
            logger.info("Response Node Properties-----> "+propertiesTemp.toString());

            node1.setNodeName(name);
            node1.setNodeId(nodeId);
            node1.setProperties(propertiesTemp);
            //Converted Object to json
            String jsonDataProperties = new Gson().toJson(propertiesTemp);
            logger.info("Converted object to json string format -------> "+jsonDataProperties);
            HashMap<String, Object> map = new Gson().fromJson(jsonDataProperties, new TypeToken<HashMap<String, Object>>() {
            }.getType());
            logger.info("Converted json string format to map--------> "+map);
            JSONObject updateProperties = new JSONObject(map);
            logger.info("converted map to jsonObject----->"+updateProperties.toString());
            handler(updateProperties);
        }catch (Exception e){
            e.printStackTrace();

        }
    }


    public void handler(JSONObject updateProperties) {
        try {
            String url = jsonUrl+"/data"+"?nodeName="+node1.getNodeName().replaceAll(" ", "%20");
            HttpRequest request = HttpRequest.newBuilder().GET().uri(URI.create(url)).build();
            HttpClient reqClient = HttpClient.newBuilder().build();
            //making a request to json server
            HttpResponse<String> response = reqClient.send(request, HttpResponse.BodyHandlers.ofString());
            String responseCheck= response.body().replace("[", "").replace("]", "");
            if (!responseCheck.isEmpty()) {
               System.out.println(response.statusCode());
               logger.info("Response from json server(standard data)------> "+response.body().replace("[", "").replace("]", ""));
                String standaradNode = response.body().replace("[", "").replace("]", "");
                HashMap<String, Object> map1 = new Gson().fromJson(standaradNode, new TypeToken<HashMap<String, Object>>() {
                }.getType());
                JSONObject standard = new JSONObject(map1);
               logger.info("Standard data-------> " + standard);
               //making a call to update function
                propertiesUpdater(updateProperties, standard);
            }else{
               logger.info("OOPS Sorry !!!---->No node is present with name "+node1.getNodeName());
            }
        }catch (IOException e){
            e.printStackTrace();
        }catch (InterruptedException g){
            g.printStackTrace();
        }catch(JsonSyntaxException f){
           logger.info("OOPS Sorry !!!---->Exception occurred for details refer below ");
           logger.info("Exception is----->"+f.getMessage());
            f.printStackTrace();
        }
          }

    private void propertiesUpdater(JSONObject updateProperties, JSONObject standardProperties){
        try{

           System.out.println(standardProperties.get("skillsRequested"));
            String userSkills = updateProperties.get("skillsRequested").toString().replace("[","").replace("]","");
            String standardSkills = standardProperties.get("skillsRequested").toString();
            String[] array = null;
            if(!userSkills.isEmpty()){
                String[] userSkillsArray= userSkills.split(",");
                String[] standardSkillArray = standardSkills.split(",");
                int userLength = userSkillsArray.length;
                int standardLength = standardSkillArray.length;
                array = new String[userLength+standardLength];
                System.arraycopy(userSkillsArray,0,array,0,userLength);
                System.arraycopy(standardSkillArray,0,array,userLength,standardLength);
            }else{
                String[] standardSkillsArray = standardSkills.split(",");
                array = standardSkillsArray;
            }
           System.out.println ("skills to be updated "+array);
            for(int i=0;i<=array.length-1;i++){
               logger.info("Analyzing completed, skill that is going to be updated--> "+array[i]);
            }
            Properties properties = new Properties();
            if(updateProperties.get("averageSalary").toString().isEmpty()){
                properties.setAverageSalary(standardProperties.get("averageSalary"));
            }else{
                properties.setAverageSalary(updateProperties.get("averageSalary"));
            }
            if(updateProperties.get("totalJobOpenings").toString().isEmpty()){
                properties.setTotalJobOpenings(standardProperties.get("totalJobOpenings"));
            }else{
                properties.setTotalJobOpenings(updateProperties.get("totalJobOpenings"));
            }
            properties.setSkillsRequested(array);
            properties.setCommonJobTitles(updateProperties.get("commonJobTitles"));
            properties.setRequestedEducation(updateProperties.get("requestedEducation"));
                logger.info("Final AverageSalary is to be updated -------> "+properties.getAverageSalary().toString());
                logger.info("Final TotalJobOpenings is to be updated -------> "+properties.getTotalJobOpenings().toString());
                logger.info("Final SkillsRequested() is to be updated -------> "+properties.getSkillsRequested().toString());
                logger.info("Final CommonJobTitles is to be updated -------> "+properties.getCommonJobTitles().toString());
                logger.info("Final RequestedEducation is to be updated -------> "+properties.getRequestedEducation().toString());

            requestMaker(properties);

        }catch (Exception e){
            e.printStackTrace();
        }


    }

    public void requestMaker(Properties properties) {
        try{
               logger.info("Making a update request with nodeID "+node1.getNodeId()+" with nodeName as "+node1.getNodeName());
               String nodeIdRQ = node1.getNodeId();
               logger.info("nodeId ------> "+nodeIdRQ);
               logger.info("Status of put request--> "+nodeClientService.updatePropertiesOfNode(nodeIdRQ,properties).toString());
        }catch (Exception e){
            e.printStackTrace();
        }


    }
    }




package journeyForge.DataProfiling;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Headers("Content-Type: Application/json")
@FeignClient(name = "journeyservice")
public interface NodeClientService {

    @PutMapping(value = "/api/v1/nodes/{nodeId}/properties")
    ResponseEntity<?> updatePropertiesOfNode(@PathVariable("nodeId") String nodeId, @RequestBody Object properties);
}

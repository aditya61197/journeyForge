package journeyForge.DataProfiling;

public class Node  {
    private String nodeId;
    private String nodeName;
    private Object properties;

    public Node() {
    }

    public Node(String nodeId, String nodeName, Object properties) {
        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.properties = properties;
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public Object getProperties() {
        return properties;
    }

    public void setProperties(Object properties) {
        this.properties = properties;
    }
}

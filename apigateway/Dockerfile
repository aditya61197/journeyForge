FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/apigateway.jar /usr/src/apigateway.jar
ENTRYPOINT ["java", "-jar", "/usr/src/apigateway.jar"]

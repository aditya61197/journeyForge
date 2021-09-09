FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/servicediscovery.jar /usr/src/servicediscovery.jar
ENTRYPOINT ["java", "-jar", "/usr/src/servicediscovery.jar"]
FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/dataprofiling.jar /usr/src/dataprofiling.jar
ENTRYPOINT ["java", "-jar", "/usr/src/dataprofiling.jar"]
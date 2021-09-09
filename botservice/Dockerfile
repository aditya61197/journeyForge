FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/botservice.jar /usr/src/botservice.jar
ENTRYPOINT ["java", "-jar", "botservice.jar"]
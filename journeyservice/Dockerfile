FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/journeyservice.jar /usr/src/journeyservice.jar
ENTRYPOINT ["java", "-jar", "/usr/src/journeyservice.jar"]
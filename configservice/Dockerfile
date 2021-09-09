FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/configurationserver.jar /usr/src/configurationserver.jar
ENTRYPOINT ["java", "-jar", "configurationserver.jar"]

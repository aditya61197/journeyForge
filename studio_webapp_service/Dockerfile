FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/studiowebapp.jar /usr/src/studiowebapp.jar
ENTRYPOINT ["java", "-jar", "/usr/src/studiowebapp.jar"]

FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/userservice.jar /usr/src/userservice.jar
ENTRYPOINT ["java", "-jar", "/usr/src/userservice.jar"]


FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/clientwebapp.jar /usr/src/clientwebapp.jar
ENTRYPOINT ["java", "-jar", "/usr/src/clientwebapp.jar"]
FROM openjdk:11-jre-slim
WORKDIR /usr/src
ADD ./target/recommendationservice.jar /usr/src/recommendationservice.jar
ENTRYPOINT ["java", "-jar", "/usr/src/recommendationservice.jar"]
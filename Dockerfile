FROM adoptopenjdk/openjdk8-openj9:alpine-slim
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=backend/target/FindComputer-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java -Xmx300m -Xss512k -jar app.jar"]

FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=backend/target/bagas-findcomputer-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java -Dserver.port=$PORT -Xmx300m -Xss512k -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
CMD ["java", "-Dserver.port=$PORT", "-Xmx300m", "-Xss512k", "-jar", "app.jar"]

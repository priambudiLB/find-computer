# FROM adoptopenjdk/openjdk8-openj9:alpine-slim
# RUN addgroup -S spring && adduser -S spring -G spring
# USER spring:spring
# # EXPOSE 8080
# ARG JAR_FILE=backend/target/bagas-findcomputer-0.0.1-SNAPSHOT.jar
# COPY ${JAR_FILE} app.jar
# # ENTRYPOINT ["java -Dserver.port=$PORT -Xmx300m -Xss512k -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
# CMD ["java", "-Dserver.port=$PORT", "-Xmx300m", "-Xss512k", "-Xshareclasses", "-Xquickstart", "-jar", "app.jar"]

FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY backend/target/bagas-findcomputer-0.0.1-SNAPSHOT.jar bagas-findcomputer-0.0.1-SNAPSHOT.jar
CMD [“java”,”-Djava.security.egd=file:/dev/./urandom”,”-jar”,”/bagas-findcomputer-0.0.1-SNAPSHOT.jar”]
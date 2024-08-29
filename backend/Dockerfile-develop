

FROM openjdk:17 AS builder

# 패키지를 설치해야, bootJAR 를 실행할 수 있다
RUN microdnf install findutils

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew bootJAR


FROM openjdk:17
# 위 builder에서 만든 .jar파일을 컨테이너 내부로 복사
COPY --from=builder build/libs/*.jar app.jar

# Add Pinpoint
#ADD https://github.com/pinpoint-apm/pinpoint/releases/download/v2.5.3/pinpoint-agent-2.5.3.tar.gz /usr/local
#RUN tar -zxvf /usr/local/pinpoint-agent-2.5.3.tar.gz -C /usr/local
#
## Update the Pinpoint configuration
#RUN sed -i 's/profiler.transport.grpc.collector.ip=127.0.0.1/profiler.transport.grpc.collector.ip=pinpoint-collector/g' /usr/local/pinpoint-agent-2.5.3/pinpoint-root.config
#RUN sed -i 's/profiler.collector.ip=127.0.0.1/profiler.collector.ip=pinpoint-collector/g' /usr/local/pinpoint-agent-2.5.3/pinpoint-root.config

#ENTRYPOINT ["java","-jar","/app.jar"]

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
ENTRYPOINT ["./wait-for-it.sh", "mysqldb:3306", "-s", "-t", "100", "--"]

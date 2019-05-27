# qingdao_gaokao_zixun_dashboard
# VERSION 0.1.0
# Author: front-end
FROM node:8.10.0-alpine
MAINTAINER front-end front-end@ipin.com

# Setting time zone
RUN apk update && apk add ca-certificates && \
    apk add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

ENV WORK_DIR /usr/src/app
ENV LOG_DIR /data/log

RUN mkdir -p $WORK_DIR \
     && mkdir -p $LOG_DIR

WORKDIR $WORK_DIR
COPY . $WORK_DIR

EXPOSE 9999

CMD ["npm", "start"]

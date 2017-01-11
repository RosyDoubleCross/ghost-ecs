FROM alpine:3.3

ENV GHOST_VERSION 0.11.3
ENV GHOST_USER ghost
ENV GHOST_DIR /var/lib/ghost
ENV GHOST_PORT 2368

WORKDIR $GHOST_DIR

RUN apk update \
	&& apk upgrade \
	&& apk add --no-cache bash curl unzip git \
	&& apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs-lts \
	&& adduser -D -s /bin/bash $GHOST_USER \
	&& curl -sL -o ghost.zip "https://github.com/TryGhost/Ghost/releases/download/${GHOST_VERSION}/Ghost-${GHOST_VERSION}.zip" \
	&& unzip ghost.zip \
	&& npm install --production \
	&& npm install --save pg@4.5.5 \
	&& npm install --save ghost-s3-compat \
	&& rm ghost.zip \
	&& npm cache clean \
	&& git clone https://github.com/lafiosca/shade-ghost-theme.git content/themes/shade-ghost-theme \
	&& mkdir -p content/storage/ghost-s3 \
	&& chown -R $GHOST_USER:$GHOST_USER . \
	&& apk del curl unzip git \
	&& rm -rf /tmp/*

COPY config.js config.js
COPY storage.js content/storage/ghost-s3/index.js

EXPOSE $GHOST_PORT

ENTRYPOINT ["npm", "start", "--production"]

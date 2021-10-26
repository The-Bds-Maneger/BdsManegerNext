FROM node:lts-buster
RUN apt update && apt install git && \
GH_VERSION=$(curl -Ssl https://api.github.com/repos/cli/cli/releases/latest | grep tag_name | cut -d '"' -f 4 | sort -V | tail -n 1 | sed 's|v||g'); \
wget "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.deb" -O /tmp/gh.deb && dpkg -i /tmp/gh.deb && rm -rfv /tmp/gh.deb
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow
ENV USE_DOCKER=0
ENV IN_DOCKER=1

WORKDIR /emba

# =============================================================================
# МОДУЛЬ: I01_default_apps_host
# Устанавливает: jq, shellcheck, unzip, bc, coreutils, ncurses-bin, 
#                libnotify-bin, inotify-tools, dbus-x11, git, net-tools, 
#                curl, file, python3-pip, requests
# Для Docker нужны: jq, unzip, bc, coreutils, git, curl, file, python3-pip
# Исключено: shellcheck, ncurses-bin, libnotify-bin, inotify-tools, 
#            dbus-x11, net-tools, requests
# =============================================================================
RUN apt-get update && apt-get install -y \
    git wget curl sudo \
    python3 python3-pip python3-venv python3-dev \
    bsdmainutils \
    psmisc \
    ent \
    pkg-config \ 
    coreutils \
    tree \
    findutils grep gawk sed \
    libmagic1 libxml2-dev libxslt1-dev \
    liblzo2-dev liblz4-dev \
    graphviz file binutils procps \
    autoconf automake libtool make gcc \
    jq \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# 2. СБОРКА JO 1.9 (вместо snap/apt)
# =============================================================================
RUN git clone https://github.com/jpmens/jo.git   /tmp/jo && \
    cd /tmp/jo && \
    git checkout tags/1.9 && \
    autoreconf -i  && \
    ./configure && \
    make && \
    make install && \
    rm -rf /tmp/jo

# =============================================================================
# 3. ИНСТРУМЕНТЫ АНАЛИЗА
# =============================================================================
RUN apt-get update && apt-get install -y \
    binwalk \
    squashfs-tools \
    libimage-exiftool-perl \
    lzop zstd unzip p7zip-full \
    dpkg-dev rpm \
    openjdk-11-jdk-headless \
    maven gradle \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# 4. PYTHON ЗАВИСИМОСТИ
# =============================================================================
RUN pip3 install --upgrade pip && \
    pip3 install \
    requests urllib3 lxml jsonschema Jinja2 pyyaml \
    packaging pefile pyelftools python-magic \
    unblob jefferson ubi_reader yara-python \
    stacs flare-capa cve-bin-tool \
    && rm -rf /root/.cache/pip
    
RUN apt-get update && apt-get install -y uuid-runtime 

# =============================================================================
# 5. КОПИРОВАНИЕ ПРОЕКТА
# =============================================================================
COPY . .


# =============================================================================
# 8. ПРАВА
# =============================================================================
RUN chmod +x ./emba

VOLUME ["/emba/logs", "/emba/firmware"]

CMD ["/bin/bash"]
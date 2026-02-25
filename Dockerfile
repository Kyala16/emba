FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow
WORKDIR /emba

# 1. Базовые системные зависимости
# Добавлены liblzo2-dev и liblz4-dev для компиляции jefferson и ubi-reader
RUN apt-get update && apt-get install -y \
    git wget curl sudo \
    python3 python3-pip python3-venv python3-dev \
    libmagic1 libxml2-dev libxslt1-dev \
    liblzo2-dev liblz4-dev \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

# 2. Инструменты анализа и распаковки
# sasquatch заменен на squashfs-tools (доступен в репо)
RUN apt-get update && apt-get install -y \
    binwalk \
    squashfs-tools \
    libimage-exiftool-perl \
    lzop \
    zstd \
    unzip \
    p7zip-full \
    dpkg-dev \
    rpm \
    openjdk-11-jdk-headless \
    maven \
    gradle \
    jq \
    && rm -rf /var/lib/apt/lists/*

# 3. Установка Python зависимостей (ИСПРАВЛЕНО)
# stacs-cli -> stacs
# capa -> flare-capa
# ubi-reader -> ubi_reader (в pip используется нижнее подчеркивание)
RUN pip3 install --upgrade pip && \
    pip3 install \
    requests \
    urllib3 \
    lxml \
    jsonschema \
    Jinja2 \
    pyyaml \
    packaging \
    pefile \
    pyelftools \
    python-magic \
    unblob \
    jefferson \
    ubi_reader \
    yara-python \
    stacs \
    flare-capa \
    cve-bin-tool \
    && rm -rf /root/.cache/pip

# 4. Копирование проекта
COPY . .

# 5. Подготовка прав
VOLUME ["/emba/logs", "/emba/firmware"]

ENTRYPOINT ["./emba"]

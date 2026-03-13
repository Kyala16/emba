FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow
ENV USE_DOCKER=0
ENV IN_DOCKER=0
ENV CVE_SEARCH=0
ENV SBOM_MINIMAL=1
ENV EXT_DIR=/external

RUN mkdir -p /external

WORKDIR /emba


# =============================================================================
# 1. БАЗОВЫЕ ЗАВИСИМОСТИ (один слой, --no-install-recommends)
# =============================================================================
RUN apt-get update && apt-get install -y --no-install-recommends \
    # === Базовые утилиты ===
    bash coreutils findutils tree psmisc pkg-config libtool automake make autoconf gcc grep sed gawk curl ca-certificates \
    \
    # === S06: Distribution identification ===
    file jq libxml2-utils \
    \
    # === S08: Package identification ===
    dpkg-dev python3-pip python3-venv python3-dev \
    \
    # === S09: Firmware extraction ===
    p7zip-full squashfs-tools \
    \
    # === S24/S25: Kernel analysis ===
    binutils kmod \
    \
    # === Общие ===
    libimage-exiftool-perl uuid-runtime git \
    \
    # === Для сборки binwalk из исходников ===
    python3-setuptools \
    \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# 2. BINWALK ИЗ ИСХОДНИКОВ (v2.3.3 — последний с setup.py)
# =============================================================================
RUN git clone --depth 1 --branch v2.3.3 https://github.com/ReFirmLabs/binwalk.git /tmp/binwalk && \
    cd /tmp/binwalk && \
    python3 setup.py install && \
    rm -rf /tmp/binwalk

# =============================================================================
# 3. PYTHON ЗАВИСИМОСТИ (только нужные для профиля)
# =============================================================================
RUN pip3 install \
    # === S08: Package parsers ===
    requirements-parser \
    \
    # === S09: Extractors ===
    unblob jefferson ubi_reader yara-python \
    \
    # === F15: CycloneDX SBOM ===
    cyclonedx-python-lib cyclonedx-bom \
    \
    # === Общие ===
    requests lxml jsonschema Jinja2 pyyaml packaging pefile pyelftools python-magic \
    && rm -rf /root/.cache/pip

# =============================================================================
# 4. JO (нужен для JSON-форматирования в helpers)
# =============================================================================
RUN git clone --depth 1 --branch 1.9 https://github.com/jpmens/jo.git /tmp/jo && \
    cd /tmp/jo && \
    autoreconf -i && \
    ./configure && \
    make && \
    make install && \
    rm -rf /tmp/jo

# =============================================================================
# 5. КОПИРОВАНИЕ ПРОЕКТА
# =============================================================================
COPY . .

# =============================================================================
# 6. ПРАВА
# =============================================================================
RUN chmod +x ./emba

VOLUME ["/emba/logs", "/emba/firmware"]

CMD ["/bin/bash"]

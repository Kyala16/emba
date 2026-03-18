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
    libimage-exiftool-perl uuid-runtime git libssl-dev\
    \
    # === Для сборки binwalk из исходников ===
    python3-setuptools \
    \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# 2. BINWALK ИЗ ИСХОДНИКОВ (v2.3.4 — последний с setup.py)
# =============================================================================
RUN git clone --depth 1 --branch v2.3.4 https://github.com/ReFirmLabs/binwalk.git /tmp/binwalk && \
    cd /tmp/binwalk && \
    python3 setup.py install && \
    
    #=== ПАТЧ: Отключаем проверку require_root в extractor.py ===
    # Находим путь к установленному модулю и патчим его \
    EXTRACTOR_PATH=$(python3 -c "import binwalk.modules.extractor; print(binwalk.modules.extractor.__file__)") && \
    echo "Patching: $EXTRACTOR_PATH" && \
    
    # Создаем резервную копию и делаем замену через sed \
    cp "$EXTRACTOR_PATH" "$EXTRACTOR_PATH.bak" && \
    sed -i '/raise ModuleException("Binwalk extraction uses many third party utilities/c\                    pass' "$EXTRACTOR_PATH" && \
    
    # Проверяем, что патч применился \
    grep -A2 -B2 "if.*user_info" "$EXTRACTOR_PATH" | grep -q "pass" && echo "✓ Binwalk patched successfully" || (echo "✗ Patch failed" && exit 1) && \
    
    rm -rf /tmp/binwalk

# =============================================================================
# 3. PYTHON ЗАВИСИМОСТИ (только нужные для профиля)
# =============================================================================
RUN pip3 install \
    # === S08: Package parsers ===
    requirements-parser==0.5.0 \
    # === S09: Extractors ===
    unblob==23.12.16 jefferson==0.4.5 ubi_reader==0.8.9 yara-python==4.3.1 \
    # === F15: CycloneDX SBOM ===
    cyclonedx-python-lib==3.1.0  \
    cyclonedx-bom==3.11.0 \
    # === Общие ===
    requests==2.31.0 lxml==5.1.0 jsonschema==4.21.1 \
    Jinja2==3.1.3 pyyaml==6.0.1 packaging==23.2 pefile==2023.2.7 pyelftools==0.30 python-magic==0.4.27 \
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

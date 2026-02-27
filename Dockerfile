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
# МОДУЛЬ: I01_default_apps
# Устанавливает: file, jq, bc, make, tree, device-tree-compiler, qemu-user,
#                qemu-user-static, libguestfs-tools, ent, tcllib, u-boot-tools,
#                python3-bandit, john, john-data, curl, git, strace, rpm,
#                python3-pip, requests, iputils-ping, colordiff, ssdeep, xdot,
#                libimage-exiftool-perl, readpe, tidy, metasploit-framework
# Для Docker нужны: bc, libguestfs-tools, u-boot-tools, rpm, colordiff, tidy
# Исключено: qemu-user, qemu-user-static, tcllib, python3-bandit, john,
#            john-data, strace, iputils-ping, ssdeep, xdot, readpe,
#            metasploit-framework, device-tree-compiler
# =============================================================================
RUN apt-get update && apt-get install -y \
    bc \
    libguestfs-tools \
    u-boot-tools \
    rpm \
    colordiff \
    tidy \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# МОДУЛЬ: ID1_ubuntu_os
# Устанавливает: notification-daemon, dbus, dbus-x11, linux-modules-extra
# Для Docker нужны: (нет)
# Исключено: notification-daemon, dbus, dbus-x11, linux-modules-extra
# Причина: Уведомления и модули ядра не работают в контейнере
# =============================================================================

# =============================================================================
# МОДУЛЬ: I13_disasm
# Устанавливает: binutils-2.45, capa v9.2.1, texinfo, git, wget, gcc, make,
#                build-essential, gawk, bison, debuginfod, python3,
#                python-is-python3, libzip-dev, meson, radare2, r2dec
# Для Docker нужны: python-is-python3
# Исключено: texinfo, build-essential, bison, debuginfod, libzip-dev, meson,
#            radare2, r2dec
# Причина: binutils, git, wget, gcc, make, gawk, python3 уже в I01_default_apps_host
#          capa уже в pip (flare-capa), radare2 не нужен для SBOM
# =============================================================================
RUN apt-get update && apt-get install -y \
    python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# МОДУЛЬ: IP00_extractors
# Устанавливает: python3-pip, patool, bsdiff4, payload_dumper, smcbmc,
#                dji-firmware-tools, python3-pycryptodome, pycryptodome,
#                liblzo2-dev, python-lzo, guestfs-tools, fsspec,
#                buffalo-enc.c/lib/h, gcc, libc6-dev, mtd-utils
# Для Docker нужны: patool, bsdiff4, pycryptodome, python-lzo,
#                   fsspec, libc6-dev, mtd-utils
# Исключено: smcbmc, dji-firmware-tools, buffalo-enc.c/lib/h
# Причина: python3-pip, liblzo2-dev, gcc уже в I01_default_apps_host
#          guestfs-tools уже в I01_default_apps
#          smcbmc, dji-firmware-tools, buffalo специфичны для вендоров
# =============================================================================
RUN apt-get update && apt-get install -y \
    patool \
    libc6-dev \
    mtd-utils \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install \
    bsdiff4 \
    pycryptodome \
    python-lzo \
    fsspec \
    && rm -rf /root/.cache/pip

# =============================================================================
# МОДУЛЬ: IP35_uefi_extraction
# Устанавливает: UEFIExtract, unzip, uefi_firmware, biosutilities
# Для Docker нужны: uefi_firmware, biosutilities
# Исключено: UEFIExtract
# Причина: unzip уже в секции "ИНСТРУМЕНТЫ АНАЛИЗА"
#          UEFIExtract - бинарник, специфичен для UEFI анализа
# =============================================================================

# =============================================================================
# МОДУЛЬ: IP61_unblob
# Устанавливает: python3-pip, libpython3-dev, zlib1g, zlib1g-dev, liblzo2-2,
#                liblzo2-dev, python3-lzo, e2fsprogs, gcc, git,
#                android-sdk-libsparse-utils, lz4, lziprecover, lzop, 7zip,
#                unar, xz-utils, libhyperscan5, libhyperscan-dev, zstd,
#                python3-magic, pkg-config, pkgconf, erofs-utils, partclone,
#                python3-lief, sasquatch, unblob (pip)
# Для Docker нужны: libpython3-dev, zlib1g-dev, e2fsprogs,
#                   android-sdk-libsparse-utils, lz4, lziprecover,
#                   unar, xz-utils, libhyperscan5, libhyperscan-dev,
#                   pkgconf, erofs-utils, partclone, python3-lief,
#                   sasquatch, unblob (pip)
# Исключено: (нет, все пакеты нужны для извлечения прошивок)
# Причина: python3-pip, liblzo2-dev, gcc, git, pkg-config уже в I01_default_apps_host
#          liblzo2-2, python3-lzo уже в IP00_extractors
#          lzop, zstd, 7zip (p7zip-full) уже в секции "ИНСТРУМЕНТЫ АНАЛИЗА"
#          python3-magic уже в pip (python-magic)
# =============================================================================

# =============================================================================
# МОДУЛЬ: I05_emba_docker_image_dl
# Устанавливает: Готовый Docker-образ EMBA
# Для Docker нужны: (нет)
# Исключено: Все
# Причина: Собираем образ сами через Dockerfile
# =============================================================================

# =============================================================================
# МОДУЛЬ: IF20_nvd_feed
# Устанавливает: Базы уязвимостей NVD CVE (~2GB)
# Для Docker нужны: (нет)
# Исключено: Все
# Причина: CVE-базы не нужны для генерации SBOM
# =============================================================================

# =============================================================================
# 2. СБОРКА JO 1.9 (вместо snap/apt)
# =============================================================================
RUN git clone https://github.com/jpmens/jo.git     /tmp/jo && \
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
    uefi_firmware biosutilities \
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
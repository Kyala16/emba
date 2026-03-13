EMBA_Minimal_SBOM

mkdir ~/emba_output
mkdir ~/emba_output/logs
mkdir ~/emba_output/external

docker build -t emba-binwalkv2 .
docker run --rm  -v <path_to_firmware>:/firmware.de:ro \
 -v ~/emba-output/logs:/logs  \
 -v ~/emba-output/external:/external   emba-binwalkv2:latest \
  /bin/bash -c "./emba -l /logs -f /firmware.de \ 
 -p /scan-profiles/default-sbom.emba"


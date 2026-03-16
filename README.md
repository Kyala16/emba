# EMBA_Minimal_SBOM

## Hard lab (Q1)

### Clone project
```
git clone https://github.com/Kyala16/emba.git && \
cd emba
```


### Create dir for log
```
mkdir ~/emba_output && \
mkdir ~/emba_output/logs && \
mkdir ~/emba_output/external
```


### Create docker image
```
docker build -t emba-minimal .
```


### Run emba in docker with your firmware
```
docker run --rm  -v <path_to_firmware>:/firmware.<extension>:ro \
 -v ~/emba-output/logs:/logs  \
 -v ~/emba-output/external:/external   emba-minimal:latest \
  /bin/bash -c "./emba -l /logs -f /firmware.<extension> \ 
 -p /scan-profiles/default-sbom.emba"
```


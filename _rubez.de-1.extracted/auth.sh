#!/bin/sh
export HASPUSER_PREFIX=/mnt/nand/license
rm -fr ${HASPUSER_PREFIX}
mkdir -p ${HASPUSER_PREFIX}
chmod 777 ${HASPUSER_PREFIX}
##cp  -R /home/bvtech/authtool /tmp/authtool
cp  -R ./authtool /tmp/authtool
cd /tmp/authtool
./three_step_auth_tool_for_UCLIBC_SIGMASTAR377 
###./three_step_auth_tool -d SIGMA9351 -f ./fp.c2v -c ./CBG_SSC336Q_Face_Reco---60-Trial-one-stage.cert
./three_step_auth_tool_for_UCLIBC_SIGMASTAR377  -f ./fp.c2v -c ./CBG_SSC377_Struct_Reco---30-Trial-one-stage.cert
./three_step_auth_tool_for_UCLIBC_SIGMASTAR377  -v ./af.v2c
cd /home/bvtech
rm -rf /tmp/authtool



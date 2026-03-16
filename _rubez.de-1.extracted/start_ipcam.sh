#!/bin/sh
telnetd -p 23 &
date -u -s "2025-04-14 12:00:00"
##date -u -s "2025-02-28 12:00:00"
date -u -s "2025-06-12 11:00:08"
################################################################################
export IPCAM_HOME=/home/bvtech
export LD_LIBRARY_PATH=/home/bvtech/lib:${LD_LIBRARY_PATH}
mkdir -p /mnt/nand/license
export HASPUSER_PREFIX=/mnt/nand/license
################################################################################
ipcam_env_save_read()
{
    ENV_APP=`grep -w $1 /mnt/nand/system.conf`
    ENV_APP1=`fw_printenv $1`
    if [ "$ENV_APP" != "$ENV_APP1" ] && [ -n "$ENV_APP1" ]; then
        if [ ! -n "$ENV_APP" ]; then
            echo $ENV_APP1 >> /mnt/nand/system.conf
        else
            sed -i "s/$ENV_APP/$ENV_APP1/" /mnt/nand/system.conf
        fi
        echo $ENV_APP1
    else
        echo $ENV_APP
    fi
}



ipcam_init_ssc377()
{
    echo "start load himpp ko $1 $2 $3"
    ${IPCAM_HOME}/sensor/loadssc377 $1 $2 $3 $4
}
################################################################################
#default ipcam boot parameter
sensortype=ps5280
chiptype=ssc377
sensornum=1
################################################################################
#read system config env
export ENV_CHIPTYPE=`fw_printenv chiptype`
export ENV_BOOTARGS=`fw_printenv bootargs`
export ENV_BOARDTYPE=`fw_printenv BoardType`
if [ ! -e /mnt/nand/system.conf ]; then
    if [ -n "$ENV_BOARDTYPE" ]; then
      cp sysconf/${ENV_BOARDTYPE:10}.conf /mnt/nand/system.conf
    fi
fi
#ln -s /mnt/nand/system.conf ${IPCAM_HOME}/system.conf
insmod /home/drv/mi/mi_all.ko mi_venc_impl.max_jpe_task=1 VenMiuPChn=3 drv_venc_wrapper.DRAM_SIZE_REFINE=1 mi_vif_impl.g_bUserCurrentWrite=0
insmod ${IPCAM_HOME}/sensor/srcfg.ko
./detectsns
################################################################################
ENV_BOARDTYPE=`ipcam_env_save_read BoardType`
ENV_SENSORTYPE=`ipcam_env_save_read sensortype`
ENV_UUID=`ipcam_env_save_read uuid`
ENV_SERIALNO=`ipcam_env_save_read serialno`
ENV_QRCODE=`ipcam_env_save_read qrcode`
ENV_MAC=`ipcam_env_save_read mac`
ENV_MAC_WIFI=`ipcam_env_save_read mac_wifi`
ENV_LICENSE=`ipcam_env_save_read license`
ENV_IVALICENSE=`ipcam_env_save_read ivalicense`
ENV_LENSTYPE=`ipcam_env_save_read lenstype`
ENV_LENSFL=`ipcam_env_save_read lensfl`
ENV_APPADDR=`ipcam_env_save_read app_addr`
if [ -n "$ENV_CHIPTYPE" ]; then
  chiptype=${ENV_CHIPTYPE:9}
fi
if [  -n "$ENV_SENSORTYPE" ]; then
  sensortype=${ENV_SENSORTYPE:11}
fi
if [  -n "$ENV_BOARDTYPE" ]; then
  boardtype=${ENV_BOARDTYPE:10}
fi
################################################################################
#load driver
ipcam_init_ssc377 $chiptype $sensortype $boardtype $sensornum
if [ -e ${IPCAM_HOME}/af.ko ]; then
  insmod ${IPCAM_HOME}/af.ko
fi

if [ -e ${IPCAM_HOME}/exfat.ko ]; then
  insmod ${IPCAM_HOME}/exfat.ko
fi

if [ -e ${IPCAM_HOME}/nfsv4.ko ]; then
  insmod ${IPCAM_HOME}/nfsv4.ko
fi

if [ -d ${IPCAM_HOME}/pppoe ]; then
  insmod ${IPCAM_HOME}/pppoe/crc-ccitt.ko
  insmod ${IPCAM_HOME}/pppoe/slhc.ko
  insmod ${IPCAM_HOME}/pppoe/slhc.ko
  insmod ${IPCAM_HOME}/pppoe/ppp_generic.ko
  insmod ${IPCAM_HOME}/pppoe/ppp_synctty.ko
  insmod ${IPCAM_HOME}/pppoe/ppp_async.ko
fi
if [ -d ${IPCAM_HOME}/mobile ]; then
  insmod ${IPCAM_HOME}/mobile/usbserial.ko
  insmod ${IPCAM_HOME}/mobile/usb_wwan.ko
  insmod ${IPCAM_HOME}/mobile/option.ko
fi

if [ -d ${IPCAM_HOME}/xl2tpd ]; then
  insmod ${IPCAM_HOME}/xl2tpd/ip6_udp_tunnel.ko
  insmod ${IPCAM_HOME}/xl2tpd/udp_tunnel.ko
  insmod ${IPCAM_HOME}/xl2tpd/l2tp_core.ko
  insmod ${IPCAM_HOME}/xl2tpd/pppox.ko
  insmod ${IPCAM_HOME}/xl2tpd/l2tp_ppp.ko
fi

if [ -d ${IPCAM_HOME}/instaview ]; then
	if [ ! -d /mnt/config/instaview ]; then
		echo "instaview cfg copy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
		cp ${IPCAM_HOME}/instaview /mnt/config/ -avf
	
	fi
fi

if [ -e ${IPCAM_HOME}/tun.ko ]; then
  insmod ${IPCAM_HOME}/tun.ko
fi

################################################################################
if [ -n "$ENV_QRCODE" ]; then
  qrcode=${ENV_QRCODE:7}
  if [ -n "$qrcode" ]; then
    qrencode $qrcode -o ${IPCAM_HOME}/www/logo/qrcode.png
  fi
fi

if [ ! -e /mnt/config/web_logo.png ]; then
  cp /home/bvtech/www/ui/images/logo_neu.png /mnt/config/web_logo.png
fi

  

if [ ! -n "$ENV_UUID" ]; then
  uuidstr=$(cat /proc/sys/kernel/random/uuid)
  fw_setenv uuid $uuidstr
  ENV_UUID=`ipcam_env_save_read uuid`
fi
################################################################################
#configure the regsiter mux
ipcam_gpio_export()
{
    for arg in "$@";
    do
        echo $arg > /sys/class/gpio/export 
    done
}

if [ "$boardtype" == "600217006-BV-M1706" ] ; then
	insmod motor_driver.ko sda_gpio=43  scl_gpio=44 gc615x_motor=0 max_hori_steps=27306 max_vert_steps=2500
fi
if [ "$boardtype" == "600217019-BV-M1719" ] || [ "$boardtype" == "600217020-BV-M1720" ] ; then
	insmod motor_driver.ko sda_gpio=43  scl_gpio=44 gc615x_motor=2 four_line=1 max_hori_steps=6706 max_vert_steps=2500
fi
if [ "$boardtype" == "600218009-BV-M1809" ] ; then
	insmod motor_driver.ko sda_gpio=57  scl_gpio=56 gc615x_motor=2 four_line=1 max_hori_steps=27306 max_vert_steps=2500
fi

if [ "$boardtype" == "600214016-BV-M1416" ] ; then
	insmod motor_driver.ko sda_gpio=10  scl_gpio=9 gc615x_motor=1
fi

if [ "$boardtype" != "600214011-BV-M1411" ] ; then
  ipcam_gpio_export 44
fi
if [ "$boardtype" != "600216003-BV-M1603" ] && [ "$boardtype" != "600216006-BV-M1606" ] && [ "$boardtype" != "600218006-BV-M1806" ] && [ "$boardtype" != "600214011-BV-M1411" ] ; then
  ipcam_gpio_export 43
fi
if [ "$boardtype" == "600214002-BV-M1402" ] || [ "$boardtype" == "600217002-BV-M1702" ] || [ "$boardtype" == "600214012-BV-M1412" ] || [ "$boardtype" == "600214017-BV-M1417" ]; then
ipcam_gpio_export 75 9 74 30 
elif [ "$boardtype" == "600214005-BV-M1405" ]  || [ "$boardtype" == "600217005-BV-M1705" ] ; then
ipcam_gpio_export  74 23 10 42 80 
elif [ "$boardtype" == "600216001-BV-M1601" ] || [ "$boardtype" == "600216014-BV-M1614" ] || [ "$boardtype" == "600218001-BV-M1801" ] || [ "$boardtype" == "600218004-BV-M1804" ] || [ "$boardtype" == "600218010-BV-M1810" ] || [ "$boardtype" == "600216004-BV-M1604" ] || [ "$boardtype" == "600222001-BV-M2201" ] || [ "$boardtype" == "600218014-BV-M1814" ] ; then
ipcam_gpio_export 80 81 29 10 
elif [ "$boardtype" == "600214004-BV-M1404" ] || [ "$boardtype" == "600217004-BV-M1704" ] || [ "$boardtype" == "600217018-BV-M1718" ]  || [ "$boardtype" == "600217012-BV-M1712" ] ; then
ipcam_gpio_export 12 23 9 10 80 81
elif [ "$boardtype" == "600217006-BV-M1706" ] || [ "$boardtype" == "600217019-BV-M1719" ] ; then
ipcam_gpio_export 12 23 9 10 80 81 30
elif [ "$boardtype" == "600217015-BV-M1715" ] || [ "$boardtype" == "600217017-BV-M1717" ] ; then
ipcam_gpio_export 12 23 9 10 80 81 31
elif [ "$boardtype" == "600218009-BV-M1809" ] || [ "$boardtype" == "600222009-BV-M2209" ] ; then
ipcam_gpio_export 9 11 27 29 42 43 56 57
elif [ "$boardtype" == "600216002-BV-M1602" ] || [ "$boardtype" == "600218002-BV-M1802" ] ; then
ipcam_gpio_export 30 12 80 81
elif [ "$boardtype" == "600216003-BV-M1603" ] || [ "$boardtype" == "600216006-BV-M1606" ] || [ "$boardtype" == "600218006-BV-M1806" ] ; then
  ipcam_gpio_export 30 12
elif [ "$boardtype" == "600216005-BV-M1605" ] || [ "$boardtype" == "600218005-BV-M1805" ] || [ "$boardtype" == "600218011-BV-M1811" ] || [ "$boardtype" == "600222005-BV-M2205" ] ; then
  ipcam_gpio_export 10 27 29 42 55 80 81
elif [ "$boardtype" == "600214011-BV-M1411" ] ; then
  ipcam_gpio_export 9 10 80
elif [ "$boardtype" == "600216009-BV-M1609" ] || [ "$boardtype" == "600216010-BV-M1610" ] || [ "$boardtype" == "600216011-BV-M1611" ] ; then
  ipcam_gpio_export 11 12 30 42 80 81
elif [ "$boardtype" == "600216007-BV-M1607" ] || [ "$boardtype" == "600218007-BV-M1807" ] ; then
  ipcam_gpio_export 30 54 81
elif [ "$boardtype" == "600216008-BV-M1608" ] || [ "$boardtype" == "600218008-BV-M1808" ] || [ "$boardtype" == "600222008-BV-M2208" ] ; then
  ipcam_gpio_export 23 28 29 42 80 81
elif [ "$boardtype" == "600214000-BV-M1400" ] ; then
  ipcam_gpio_export  75 30 10 9 74 23
elif [ "$boardtype" == "600214016-BV-M1416" ] ; then
  ipcam_gpio_export  11 12 44 43 23 74
elif [ "$boardtype" == "600214001-BV-M1401" ] || [ "$boardtype" == "600217016-BV-M1716" ] ; then
  ipcam_gpio_export  10 9 74 12 23
elif [ "$boardtype" == "600220005-BV-M2005" ] || [ "$boardtype" == "600221003-BV-M2103" ] ; then
  ipcam_gpio_export   74 
elif [ "$boardtype" == "600222007-BV-M2207" ] ; then
  ipcam_gpio_export   30 81
elif [ "$boardtype" == "600216013-BV-M1613" ] ; then
  ipcam_gpio_export 80 81 11 30 14 12 73 43
fi

if [ -e ${IPCAM_HOME}/checkusb.sh ] ; then
  ${IPCAM_HOME}/checkusb.sh $boardtype 1
fi

MAC_WIFI_VAL=${ENV_MAC_WIFI:9}
if [ "$MAC_WIFI_VAL" != "" ]; then
	ifconfig wlan0 hw ether $MAC_WIFI_VAL
fi

if [ "$boardtype" == "600217006-BV-M1706" ] ; then
gio 9 0
fi

##echo skip_func 4 > /dev/ispmid
echo 384000000 > /sys/devices/virtual/mstar/isp0/isp_clk
echo 4 > /sys/devices/virtual/mstar/mscl/clk

################################################################################

cd ${IPCAM_HOME}
cp ./cmdserv /tmp/cmdserv
/tmp/cmdserv &
./reset &
./daemonserv &
sleep 1
./bvipcam&
#
#./bvipcam&

if [ -d ${IPCAM_HOME}/openvpn ]; then
cd ${IPCAM_HOME}/openvpn
./start
fi


#!/bin/sh
ROOT_DIR=/home/bvtech
WIFI_DRV=rtl8188fu
BT_DRV=

# if [ -e $ROOT_DIR/set_rate_power.txt ]; then
# #  cp /home/bvtech/set_rate_power.txt /tmp
#     ln -sf  /home/bvtech/set_rate_power.txt /tmp/set_rate_power.txt
# fi
# ln -sf  /home/bvtech/set_rate_power.txt /tmp/set_rate_power.txt

if [ -e $ROOT_DIR/firmware_class.ko ]; then
    insmod  $ROOT_DIR/firmware_class.ko
fi




if [ -e $ROOT_DIR/cfg80211.ko ]; then
    insmod  $ROOT_DIR/cfg80211.ko
fi

if [ -e $ROOT_DIR/mt7601Usta.ko ]; then
    WIFI_DRV=mt7601Usta
fi

if [ -e $ROOT_DIR/rtl8188fu.ko ]; then
    WIFI_DRV=rtl8188fu
fi

if [ -e $ROOT_DIR/rtl8812.ko ]; then
    WIFI_DRV=rtl8812
fi

if [ -e $ROOT_DIR/rtl8811.ko ]; then
    WIFI_DRV=rtl8811
fi

if [ -e $ROOT_DIR/rtl8821.ko ]; then
    WIFI_DRV=rtl8821
fi
if [ -e $ROOT_DIR/ssw101b.ko ]; then
    WIFI_DRV=ssw101b
fi


if [ -e $ROOT_DIR/ATBM606x_wifi_usb.ko ]; then
    WIFI_DRV=ATBM606x_wifi_usb
    ln -sf  /home/bvtech/set_rate_power.txt /tmp/set_rate_power.txt
fi

if [ -e $ROOT_DIR/ATBM613x_wifi_usb.ko ]; then
    WIFI_DRV=ATBM613x_wifi_usb
    ln -sf  /home/bvtech/set_rate_power.txt /tmp/set_rate_power.txt
fi

if [ -e $ROOT_DIR/ATBM6x6x_wifi_usb.ko ]; then
    WIFI_DRV=ATBM6x6x_wifi_usb
fi

if [ "$1" == "600216005-BV-M1605" ] || [ "$1" == "600218005-BV-M1805" ] || [ "$1" == "600216009-BV-M1609" ] || [ "$1" == "600216010-BV-M1610" ] || [ "$1" == "600216011-BV-M1611" ] ; then
gio 42 0
elif [ "$1" == "600218009-BV-M1809" ] || [ "$1" == "600218008-BV-M1808" ] || [ "$1" == "600216008-BV-M1608" ] || [ "$1" == "600214016-BV-M1416" ] ; then
gio 42 0
elif [ "$1" == "600214011-BV-M1411" ] ; then
echo "nonsupport wifi"
else
gio 9 0
fi

if [ "$WIFI_DRV" == "ATBM606x_wifi_usb" ] || [ "$WIFI_DRV" == "ATBM613x_wifi_usb" ] || [ "$WIFI_DRV" == "ATBM6x6x_wifi_usb" ] ; then
BT_DRV='wifi_bt_comb=1'
sleep 5
else
sleep 1
fi

if [ -d $ROOT_DIR/aic8800 ]; then
insmod  $ROOT_DIR/aic8800/firmware_class.ko  
insmod  $ROOT_DIR/aic8800/cfg80211.ko  

result=`lsusb`
echo ${result}

result2=$(echo ${result} | grep "8d80")
if [[ "$result2" != "" ]]
then
	S1="/home/bvtech/aic8800/aic8800D80"
    else
	S1="/home/bvtech/aic8800"
fi

insmod  $ROOT_DIR/aic8800/aic_load_fw.ko aic_fw_path=$S1
sleep 2
insmod  $ROOT_DIR/aic8800/aic8800_fdrv.ko
WIFI_DRV=aic8800_fdrv
sleep 6
else
echo $BT_DRV
insmod $ROOT_DIR/$WIFI_DRV.ko ifname=wlan0 $BT_DRV
fi


if [ -e /sys/class/net/ra0 ] || [ -e /sys/class/net/wlan0 ]; then
   echo "we detected $WIFI_DRV wifi"
else
    #rm wifi driver and power
    echo "we detected $WIFI_DRV wifi fail"
    result=`lsusb`
    echo ${result}
    exit

    rmmod  $ROOT_DIR/$WIFI_DRV.ko
    if [ -e $ROOT_DIR/cfg80211.ko ] ; then
        rmmod  $ROOT_DIR/cfg80211.ko
    fi
	if [ -e $ROOT_DIR/firmware_class.ko ] ; then
        rmmod  $ROOT_DIR/firmware_class.ko
    fi
fi

if [ "$2" == "0" ]; then
    rm $ROOT_DIR/$WIFI_DRV.ko
    if [ -e $ROOT_DIR/cfg80211.ko ] ; then
        rm  $ROOT_DIR/cfg80211.ko
    fi
	if [ -e $ROOT_DIR/firmware_class.ko ] ; then
        rm  $ROOT_DIR/firmware_class.ko
    fi
fi

if [ -e $ROOT_DIR/rtk_btusb.ko ]; then
    insmod  $ROOT_DIR/firmware_class.ko
    insmod  $ROOT_DIR/bluetooth.ko
    insmod  $ROOT_DIR/rtk_btusb.ko
    if [ -e /sys/class/bluetooth/hci0 ]; then
       echo "we detected bluetooth"
    else
        #rm wifi driver and power
        rmmod  $ROOT_DIR/rtk_btusb.ko
        rmmod  $ROOT_DIR/bluetooth.ko
        rmmod  $ROOT_DIR/firmware_class.ko
    fi
fi

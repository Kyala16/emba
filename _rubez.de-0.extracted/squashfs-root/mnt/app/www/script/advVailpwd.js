/**
 * 密码高级验证
 * @param {*} newPassword 
 * @param {*} previousPasswords 
 * @returns 
 */
const activate_password_vaildate = (newPassword, username) => {
  // const username = Username || 'admin';//
  var inputTips = translate_page_item(TARGET_PAGE_TIPSTEXT, "inputTips", "", ITEM_TYPE_NONE).split('**');
  // console.log(inputTips);

  // 基础验证：长度至少25位
  if (newPassword.length < 25) {
    return { valid: false, message: inputTips[0] };
  }
  // 验证包含大小写字母、数字和特殊符号
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$${};':"\\|,.<>\/?]).+$/;
  if (!complexityRegex.test(newPassword)) {
    return { valid: false, message: inputTips[1] };
  }
  // 验证不是键盘连续字符
  const keyboardSequences = [
    'qwertyuiopasdfghjklzxcvbnm',
    '1234567890',
    '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p',
    '!@#$%^&*()_+',
    'qazwsxedcrfvtgbyhnujmikolp',
    'mnbvcxzlkjhgfdsapoiuytrewq',
    '0987654321',
    'poiuytrewqlkjhgfdsamnbvcxz',
    '456+789+/*-741/852*963-+0.',
  ];

  for (const seq of keyboardSequences) {
    for (let i = 0; i <= seq.length - 5; i++) {
      const substring = seq.substring(i, i + 5);
      if (newPassword.toLowerCase().includes(substring)) {
        return { valid: false, message: inputTips[2] };
      }
    }
  }


  if (username && username != '') {
    // console.log('验证是否带用户名-', username);
    // 验证密码中不包含用户名
    if (username && newPassword.toLowerCase().includes(username.toLowerCase())) {
      return { valid: false, message: inputTips[3] };
    }


  }

  // 验证没有长重复序列
  const repeatRegex = /(.{4,})\1/;
  if (repeatRegex.test(newPassword)) {
    return { valid: false, message: inputTips[4] };
  }

  // console.log(inputTips[5]);
  return { valid: true, message: inputTips[5] };
}



const activateStr = `<div id="div_activate_password"style="display:none;">
<div id="div_activate"class="cls_retrieval_dialog_item"style="margin-top: 10px;">
<div id="div_activate_username"class="cls_retrieval_dialog_item_name"style="height: 30px;line-height: 30px;">User name</div>
<div id="div_activate_username_value"class="cls_retrieval_dialog_item_value"style="height: 30px;line-height: 30px;width: 284px;">
<div id="div_activate_username_text"style="width: 124px;font-weight: bold;"></div></div>
</div><div id="div_activate"class="cls_retrieval_dialog_item">
<div id="div_activate_passwordtext"class="cls_retrieval_dialog_item_name">Password</div><div id="div_activate_passwordvalue"class="cls_retrieval_dialog_item_value">
<div style="width: 265px;height: 22px;background-color: #2f2f2f;border: 1px solid #242424;">
<input type="password"id="input_activate_password_text"class="cls_subpage_content_input"maxlength="15"style="float: left;border: none;"autocomplete="off">
<div id="div_activate_password_eye"style="float: left;margin-left: 3px;"><img class="cls_input_icon"id="activate_newpass_eye_hide"onclick="fun_activate_eye_showorhide(0)"style="margin-top: 6px;"src="ui/images/weyehide.png">
<img class="cls_input_icon"id="activate_newpass_eye_show"onclick="fun_activate_eye_showorhide(1)"style="margin-top: 6px;"src="ui/images/eyeshow.png"hidden>
</div></div></div></div><div id="div_activateval_newpassword_tip"class="cls_usermanage_dialog_item"style="height: auto;line-height: 20px;float:left;display: none;">
<div id="div_activateval_newpassword_tip_info"class="cls_retrieval_dialog_item_name"style="width: 288px;color: red;margin-left: 165px;height:auto;"></div></div>
<div id="div_activate"class="cls_retrieval_dialog_item"style="margin-top: 10px;"><div id="div_activate_confirm_text"class="cls_retrieval_dialog_item_name"style="margin-top: 3px;">Confirm Password</div>
<div id="div_activate_passwordvaluee"class="cls_retrieval_dialog_item_value"style="margin-top: 3px;"><div style="width: 265px;height: 22px;background-color: #2f2f2f;border: 1px solid #242424;">
<input type="password"id="input_activate_confirm_text"maxlength="15"class="cls_subpage_content_input"style="float: left;border: none;"autocomplete="off">
<div id="div_activate_confirmpass_eye"style="float: left;margin-left: 3px;"><img class="cls_input_icon"id="activate_confirmpass_eye_hide"onclick="fun_activate_confirmpass_eye_showorhide(0)"style="margin-top: 6px;"src="ui/images/weyehide.png">
<img class="cls_input_icon"id="activate_confirmpass_eye_show"onclick="fun_activate_confirmpass_eye_showorhide(1)"style="margin-top: 6px;"src="ui/images/eyeshow.png"hidden></div></div></div></div><div id="info_password"class="cls_retrieval_dialog_item"style="margin-top: 10px;">
<div id="div_activate_strength"class="cls_retrieval_dialog_item_name"style="margin-top: 3px;">Password strength</div><div class="cls_retrieval_dialog_item_value"style="margin-top: 3px;width: 400px;height: 24px;line-height: 24px;"><div class="s1"style="width: 86px;height: 3px;background-color: #ccc;display: inline-block;"></div><div class="s2"style="width: 86px;height: 3px;background-color: #ccc;display: inline-block;"></div><div class="s3"style="width: 86px;height: 3px;background-color: #ccc;display: inline-block;margin-right:15px;"></div><span class="s4">
</span></div></div><div id="info_confirm_password"class="cls_retrieval_dialog_item"style="margin-top: 10px;display: none;"><div class="cls_retrieval_dialog_item_name"style="margin-top: 3px;"></div><div id="confirm_info"class="cls_retrieval_dialog_item_value"style="color:red;">Passwords are inconsistent.</div></div><div id="div_activate_copy"class="cls_retrieval_dialog_item"style="height: 20px;line-height: 20px;display: none;margin:10px;"><div id="div_activate_copy_info"class="cls_retrieval_dialog_item_name"style="width: 267px;color: red;margin-left: 155px;">
</div></div><div style="float: left;margin-top: 25px;"id="inputrule_content"><p style="margin-left: 10px;"id="inputrule_name"></p><ul><li></li><li></li><li></li><li></li><li></li><li id="repeat_pwd_tips">密码不应重复此用户帐户的前24个密码</li></ul></div><div style="position: absolute;bottom: 5px;width: 576px;text-align: center;">
<input type="button"id="button_modify_password"class="cls_subpage_content_button"value="confirm"style="width: 128px;"disabled></div></div>`



function getKey(PWD, cab) {
  sdk_getipcparam("/action/get?subject=secretkey", function (res) {
    if (res == false) return;
    $xml = $(res);
    let random = $xml.find('random').text();
    // const iv = $xml.find('iv').text();
    // console.log(`/action/get?subject=secretkey - random=${random}`);
    // 使用
    decimalToHexPromise(Number(random)).then(hex => {
       console.log(hex); // 输出 "ff"
      const aesStr = aesEncrypt(PWD, hex);
      // console.log(`aes加密结果=${aesStr}`);
      cab(aesStr);
    });

  })
}
/**
 * 将随机数转16进制用于加密
 * @param {*} decimalNumber 
 * @returns 
 */
function decimalToHexPromise(decimalNumber) {
  return new Promise((resolve) => {
    // 可能是异步操作
    setTimeout(() => {
      let hexStr = decimalNumber.toString(16);//方法2 ----  //纯16进制
      while (hexStr.length < 32) { hexStr = '0' + hexStr; }
      resolve(hexStr);
    }, 0);
  });
}
const aesEncrypt = (plaintext, hexStr) => {
  // const hexStr = CryptoJS.enc.Utf8.parse(String(random).padEnd(16, '0'));//方法1 ---- 
  // console.log(`hexStr 16進制 random=${hexStr}`);

  const key = CryptoJS.enc.Hex.parse(hexStr);

  const s256 = CryptoJS.SHA256(plaintext).toString();
  const resStr = `${plaintext}@${s256}`

  // 使用ECB模式加密
  const encrypted = CryptoJS.AES.encrypt(resStr, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}




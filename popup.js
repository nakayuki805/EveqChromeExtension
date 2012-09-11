		function showDate () {
		  var dayStr = new Array("日","月","火","水","木","金","土");
		  now = new Date();
		  var timeStr = "";
		  timeStr += now.getHours();
		  timeStr += ":";
		  timeStr += now.getMinutes();
		  timeStr += ":";
		  timeStr += now.getSeconds();
		  document.getElementById("timeArea").innerHTML = timeStr;
		  
		  timeStr = "";
		  timeStr += now.getFullYear();
		  timeStr += "&nbsp;";
		  timeStr += now.getMonth()+1;
		  timeStr += "/";
		  timeStr += now.getDate();
		  timeStr += "&nbsp;(";
		  timeStr += dayStr[now.getDay()];
		  timeStr += ")";
		  document.getElementById("dateArea").innerHTML = timeStr;
		  
		}
				function showForm(spanID,isShow){
			if (typeof isShow =="undefined") {
				isShow = localStorage.getItem(spanID+"_show");
				document.getElementById(spanID+"Show").selectedIndex = ((isShow == "0") ? 1 : 0 );
			};
			if (isShow == 1) {
				document.getElementById(spanID).style.display = "block";
			}
			if (isShow == 0) {
				document.getElementById(spanID).style.display = "none";
			};
			localStorage.setItem(spanID+"_show",isShow);
			
		}
		function showDialog(htmlText){
			innerHeight = document.body.clientHeight;
			innerWidth = document.body.clientWidth;
			backObj = document.getElementById("dialogBack");
			boxObj = document.getElementById("dialogBox");
			backObj.style.visibility = "visible";
			boxObj.style.visibility = "visible";
			boxObj.style.top = (innerHeight/2 - 90)+"px";
			backObj.style.height = window.innerHeight+20+"px";
			backObj.style.width = window.innerWidth+20+"px";
			boxObj.innerHTML = htmlText;
		}
		function closeDialog(){
			backObj = document.getElementById("dialogBack");
			boxObj = document.getElementById("dialogBox");
			backObj.style.visibility = "hidden";
			boxObj.style.visibility = "hidden";
		}
		
		function showEveqStates () {
			//chatx取得
			chatxEveqXml=getXML("http://chatx2.whocares.jp/c/_chatxcond.jsp?rms=everes");
			chatxEveqVisitorNum = simpleTagDataGet(chatxEveqXml,"nUsers");
			chatxEveqRomNum = simpleTagDataGet(chatxEveqXml,"nRoms");
			chatxEveqVisitors = simpleTagDataGet(chatxEveqXml,"users");
			//eqチャット取得
			eqEveqJson=getXML("http://chat.eveq.net/status/num.php");
			eqEveqObj = JSON.parse(eqEveqJson);
			eqEveqVisitorNum = eqEveqObj.userNum;
			eqEveqVisitors = eqEveqObj.users.join(",");

			totalVisitorNum = parseInt(chatxEveqVisitorNum) + parseInt(eqEveqVisitorNum);

			showStr = "<table><tr><td>";
			showStr += "<b><a href='http://everes.chatx2.whocares.jp' target='_blank'>エベ休(chatx):</a></b>在室者:"+chatxEveqVisitorNum+"人";
			if(chatxEveqVisitorNum >0){showStr+="("+chatxEveqVisitors+")";}
			showStr += " 閲覧者:"+chatxEveqRomNum+"人";
			showStr += "</td></tr><tr><td>";
			showStr += "<hr><b><a href='http://chat.eveq.net/' target='_blank'>エベ休(chat.eveq.net):</a></b>在室者:"+eqEveqVisitorNum+"人";
			if(eqEveqVisitorNum >0){showStr+="("+eqEveqVisitors+")";}
			//showStr += " 閲覧者:"+eqEveqRomNum+"人";
			showStr += "</td></tr><tr><td>";
			showStr += "<hr><b>合計:</b>在室者:"+totalVisitorNum+"人";
			showStr += "</td></tr></table>";
			document.getElementById("eq_chatInfoArea").innerHTML = showStr;
		  
		}
		function showEveqInfo () {
			eveqXml=getXML("http://www.eveq.net/xml/eveqinfo_chrome.xml");
			text = simpleTagDataGet(eveqXml,"text");
			document.getElementById("eq_info").innerHTML = text;
		  
		}
		function passFormShow(isShow){
			pfObj = document.getElementById("passForm");
			if (isShow) {
				pfObj.style.display = "block";
				document.bodyForm.enterPass.focus();
			};
			if (!isShow) {
				pfObj.style.display = "none";
				document.bodyForm.enterPass.value="";
			};
		}
		function secretModeAreaShow(isShow){
			smaObj = document.getElementById("secretModeArea");
			smaObj2 = document.getElementById("secretModeArea2");
			if (isShow) {
				smaObj.style.display = "block";
				smaObj2.style.display = "block";
			};
			if (!isShow) {
				smaObj.style.display = "none";
				smaObj2.style.display = "none";
			};
		}
		function plain2des(plaintext,deskey){
			return base64encode(des.encrypt(plaintext,deskey));
		}
		function des2plain(desvalue,deskey){
			return des.decrypt(base64decode(desvalue),deskey);
		}

//

	/*
	 * 公開メモはメモ名そのまま(「メモ１」)秘密メモは接頭詞を(「Sメモ1」)
	 */
	var secretPrefix = "S";
	var memoPrefix = "memo";
	var memoSecretPrefix =secretPrefix+memoPrefix;
		

		function saveMemo(){
			if (bodyForm.isMemoSecret.value == "0") {
				var lsvalue = htmlEscape(bodyForm.memoTitle.value)+"<>"+htmlEscape(bodyForm.memoText.value);
				localStorage.setItem(memoPrefix+bodyForm.memoSelect.value,lsvalue);
			};
		}
		function viewMemo(){
			if(localStorage.getItem(memoPrefix+bodyForm.memoSelect.value)){
				var memoArr = localStorage.getItem(memoPrefix+bodyForm.memoSelect.value).split("<>");
				bodyForm.memoTitle.value = htmlUnEscape(memoArr[0]);
				bodyForm.memoText.value = htmlUnEscape(memoArr[1]);
				bodyForm.isMemoSecret.value = "0";
				bodyForm.memoText.focus();
			}
			else if(localStorage.getItem(memoSecretPrefix+bodyForm.memoSelect.value)){
				var memoArr = localStorage.getItem(memoPrefix+bodyForm.memoSelect.value).split("<>");
				
			}else{
				bodyForm.memoTitle.value = "";
				bodyForm.memoText.value = "";
				if (bodyForm.memoSelect.value.charAt(0) != secretPrefix) {
					bodyForm.isMemoSecret.value = "0";
				}else{
					bodyForm.isMemoSecret.value = "1";
				}
			}
			
		}
		
		function BMedit(){
			showDialog("<input type='button' value='閉じる' onclick='closeDialog()'/>")
		}
		
		window.onkeydown = function (event) {
			if(event.ctrlKey && event.altKey){
				//ctrl+alt+E
				if(event.keyCode == 69){
					passFormShow(true);
				}
				if (event.keyCode == 79) {
					bgObj = chrome.extension.getBackgroundPage();
					secretModeAreaShow(false);
					bgObj.turnEqMode(false);
					localStorage.setItem("isEqMode",0);
				};
			}
		  
		}
		function enter(){
			pass = document.bodyForm.enterPass.value;
			md5pass = MD5_hexhash(pass);
			desedRandomKey = localStorage.getItem("desedRandomKey");
			desed_passwd_check_str = localStorage.getItem("desed_passwd_check_str");
			randomKey = des2plain(desedRandomKey,md5pass);
			passwd_check_str = des2plain(desed_passwd_check_str,randomKey);
			bgObj = chrome.extension.getBackgroundPage();
			if (passwd_check_str == "check") {
				showEveqStates();
				setInterval(showEveqStates,30000);
				showEveqInfo();
				setInterval(showEveqInfo,30000);
				passFormShow(false);
				secretModeAreaShow(true);
				localStorage.setItem("isEqMode",1);
				
				bgObj.turnEqMode(true);
			}else{
				passFormShow(false);
			}
		}
		
		function init () {
			var bodyForm = document.bodyForm;
			
			setInterval(showDate,500);
			
			memoSelect = bodyForm.memoSelect;
			memoNums = 21;
			for(i=0;i<memoNums;i++){
				memoSelect.options[i] = new Option("メモ"+i, "メモ"+i); 
			}
			viewMemo();
			//表示非表示
			showForm("memoForm");
			showForm("eq_usage");
			showForm("eq_chatInfo");
			//showForm("eq_bookmark");
			if (localStorage.getItem("isEqMode") == 1) {
				showEveqStates();
				setInterval(showEveqStates,30000);
				showEveqInfo();
				setInterval(showEveqInfo,30000);
				
				bgObj = chrome.extension.getBackgroundPage();
				passFormShow(false);
				secretModeAreaShow(true);
				bgObj.turnEqMode(true);
			};
			
		}


function passFormHide(){
	passFormShow(false);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("eveqInfoReloadBtn").addEventListener('click', showEveqInfo);
  document.getElementById("chatInfoReloadBtn").addEventListener('click', showEveqStates);
  document.getElementById("enterBtn").addEventListener('click', enter);
  document.getElementById("passFormHideBtn").addEventListener('click', passFormHide);
  document.getElementById("memoForm").addEventListener('keyup', saveMemo);
  document.bodyForm.memoSelect.addEventListener('change', viewMemo);
//表示非表示トグル部分
document.getElementById("eq_chatInfoShow").addEventListener('change', function(){showForm('eq_chatInfo',document.getElementById("eq_chatInfoShow").value)});
document.getElementById("memoFormShow").addEventListener('change', function(){showForm('memoForm',document.getElementById("memoFormShow").value)});
document.getElementById("eq_usageShow").addEventListener('change', function(){showForm('eq_usage',document.getElementById("eq_usageShow").value)});

  init();
});

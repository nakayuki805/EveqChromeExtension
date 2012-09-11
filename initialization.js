function showForm(spanID,isShow){
	if (isShow == 1) {
		document.getElementById(spanID).style.display = "block";
	}
	if (isShow == 0) {
		document.getElementById(spanID).style.display = "none";
	};
	
}
function next (stageN) {
	if (stageN == 1) {
		if (document.evemenConfirm.isEvemen.value == "0") {
			localStorage.setItem("isInitializationFinished",1);
			document.open();
			document.write('<!DOCTYPE HTML><html lang="ja-JP"><head><meta charset="UTF-8"><title>エベメモ初期設定完了</title></head><body style="background-color: #CCFFCC"><h1>設定完了!</h1><p>アイコンをクリックしてメモ機能をご利用ください。<br>オプション画面から再設定できます。</p><input type="button" value="閉じる" onclick="window.close()"/></body></html>');
			
			document.close();
		};
		if (document.evemenConfirm.isEvemen.value == "1") {
			var errMsg = "";
			var confCodeMD5 = "94471f21fb8e545687156f4237d37dfa";
			var confKanjiMD5 = "af11618642e99fd6e1fd29108038631c";
			if(MD5_hexhash(document.evemenConfirm.confirmCode.value) != confCodeMD5){
				errMsg += "質問1:確認コードが違います。\n";
			}
			if(MD5_hexhash(document.evemenConfirm.confirmKanji.value) != confKanjiMD5){
				errMsg += "質問2:漢字が違います。\n"
			}
			if(errMsg != ""){
				alert(errMsg+"エベメンでない場合は「エベメンでない」を選択してください。\nどちらを選択してもメモ機能が使用出来ます。")
			}
			if(errMsg == ""){
				next(2);
			}
		};
	};
	
	if (stageN == 2) {
		sessionStorage.setItem("isEvemen",1);
		location.href = "eveqinit.html";
	
	};
}
function onChangeIsEvemen(){
	showForm('evemenQuestion',document.evemenConfirm.isEvemen.value);
}
function onClickNextBtn(){
	next(1);
}

document.addEventListener('DOMContentLoaded', function () {
  document.evemenConfirm.isEvemen.addEventListener('change', onChangeIsEvemen);
  document.evemenConfirm.nextBtn.addEventListener('click', onClickNextBtn);
  
});

if (sessionStorage.getItem("isEvemen") != 1) {
		location.href = "initialization.html";
};
function next(stageN){
	if (stageN == 1) {
		var passForm = document.passForm;
		var pass1 = passForm.passwd1.value;
		var pass2 = passForm.passwd2.value;
		var pass3 = passForm.passwd3.value;
		if (pass1 == "") {
			alert("パスワードを入力してください");
		}else if (pass1 != pass2) {
			alert("パスワードが一致しません");
		}else if ((pass3 != "") && (pass1 != pass3)) {
			alert("パスワードが一致しません");
		}else{
			next(2);
		}
	};
	if (stageN == 2) {
		//ランダムキー作成
		var randomKey = "";
		for( i = 0; i < 20; i ++ ){
			text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			randomKey = randomKey + text.charAt( Math.round( Math.random( ) * ( 10 + 26 + 26 - 1 ) ) );
		}
		md5pass = MD5_hexhash(document.passForm.passwd1.value);
		desedRandomKey = base64encode(des.encrypt( randomKey,md5pass));
		localStorage.setItem("desedRandomKey",desedRandomKey);
		localStorage.setItem("desed_passwd_check_str",base64encode(des.encrypt("check",randomKey)));
		localStorage.setItem("isInitializationFinished",1);
		document.open();
		document.write('<!DOCTYPE HTML><html lang="ja-JP"><head><meta charset="UTF-8"><title>エベメモ初期設定完了</title></head><body style="background-color: #CCFFCC"><h1>設定完了!</h1><p>緑のEVアイコンをクリックするとメモが出てきます。メモを表示した状態でCtrl+Eを押すとパスワード入力画面が出てきてエベ休の人数を表示するモードに入ります。抜けるときはCtrl+Alt+O<br>オプション画面から再設定できます。<!--(その際データーが失われます。)--></p><input type="button" value="閉じる"  id="closeBtn"/></body></html>');
		
		document.close();
		document.getElementById("closeBtn").addEventListener('click', onClickCloseBtn);
		
	};
	
}

function onClickNextBtn(){
	next(1);
}
function onClickCloseBtn(){
	window.close();
}
document.addEventListener('DOMContentLoaded', function () {
  document.passForm.nextBtn.addEventListener('click', onClickNextBtn);
});


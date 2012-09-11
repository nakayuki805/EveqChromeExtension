	
function initSetting(){
	if(confirm("本当に初期化しますか？データーは消えてしまいます")){
		localStorage.setItem("isInitializationFinished",0);
		location.href = "initialization.html";
	}
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("initBtn").addEventListener('click', initSetting);
});

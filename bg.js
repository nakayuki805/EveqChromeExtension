	//very simple xml reader, localstrage, cookie, and write document

//output
function outHtml(s){
	document.getElementById("outarea").innerHTML = s;
}
//getXML
function getXML(xmlurl){
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", xmlurl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;	
}
//too simple get xml tag data
function simpleTagDataGet(xmltext,tagname){
	xmltext += "";
	tagstr = "<"+tagname+">";
	tagleng = tagstr.length;
	endtagstr = "</"+tagname+">";
	findres = xmltext.indexOf(tagstr,0);
	resdata = "";
	if(findres != -1){
		endfindres = xmltext.indexOf(endtagstr,findres);
		resdata = xmltext.substring(findres+tagleng,endfindres);
	}
	return resdata;
}
function htmlEscape(s){
	s=s.replace(/&/g,'&amp;');
	s=s.replace(/>/g,'&gt;');
	s=s.replace(/</g,'&lt;');
	return s;
}
function htmlUnEscape(s){
	s=s.replace(/&amp;/g,'&');
	s=s.replace(/&gt;/g,'>');
	s=s.replace(/&lt;/g,'<');
	return s;
}
//EveqExtLib -- END

	var EqIntervalID;
	
	function initialization(){
			window.open("initialization.html");
			
	}
	if(!localStorage.getItem("isInitializationFinished")){
			initialization();
	}
		
	function showEqNumBadge(){
		chatxEveqXml=getXML("http://chatx2.whocares.jp/c/_chatxcond.jsp?rms=everes");
		eqEveqJson=getXML("http://chat.eveq.net/status/num.php");
		eqEveqObj = JSON.parse(eqEveqJson);
		eveqVisitorNum = parseInt(simpleTagDataGet(chatxEveqXml,"nUsers"));
		eveqVisitorNum = eveqVisitorNum + parseInt(eqEveqObj.userNum);
		eveqVisitorNum = (eveqVisitorNum != 0) ? eveqVisitorNum : "";
		eveqVisitorNum = eveqVisitorNum.toString();
		chrome.browserAction.setBadgeText({text : eveqVisitorNum});

		if (localStorage.getItem("isEqMode") == 0) {
			turnEqMode(false);
		};
	}
	
	function turnEqMode(isEq){
		if(isEq == true){
			EqIntervalID = setInterval(showEqNumBadge,30000);
			showEqNumBadge();
		}
		if (isEq == false) {
			clearInterval(EqIntervalID);
			chrome.browserAction.setBadgeText({text : ""});
		};
	}
	if (localStorage.getItem("isEqMode") == 1) {
		turnEqMode(true);
	};
	

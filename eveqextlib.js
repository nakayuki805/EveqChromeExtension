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
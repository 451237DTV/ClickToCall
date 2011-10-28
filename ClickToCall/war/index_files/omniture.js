/* SiteCatalyst code version: H.19.4.
Copyright 1997-2009 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
var Reporting = Reporting ? Reporting : new Object();
Reporting.PageData = Reporting.PageData ? Reporting.PageData : new Object();
Reporting.pageReportSent = false;
Reporting.getReportingObject = function (accountName) {
var s_account = accountName ? accountName : Reporting.accountId;
var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,directv.com"
s.linkLeaveQueryString=false

//changed props for link tracking
s.linkTrackVars="prop41,prop42,prop43,prop44"
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
s.channel="www.directv.com";

s.successfulSearchEvent 		= 'event1';
s.nullSearchEvent 				= 'event2';
s.searchTermVariable		    = 'eVar1';

s.dstStart="04/14/2010";
s.dstEnd="11/07/2010";

function s_doPlugins(s) {

	if (document.location.hostname.indexOf('www') != 0) {
		s.channel = document.location.hostname;
		s.prop30=s.channel;
	} 
	
    if (typeof(s.prop7) === 'undefined' || s.prop7 == null || s.prop7 === '') {
        if (typeof(Reporting.PageData.userType) === 'undefined' || Reporting.PageData.userType == null || Reporting.PageData.userType === '') {
            Reporting.PageData.userType = 'Prospect';
        }
    
        s.prop7 = Reporting.PageData.userType;
        
        if (s.linkTrackVars == null || s.linkTrackVars === '' || s.linkTrackVars == 'None') {
            s.linkTrackVars = "prop7";
        } else {
            s.linkTrackVars += ",prop7";
        }
    }
	
	/* Add calls to plugins here */	
    if (!Reporting.pageReportSent) {
        if (!s.campaign) {
            s.campaign=s.getQueryParam('CMP,fb_ref');
            if (s.campaign) {
                s.prop29=s.campaign;
                s.eVar34=(s.getQueryParam('ATT')) ? s.getQueryParam('ATT'): s.getQueryParam('HBX_PK');
                s.pageURL=s.manageQueryParam('CMP',1,1);
            }
        }
        
        s.clickThruQuality('CMP','event10','event11');
        s.eVar35 = s.crossVisitParticipation(s.campaign,'s_cmp','30','5','>','purchase');
        if(s.getQueryParam('DNAOMN'))
        	s.eVar41 = s.getQueryParam('DNAOMN');
        if(s.getQueryParam('CardTag'))
        	s.eVar56 = s.getQueryParam('CardTag');
	var mobileUser = s.getQueryParam('mobileUser');        	
	if(mobileUser == 'true') {
		s.eVar57 = 'Mobile Visit';
		s.prop57=s.eVar57;
	}
    }


	if(!s.eVar2)
		s.eVar2=s.getQueryParam('ICID');
	
	if(s.eVar1) 
		s.eVar1=s.eVar1.toLowerCase()

	/*
	 * Do not refire search event if the same search term
	 * passed in twice
	*/
	var t_search=s.getValOnce(s[s.searchTermVariable],'ev1',0)
	if(t_search=='')
	{	
		var a=s.split(s.events,',');
		var e='';
		for(var i = 0; i < a.length ; i++ )
		{
			if(a[i] == s.successfulSearchEvent)
				continue;
			else if(a[i] == s.nullSearchEvent)
				continue;
			else
				e += a[i]?a[i]+',':a[i];
		}
		s.events=e.substring(0,e.length-1);
	}
	else
	{
		if(!s.products)
			s.products=';';
	}

	if (s.channel)
		s.eVar9=s.channel;
	if (s.prop7)
		s.eVar10=s.prop7;
	if (s.prop8)
		s.eVar11=s.prop8;

	//Link Tracking Configuration Plugin
    if (!s.overrideLinkTracking) {
        s.hbx_lt = "auto" // manual, auto
        s.setupLinkTrack("prop41,prop42,prop43,prop44","SC_LINKS");
    }

    /* Channel Manager */
    /*
    var o = s.channelManager(true);

    if (typeof o != 'undefined' && o && o.channel) {
        if (o.channel == 'Natural')
            o.channel = 'Natural Search';
        if (o.channel == 'Paid')
            o.channel = 'Paid Search';
        if (o.channel.indexOf('Other') == 0) 
            o.channel = 'Other';
        s.eVar38=o.channel;
    }
    */
    
s.tnt=s.trackTNT();
    
/**************TIME PARTING PLUGIN BEGIN*********/

s.prop53=s.TimeParting('h','-8');
s.prop54=s.TimeParting('d','-8');
s.prop55=s.TimeParting('w','-8');
s.eVar55=s.TimeParting('h','-8');

/**************TIME PARTING PLUGIN BEGIN*********/

/**************DAYS SINCE LAST VISIT PLUGIN BEGIN*********/

s.prop52=s.getDaysSinceLastVisit('s_lv');
s.eVar53=s.getDaysSinceLastVisit('s_lv');
     
}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

//Adding Link Tracking Plugin
/*
 * Plugin: setupLinkTrack 2.0 - return links for HBX-based link 
 *         tracking in SiteCatalyst (requires s.split and s.apl)
 */
s.setupLinkTrack=new Function("vl","c",""
+"var s=this;var l=s.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s."
+"c_r(c);if(vl&&cv!=''){cva=s.split(cv,'^^');vla=s.split(vl,',');for("
+"x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s.c_w(c,'',0);if(!s.e"
+"o&&!s.lnk)return '';o=s.eo?s.eo:s.lnk;y=s.ot(o);n=s.oid(o);if(s.eo&"
+"&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"
+":o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);}for(i=0;i<4;i++"
+")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"
+"ase()!='area')o=o.parentElement;}b=s._LN(o);o.lid=b[0];o.lpos=b[1];"
+"if(s.hbx_lt&&s.hbx_lt!='manual'){if((o.tagName&&s._TL(o.tagName)=='"
+"area')){if(!s._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"
+"id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s._IL(o.lpos))"
+"o.lpos=o.coords}else{if(s._IL(o.lid)<1)o.lid=s._LS(o.lid=o.text?o.t"
+"ext:o.innerText?o.innerText:'');if(!s._IL(o.lid)||s._II(s._TL(o.lid"
+"),'<img')>-1){h=''+o.innerHTML;bu=s._TL(h);i=s._II(bu,'<img');if(bu"
+"&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"
+";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l"
+"=s.linkName?s.linkName:s._hbxln(h);t=s.linkType?s.linkType.toLowerC"
+"ase():s.lt(h);oc=o.onclick?''+o.onclick:'';cv=s.pageName+'^^'+o.lid"
+"+'^^'+s.pageName+' | '+(o.lid=o.lid?o.lid:'no &lid')+'^^'+o.lpos;if"
+"(t&&(h||l)){cva=s.split(cv,'^^');vla=s.split(vl,',');for(x in vla)s"
+"._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if(!t&&oc.indexOf('.tl(')<"
+"0){s.c_w(c,cv,0);}else return ''");
s._IL=new Function("a","var s=this;return a!='undefined'?a.length:0");
s._II=new Function("a","b","c","var s=this;return a.indexOf(b,c?c:0)"
);
s._IS=new Function("a","b","c",""
+"var s=this;return b>s._IL(a)?'':a.substring(b,c!=null?c:s._IL(a))");
s._LN=new Function("a","b","c","d",""
+"var s=this;b=a.href;b+=a.name?a.name:'';c=s._LVP(b,'lid');d=s._LVP("
+"b,'lpos');r"
+"eturn[c,d]");
s._LVP=new Function("a","b","c","d","e",""
+"var s=this;c=s._II(a,'&'+b+'=');c=c<0?s._II(a,'?'+b+'='):c;if(c>-1)"
+"{d=s._II(a,'&',c+s._IL(b)+2);e=s._IS(a,c+s._IL(b)+2,d>-1?d:s._IL(a)"
+");return e}return ''");
s._LS=new Function("a",""
+"var s=this,b,c=100,d,e,f,g;b=(s._IL(a)>c)?escape(s._IS(a,0,c)):esca"
+"pe(a);b=s._LSP(b,'%0A','%20');b=s._LSP(b,'%0D','%20');b=s._LSP(b,'%"
+"09','%20');c=s._IP(b,'%20');d=s._NA();e=0;for(f=0;f<s._IL(c);f++){g"
+"=s._RP(c[f],'%20','');if(s._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"
+"rn unescape(b)");
s._LSP=new Function("a","b","c","d","var s=this;d=s._IP(a,b);return d"
+".join(c)");
s._IP=new Function("a","b","var s=this;return a.split(b)");
s._RP=new Function("a","b","c","d",""
+"var s=this;d=s._II(a,b);if(d>-1){a=s._RP(s._IS(a,0,d)+','+s._IS(a,d"
+"+s._IL(b),s._IL(a)),b,c)}return a");
s._TL=new Function("a","var s=this;return a.toLowerCase()");
s._NA=new Function("a","var s=this;return new Array(a?a:0)");
s._hbxm=new Function("m","var s=this;return (''+m).indexOf('{')<0");
s._hbxln=new Function("h","var s=this,n=s.linkNames;if(n)return s.pt("
+"n,',','lnf',h);return ''");

//end of link tracking

/*
 * Plugin (H code): manageQueryParam 1.1 - swap parameters in query string 
 *  p=param to identify
 *  w=swap flag (0 or 1)
 *  e=encode/decode flag for search center (0 or 1)
 *  u=url to manage (optional - default will get current url)
 */
s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';qv=s.epa("
+"qv);qv=unescape(qv);qv=unescape(qv);i=qv.indexOf('|');if(i>-1){x=qv"
+".substring(0,i);qv=escape(x)+qv.substring(i);}else{qv=escape(qv)}qp"
+"=qp.substring(0,y+1)+qv;}if(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b"
+")qs='?'+qp+'&'+b;else	qs='?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if"
+"(b)qs='?'+qp+'&'+b;else	qs='?'+qp;return u+qs");

/*
 * Plugin clickThruQuality v1.0 
 */
/*********************************************************************
* Function clickThruQuality(scp,tcth_ev,cp_ev,cff_ev,cf_th): 
*      
*
*     scp 	= Query String Parameter(s)
*     tcth_ev 	= Total Click-Throughs
*     cp_ev 	= Click Past
*
* Returns:
*     - returns null
*     
*********************************************************************/
s.clickThruQuality =new Function("scp","tcth_ev","cp_ev","cff_ev","cf_th",""
+"var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
+"ts+',':'';if(s.getQueryParam&&s.getQueryParam(scp)){s.events=ev+tct"
+"h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
+",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
+"_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
+"+cp_ev;}}}");

/*********************************************************************
* Function p_fo(x,y): Ensures the plugin code is fired only on the 
*      first call of do_plugins
*
*
* Returns:
*     - 1 if first instance on firing
*     - 0 if not first instance on firing
*********************************************************************/
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*                                                                                        
 * Plugin: s.crossVisitParticipation : 1.2 - stacks values from 
 * specified variable in cookie and returns value                                                   
 */                                                                                       
                                                                                                                                                                                  
/* crossVisitParticipation Example: 1.2                                                  
 *                                                                                        
 * List of Parameters:                                                                    
 * vu-variable to stack values from                                                       
 * cn-name of cookie to stack values in                                                   
 * ex-expiration of variable value in days                                                   
 * ct-number of distinct values to store in cookie                                        
 * dl-delimiter to display in variable                                                         
 * ev-success event(s) which clear cookie (use comma separated list)                        
 *                                                                                        
 */
                                                                                                        
s.crossVisitParticipation = new Function("v","cn","ex","ct","dl","ev",""                          
+"var s=this;var ay=s.split(ev,',');for(var u=0;u<ay.length;u++){if(s"                     
+".events&&s.events.indexOf(ay[u])!=-1){s.c_w(cn,'');return '';}}if(!"                     
+"v||v=='')return '';var arry=new Array();var a=new Array();var c=s.c"                     
+"_r(cn);var g=0;var h=new Array();if(c&&c!='') arry=eval(c);var e=ne"                     
+"w Date();e.setFullYear(e.getFullYear()+5);if(arry.length>0&&arry[ar"                     
+"ry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getTime()];el"                     
+"se arry[arry.length]=[v, new Date().getTime()];var data=s.join(arry"                     
+",{delim:',',front:'[',back:']',wrap:'\\''});var start=arry.length-c"                     
+"t < 0?0:arry.length-ct;s.c_w(cn,data,e);for(var x=start;x<arry.leng"                     
+"th;x++){var diff=Math.round(new Date()-new Date(parseInt(arry[x][1]"                     
+")))/86400000;if(diff<ex){h[g]=arry[x][0];a[g++]=arry[x];}}var r=s.j"                     
+"oin(h,{delim:dl});return r;");

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * s.join: 1.0 - s.join(v,p)
 *
 *  v - Array (may also be array of array)
 *  p - formatting parameters (front, back, delim, wrap)
 *
 */

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/* 
 * ChannelManager - v1.1
 */ 
s.___se="{'Paid Search':{p:['KNC|'Sina - China':{^q=|~g`.cn/$?client="
+"aff-sina>,'National Directory':{^;=|~$.NationalDirectory*>,'eerstek"
+"euze.nl':{^Terms=|~+.eerstekeuze.nl/>,'Excite - Netscape':{^general"
+"=','$=|~excite$.netscape*','$excite.netscape*>,'Andromeda Search':{"
+"^<=|~p-$.virtualave.net>,'So-net':{^MT=|~so-net.$.goo.ne.jp>,'InfoS"
+"eek - Japan':{^;=','qt=|~$.m.infoseek.co.jp>,'Goo (Japan)':{^MT=|~$"
+".mobile.goo.ne.jp>,'AllSearchEngines':{^;=s|~all$engines.co.uk>,'zo"
+"eken.nl':{^;=|~+.zoeken.nl/>,'Northern Light':{^qr=|~www.northernli"
+"ght*>,'Biglobe':{^q=|~$.biglobe.ne.jp>,'track.nl':{^qr=|~+.track.nl"
+"/>,'Baidu':{^wd=','s=|~+.baidu*>,'3721*':{^p=|~+.3721*/>,'Galaxy':{"
+"^|~galaxy.tradewave*>,'G` - Norway (Startsiden)':{^q=|~g`.startside"
+"n.no>,'NetSearch':{^Terms=','$=|~net$voyager*','net$.org>,'au.Anzwe"
+"rs':{^p=|~au.anzwers.y%*>,'MSN - Latin America':{^q=|~$.latam.msn*>"
+",'Searchteria':{^p=|~ad.$teria.co.jp>,'FreshEye':{^ord=','kw=|~$.fr"
+"esheye*>,'Metacrawler':{^general=','/$/web/|~www.metacrawler*','$.m"
+"etacrawler*>,'Y%! - Austria':{^p=|~at.$.y%*>,'Y%! - Spanish (US : T"
+"elemundo)':{^p=|~telemundo.y%*','espanol.$.y%*>,'Business*':{^;=|~b"
+"usiness*/$>,'Y%! - Switzer#':{^p=|~ch.$.y%*>,'Y%! - Fin#':{^p=|~fi."
+"$.y%*>,'Dino Online':{^;=|~www.dino-online.de>,'Internet Times':{^$"
+"=',';=|~internet-times*>,'TheYellowPages':{^$=|~theyellowpages*>,'W"
+"eb-Search':{^q=|~www.web-$*>,'Y%! - Malaysia':{^p=|~malaysia.y%*','"
+"malaysia.$.y%*>,'WebCrawler':{^$Text=','$=|~www.webcrawler*>,'Monst"
+"er Crawler':{^qry=|~monstercrawler*>,'Sina - Hong Kong':{^word=|~g`"
+".sina*.hk>,'Sina - Taiwan':{^kw=|~g`.sina*.tw>,'Y%Japan - Mobile':{"
+"^p=|~mobile.y%.co.jp>,'Livedoor - Mobile':{^q=','<=|~dir.m.livedoor"
+"*>,'Blue Window':{^q=','qry=|~$.bluewin.ch','$.bluewindow.ch>,'Gene"
+"ral Search':{^<=|~general$*>,'InternetTrash':{^words=|~internettras"
+"h*>,'MSN - United Kingdom':{^q=|~uk.$.msn*','msn.co.uk>,'Y%! - Chin"
+"ese (US)':{^p=|~chinese.y%*>,'MSN - Singapore':{^q=|~$.msn*.sg>,'MS"
+"N - Republic of the Phlippines':{^q=|~$.msn*.ph>,'MSN - Taiwan':{^q"
+"=|~$.msn*.tw>,'MSN - Turkey':{^q=|~$.msn*.tr>,'MSN - People\\'s Rep"
+"ublic of China':{^q=|~$.msn*.cn>,'MSN - Malaysia':{^q=|~$.msn*.my>,"
+"'MSN - Hong Kong S.A.R.':{^q=|~$.msn*.hk>,'MSN - Brazil':{^q=|~$.ms"
+"n*.br>,'G` @ EZweb':{^;=|~ezsch.ezweb.ne.jp>,'AltaVista - Nether#s'"
+":{^q=|~nl.altavista*>,'AltaVista - Spain':{^q=','r=|~es.altavista*>"
+",'AltaVista - Italy':{^q=','r=|~it.altavista*>,'AltaVista - Canada'"
+":{^q=|~ca.altavista*>,'AltaVista - Switzer#':{^q=','r=|~ch.altavist"
+"a*>,'AltaVista - France':{^q=','r=|~fr.altavista*>,'AltaVista - Uni"
+"ted Kingdom':{^q=','r=|~uk.altavista*>,'AltaVista - Sweden':{^q=','"
+"r=|~se.altavista*>,'DejaNews':{^QRY=|~www.dejanews*>,'Excite':{^/$/"
+"web/','qkw=|~msxml.excite*>,'Globe Crawler':{^$=|~globecrawler*>,'H"
+"otBot':{^MT=',';=|~hotbot.lycos*>,'InfoSeek':{^qt=|~www.infoseek*',"
+"'infoseek.go*>,'MSN - South Africa':{^q=|~$.msn.co.za>,'MSN - Isrea"
+"l':{^q=|~$.msn.co.il>,'MSN - Japan':{^q=|~$.msn.co.jp>,'MSN - Canad"
+"a':{^q=|~sympatico.msn.ca','$.fr.msn.ca>,'MSN - Korea':{^q=',';=|~$"
+".msn.co.kr>,'Search City':{^$=','<=|~$city.co.uk>,'Search Viking':{"
+"^$=|~$viking*>,'Thunderstone':{^q=|~thunderstone*>,'Web Wombat (Au."
+")':{^I=','ix=|~webwombat*.au>,'AltaVista - Norway':{^q=|~no.altavis"
+"ta*>,'AltaVista - Denmark':{^q=|~dk.altavista*>,'MSN - India (Engli"
+"sh)':{^q=|~$.msn.co.in>,'MSN - Indonesia (English)':{^q=|~$.msn.co."
+"id>,'Nifty':{^Text=|~$.nifty*>,'ANZWERS':{^;=|~www.anzwers*>,'Buyer"
+"sIndex':{^;=|~buyersindex*>,'CNET Search*':{^q=|~cnet.$*>,'Dmoz':{^"
+"$=|~$.dmoz*','dmoz*>,'Final Search':{^pattern=|~final$*>,'FullWebin"
+"fo Directory & Search Engine':{^k=','s=|~fullwebinfo*>,'Go (Infosee"
+"k)':{^qt=|~infoseek.go*>,'GoEureka':{^q=','key=|~goeureka*.au>,'Liv"
+"e*':{^q=|~$.live*>,'QuestFinder':{^s=|~questfinder*','questfinder.n"
+"et>,'SearchHound':{^?|~$hound*>,'TopFile*':{^;=|~www.topfile*>,'Sin"
+"a - North America':{^$_key=|~g`.sina*>,'AOL* Search':{^;=|~$.aol*',"
+"'$.aol.ca>,'ByteSearch':{^$=','q=|~byte$*>,'ComFind':{^|~debriefing"
+"*','allbusiness*find*>,'Dictionary*':{^term=',';=|~Dictionary*','Di"
+"ctionary>,'ilse.nl':{^$_for=|~$.ilse.nl>,'Infoseek - Japan':{^qt=|~"
+"infoseek.co.jp>,'InfoSeek':{^qt=|~infoseek.co.uk>,'Rex Search':{^te"
+"rms=|~rex-$*','rex-$*>,'Search King':{^$term=','<=|~$king*>,'Search"
+"alot':{^;=','q=|~$alot*>,'Web Trawler':{^|~webtrawler*>,'Y%! - Asia"
+"':{^p=|~asia.y%*','asia.$.y%*>,'Y%! - Kids':{^p=|~kids.y%*','kids.y"
+"%*/$>,'SmartPages*':{^QueryString=|~smartpages*>,'MetaGopher':{^;=|"
+"~metagopher*>,'Froute':{^k=|~item.froute.jp','$.froute.jp>,'All The"
+" Web':{^;=','q=|~alltheweb*>,'DirectHit':{^qry=','q=|~directhit*>,'"
+"Excite Canada':{^$=','q=|~www.excite.ca','$.excite.ca>,'Excite - Ge"
+"rmany':{^$=','q=|~www.excite.de>,'Excite - Dutch':{^$=|~nl.excite*>"
+",'G` - Australia':{^q=|~g`*.au>,'G` - Brasil':{^q=|~g`*.br>,'InfoSp"
+"ace':{^QKW=','qhqn=|~infospace*>,'InfoTiger':{^qs=|~infotiger*>,'Lo"
+"okSmart':{^key=','qt=|~looksmart*','looksmart.co.uk>,'Lycos':{^;=|~"
+"www.lycos*','$.lycos*>,'Excite - Australia':{^$=','key=|~excite*.au"
+">,'Metacrawler - Germany':{^qry=|~216.15.219.34','216.15.192.226>,'"
+"MSN - Nether#s':{^q=|~$.msn.nl>,'MSN - Belgium':{^q=|~$.msn.be>,'MS"
+"N - Germany':{^q=|~$.msn.de>,'MSN - Austria':{^q=|~$.msn.at>,'MSN -"
+" Spain':{^q=|~$.msn.es>,'MSN - Italy':{^q=|~$.msn.it>,'MSN - France"
+"':{^q=|~$.msn.fr>,'MSN - Switzer#':{^q=|~$.msn.ch','fr.ch.msn*>,'MS"
+"N - Sweden':{^q=|~$.msn.se>,'RageWorld*':{^$=|~rageworld*>,'ToggleB"
+"ot!':{^$=',';=|~togglebot*>,'Web Wombat':{^I=','ix=|~webwombat*>,'M"
+"SN - Norway':{^q=|~$.msn.no>,'MSN - Denmark':{^q=|~$.msn.dk>,'G` - "
+"Nicaragua':{^q=|~g`*.ni>,'G` - Antigua and Barbuda':{^q=|~g`*.ag>,'"
+"G` - Anguilla':{^q=|~g`*.ai>,'G` - Taiwan':{^q=|~g`*.tw>,'G` - Ukra"
+"ine':{^q=|~g`*.ua>,'G` - Namibia':{^q=|~g`*.na>,'G` - Uruguay':{^q="
+"|~g`*.uy>,'G` - Ecuador':{^q=|~g`*.ec>,'G` - Libya':{^q=|~g`*.ly>,'"
+"G` - Norfolk Is#':{^q=|~g`*.nf>,'G` - Tajikistan':{^q=|~g`*.tj>,'G`"
+" - Ethiopia':{^q=|~g`*.et>,'G` - Malta':{^q=|~g`*.mt>,'G` - Philipp"
+"ines':{^q=|~g`*.ph>,'G` - Hong Kong':{^q=|~g`*.hk>,'G` - Singapore'"
+":{^q=|~g`*.sg>,'G` - Jamaica':{^q=|~g`*.jm>,'G` - Paraguay':{^q=|~g"
+"`*.py>,'G` - Panama':{^q=|~g`*.pa>,'G` - Guatemala':{^q=|~g`*.gt>,'"
+"G` - Isle of Gibraltar':{^q=|~g`*.gi>,'G` - El Salvador':{^q=|~g`*."
+"sv>,'G` - Colombia':{^q=|~g`*.co>,'G` - Turkey':{^q=|~g`*.tr>,'G` -"
+" Peru':{^q=|~g`*.pe>,'G` - Afghanistan':{^q=|~g`*.af>,'G` - Malaysi"
+"a':{^q=|~g`*.my>,'G` - Mexico':{^q=|~g`*.mx>,'G` - Viet Nam':{^q=|~"
+"g`*.vn>,'G` - Nigeria':{^q=|~g`*.ng>,'G` - Nepal':{^q=|~g`*.np>,'G`"
+" - Solomon Is#s':{^q=|~g`*.sb>,'G` - Belize':{^q=|~g`*.bz>,'G` - Pu"
+"erto Rico':{^q=|~g`*.pr>,'G` - Oman':{^q=|~g`*.om>,'G` - Cuba':{^q="
+"|~g`*.cu>,'G` - Bolivia':{^q=|~g`*.bo>,'G` - Bahrain':{^q=|~g`*.bh>"
+",'G` - Bangladesh':{^q=|~g`*.bd>,'G` - Cambodia':{^q=|~g`*.kh>,'G` "
+"- Argentina':{^q=|~g`*.ar>,'G` - Brunei':{^q=|~g`*.bn>,'G` - Fiji':"
+"{^q=|~g`*.fj>,'G` - Saint Vincent and the Grenadine':{^q=|~g`*.vc>,"
+"'G` - Qatar':{^q=|~g`*.qa>,'MSN - Ire#':{^q=|~$.msn.ie>,'G` - Pakis"
+"tan':{^q=|~g`*.pk>,'G` - Dominican Republic':{^q=|~g`*.do>,'G` - Sa"
+"udi Arabia':{^q=|~g`*.sa>,'G` - Egypt':{^q=|~g`*.eg>,'G` - Belarus'"
+":{^q=|~g`*.by>,'Biglobe':{^extrakey=|~$.kbg.jp>,'AltaVista':{^q=','"
+"r=|~altavista.co>,'AltaVista - Germany':{^q=','r=|~altavista.de>,'A"
+"OL - Germany':{^q=|~suche.aol.de','suche.aolsvc.de>,'Excite - Japan"
+"':{^$=','s=|~excite.co.jp>,'Fansites*':{^q1=|~fansites*>,'FindLink'"
+":{^|~findlink*>,'GoButton':{^|~gobutton*>,'G` - India':{^q=|~g`.co."
+"in>,'G` - New Zea#':{^q=|~g`.co.nz>,'G` - Costa Rica':{^q=|~g`.co.c"
+"r>,'G` - Japan':{^q=|~g`.co.jp>,'G` - United Kingdom':{^q=|~g`.co.u"
+"k>,'G` - Yugoslavia':{^q=|~g`.co.yu>,'Overture':{^Keywords=|~overtu"
+"re*>,'Hotbot - United Kingdom':{^;=|~hotbot.co.uk>,'Loquax Open Dir"
+"ectory':{^$=|~loquax.co.uk>,'MSN - Mexico':{^q=|~t1msn*.mx','$.prod"
+"igy.msn*>,'Netscape Search':{^;=','$=|~netscape*>,'Y%! - Philippine"
+"s':{^p=|~ph.y%*','ph.$.y%*>,'Y%! - Thai#':{^p=|~th.y%*','th.$.y%*>,"
+"'Y%! - Argentina':{^p=|~ar.y%*','ar.$.y%*>,'Y%! - Indonesia':{^p=|~"
+"id.y%*','id.$.y%*>,'Y%! - Hong Kong':{^p=|~hk.y%*','hk.$.y%*>,'Y%! "
+"- Russia':{^p=|~ru.y%*','ru.$.y%*>,'Y%! - Canada':{^p=|~ca.y%*','ca"
+".$.y%*>,'Y%! - Taiwan':{^p=|~tw.y%*','tw.$.y%*>,'Y%! - Catalan':{^p"
+"=|~ct.y%*','ct.$.y%*>,'Y%! - Canada (French)':{^p=|~qc.y%*','cf.$.y"
+"%*>,'Y%! - China':{^p=|~cn.y%*','$.cn.y%*>,'Y%! - India':{^p=|~in.y"
+"%*','in.$.y%*>,'Y%! - Brazil':{^p=|~br.y%*','br.$.y%*>,'Y%! - Korea"
+"':{^p=|~kr.y%*','kr.$.y%*>,'Y%! - Australia':{^p=|~au.y%*','au.$.y%"
+"*>,'Y%! - Mexico':{^p=|~mx.y%*','mx.$.y%*>,'Y%! - Singapore':{^p=|~"
+"sg.y%*','sg.$.y%*>,'Y%! - Denmark':{^p=|~dk.y%*','dk.$.y%*>,'Y%! - "
+"Germany':{^p=|~de.y%*','de.$.y%*>,'Y%! - UK and Ire#':{^p=|~uk.y%*'"
+",'uk.$.y%*>,'Y%! - Sweden':{^p=|~se.y%*','se.$.y%*>,'Y%! - Spain':{"
+"^p=|~es.y%*','es.$.y%*>,'Y%! - Italy':{^p=|~it.y%*','it.$.y%*>,'Y%!"
+" - France':{^p=|~fr.y%*','fr.$.y%*>,'Y%! - Norway':{^p=|~no.y%*','n"
+"o.$.y%*>,'G` - Virgin Is#s':{^q=|~g`.co.vi>,'G` - Uzbekiston':{^q=|"
+"~g`.co.uz>,'G` - Thai#':{^q=|~g`.co.th>,'G` - Israel':{^q=|~g`.co.i"
+"l>,'G` - Korea':{^q=|~g`.co.kr>,'Y%! - Nether#s':{^p=|~nl.y%*','nl."
+"$.y%*>,'Y%! - New Zea#':{^p=|~nz.y%*','nz.$.y%*>,'G` - Zambia':{^q="
+"|~g`.co.zm>,'G` - South Africa':{^q=|~g`.co.za>,'G` - Zimbabwe':{^q"
+"=|~g`.co.zw>,'Y%! - Viet Nam':{^p=|~vn.y%*','vn.$.y%*>,'G` - Uganda"
+"':{^q=|~g`.co.ug>,'G` - Indonesia':{^q=|~g`.co.id>,'G` - Morocco':{"
+"^q=|~g`.co.ma>,'G` - Lesotho':{^q=|~g`.co.ls>,'G` - Kenya':{^q=|~g`"
+".co.ke>,'G` - Cook Is#s':{^q=|~g`.co.ck>,'G` - Botswana':{^q=|~g`.c"
+"o.bw>,'G` - Venezuela':{^q=|~g`.co.ve>,'BeGuide*':{^$=|~beguide*>,'"
+"dog*':{^$=|~doginfo*>,'Dogpile':{^q=','/$/web/|~dogpile*>,'Fireball"
+"':{^q=',';=|~fireball.de>,'FishHoo!':{^;=|~fishhoo*>,'InfoSeek - Ge"
+"rmany':{^qt=',';=|~infoseek.de>,'Lycos - United Kingdom':{^;=|~lyco"
+"s.co.uk>,'MetaDog*':{^$=','<=|~metapro*','metadog*>,'TooCool':{^?|~"
+"toocool*>,'Y%! - Japan':{^p=','va=|~y%.co.jp','$.y%.co.jp>,'Cafesta"
+"':{^<=','<s=|~cafesta*>,'Oh! New? Mobile':{^k=|~ohnew.co.jp>,'Chubb"
+"a':{^arg=|~chubba*>,'CyberBritain*':{^qry=|~hermia*','cyberbritain."
+"co.uk>,'GeoBoz Search':{^$=|~geoboz*>,'Go2net Metacrawler':{^genera"
+"l=|~go2net*>,'Tiscali':{^key=|~tiscali.it>,'TooZen':{^|~toozen*>,'W"
+"AKWAK':{^MT=|~wakwak*>,'Webalta':{^q=|~webalta.ru>,'MSN LiveSearch "
+"Mobile':{^q=|~m.live*>,'AOL - United Kingdom':{^;=|~aol.co.uk','$.a"
+"ol.co.uk>,'Dazzo!':{^$=|~dazzo*>,'Deoji':{^$=','k=|~deoji*>,'Excite"
+" - France':{^$=','q=|~excite.fr>,'Excite.ch':{^$=','q=|~excite.ch>,"
+"'Godado':{^Keywords=|~godado.it>,'Goo (Jp.)':{^MT=|~goo.ne.jp>,'G` "
+"- Po#':{^q=|~g`.pl>,'G` - United Arab Emirates':{^q=|~g`.ae>,'G` - "
+"Luxembourg':{^q=|~g`.lu>,'G` - Slovakia':{^q=|~g`.sk>,'G` - Russia'"
+":{^q=|~g`.ru>,'G` - Denmark':{^q=|~g`.dk>,'G` - Portugal':{^q=|~g`."
+"pt>,'G` - Romania':{^q=|~g`.ro>,'G` - Fin#':{^q=|~g`.fi>,'G` - Latv"
+"ia':{^q=|~g`.lv>,'G` - Guernsey':{^q=|~g`.gg>,'G` - Ire#':{^q=|~g`."
+"ie>,'G` - Sweden':{^q=|~g`.se>,'G` - Lithuania':{^q=|~g`.lt>,'G` - "
+"Canada':{^q=|~g`.ca>,'G` - Spain':{^q=|~g`.es>,'G`':{^q=|~g`.co','g"
+"`syndication*>,'G` - Germany':{^q=|~g`.de>,'G` - Switzer#':{^q=|~g`"
+".ch>,'G` - China':{^q=|~g`.cn>,'G` - Nether#s':{^q=|~g`.nl>,'G` - A"
+"ustria':{^q=|~g`.at>,'G` - Belgium':{^q=|~g`.be>,'G` - Chile':{^q=|"
+"~g`.cl>,'G` - France':{^q=|~g`.fr>,'G` - Italy':{^q=|~g`.it>,'Nexet"
+" Open Directory':{^SEARCH=','q=|~nexet.net>,'Nomade':{^s=','MT=|~no"
+"made.fr>,'Orbit.net':{^|~orbit.net>,'Search.ch':{^q=|~$.ch>,'Y%!':{"
+"^p=|~y%*','$.y%*>,'G` - Norway':{^q=|~g`.no>,'G` - Haiti':{^q=|~g`."
+"ht>,'G` - Vanuatu':{^q=|~g`.vu>,'G` - Repulic of Georgia':{^q=|~g`."
+"ge>,'G` - The Gambia':{^q=|~g`.gm>,'G` - Timor-Leste':{^q=|~g`.tp>,"
+"'G` - Armenia':{^q=|~g`.am>,'G` - British Virgin Is#s':{^q=|~g`.vg>"
+",'G` - American Samoa':{^q=|~g`.as>,'G` - Turkmenistan':{^q=|~g`.tm"
+">,'G` - Trinidad and Tobago':{^q=|~g`.tt>,'G` - Cote D\\'Ivoire':{^"
+"q=|~g`.ci>,'G` - Seychelles':{^q=|~g`.sc>,'G` - Greece':{^q=|~g`.gr"
+">,'G` - The Bahamas':{^q=|~g`.bs>,'G` - Kyrgyzstan':{^q=|~g`.kg>,'G"
+"` - Saint Helena':{^q=|~g`.sh>,'G` - Burundi':{^q=|~g`.bi>,'G` - To"
+"kelau':{^q=|~g`.tk>,'G` - Rep. du Congo':{^q=|~g`.cg>,'G` - Dominic"
+"a':{^q=|~g`.dm>,'G` - Sao Tome and Principe':{^q=|~g`.st>,'G` - Rwa"
+"nda':{^q=|~g`.rw>,'G` - Jordan':{^q=|~g`.jo>,'G` - Czech Republic':"
+"{^q=|~g`.cz>,'Yandex.ru':{^text=|~yandex.ru>,'G` - Senegal':{^q=|~g"
+"`.sn>,'G` - Jersey':{^q=|~g`.je>,'G` - Honduras':{^q=|~g`.hn>,'G` -"
+" Green#':{^q=|~g`.gl>,'G` - Hungary':{^q=|~g`.hu>,'G` - Is#':{^q=|~"
+"g`.is>,'G` - Pitcairn Is#s':{^q=|~g`.pn>,'G` - Mongolia':{^q=|~g`.m"
+"n>,'G` - Malawi':{^q=|~g`.mw>,'G` - Montserrat':{^q=|~g`.ms>,'G` - "
+"Liechtenstein':{^q=|~g`.li>,'G` - Micronesia':{^q=|~g`.fm>,'G` - Ma"
+"uritius':{^q=|~g`.mu>,'G` - Moldova':{^q=|~g`.md>,'G` - Maldives':{"
+"^q=|~g`.mv>,'G` - Niue':{^q=|~g`.nu>,'G` - Kazakhstan':{^q=|~g`.kz>"
+",'G` - Kiribati':{^q=|~g`.ki>,'G` - Nauru':{^q=|~g`.nr>,'G` - Laos'"
+":{^q=|~g`.la>,'G` - Isle of Man':{^q=|~g`.im>,'G` - Guyana':{^q=|~g"
+"`.gy>,'G` - Croatia':{^q=|~g`.hr>,'G` - Slovenia':{^q=|~g`.si>,'G` "
+"- Sri Lanka':{^q=|~g`.lk>,'G` - Azerbaijan':{^q=|~g`.az>,'G` - Bulg"
+"aria':{^q=|~g`.bg>,'G` - Bosnia-Hercegovina':{^q=|~g`.ba>,'G` - Ton"
+"ga':{^q=|~g`.to>,'G` - Rep. Dem. du Congo':{^q=|~g`.cd>,'MSN - New "
+"Zea#':{^q=','mkt=en-nz|~msn.co.nz>,'G` - Djibouti':{^q=|~g`.dj>,'G`"
+" - Guadeloupe':{^q=|~g`.gp>,'G` - Estonia':{^q=|~g`.ee>,'G` - Samoa"
+"':{^q=|~g`.ws>,'G` - San Marino':{^q=|~g`.sm>,'MSN UK':{^q=|~msn.co"
+".uk>,'Mobagee Search':{^q=|~s.mbga.jp>,'Lycos - Italy':{^;=|~lycos."
+"it>,'Lycos - France':{^;=|~lycos.fr>,'Lycos - Spain':{^;=|~lycos.es"
+">,'Lycos - Nether#s':{^;=|~lycol.nl>,'Lycos - Germany':{^;=|~lycol."
+"de','$.lycos.de>,'Magellan':{^$=|~magellan>,'myGO':{^qry=|~mygo*>,'"
+"NBCi':{^<=','qkw=|~nbci*>,'Nate*':{^;=|~nate*','$.nate*>,'Crooz':{^"
+";=|~crooz.jp>,'Ask Jeeves':{^ask=','q=|~ask*','ask.co.uk>,'MSN':{^q"
+"=|~msn*>,'AOL - France':{^q=|~aol.fr>,'MetaIQ*':{^$=','qry=|~metaiq"
+">,'Web.de':{^su=|~web.de>,'Ask - Japan':{^q=|~ask.jp>,'Microsoft Bi"
+"ng':{^q=|~bing*>},'Other1':{p:['AFC>,'Classified Ad':{p:['CAC>,'Oth"
+"er2':{p:['DMC>,'Email':{p:['EMC>,'Internal Link':{p:['ILC>,'Keyword"
+" Ad':{p:['KAC>,'Link Exchange':{p:['LEC>,'Other3':{p:['OTC>,'Other4"
+"':{p:['SPC>,'Banner':{p:['BAC>}";
s.__se = new Function(""
+"var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '"
+"\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle'"
+",'+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(v"
+"ar i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substri"
+"ng(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substr"
+"ing(i,i+1);}}return eval('('+g+')');");
s.isEntry=new Function(""
+"var s=this;var l=s.linkInternalFilters,r=s.referrer||typeof s.refer"
+"rer!='undefined'?s.referrer:document.referrer,p=l.indexOf(','),b=0,"
+"v='',I2=r.indexOf('?')>-1?r.indexOf('?'):r.length,r2=r.substring(0,"
+"I2);if(!r){return 1;}while(p=l.indexOf(',')){v=p>-1?l.substring(0,p"
+"):l;if(v=='.'||r2.indexOf(v)>-1){return 0;}if(p==-1){break;}b=p+1;l"
+"=l.substring(b,l.length);}return 1;");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
s.channelManager=new Function("p","f",""
+"var dl='Direct Load',nr='No Referrer',ow='Other Websites';if(!this."
+"p_fo('cm')) {return -1;}if(!this.isEntry()){return 0;}var s=this,r="
+"s.referrer||typeof s.referrer!='undefined'?s.referrer:document.refe"
+"rrer,e,k,c,w,_b=0,url=s.pageURL?s.pageURL:s.wd.location,url=url+'',"
+"rf='';s.__se=s.__se();var br=0;var ob=new Object;ob.debug=function("
+"m){if(f){f(m);}};ob.channel='';ob.keyword='';ob.partner='';ob.toStr"
+"ing=function(ar){var str='';var x=0;for(x in ar){str+=ar[x]+':\\\''"
+"+ob[ar[x]]+'\\\',';}str='{'+str.substring(0,str.length-1)+'}';retur"
+"n str;};ob.referrer=r?r:nr;ob.getReferringDomain=function(){if(this"
+".referrer==''){return '';}if(r&&typeof r!='undefined'){var end=r.in"
+"dexOf('?') >-1?r.indexOf('?'):r.substring(r.length-1,r.length)=='/'"
+"?r.length-1:r.length;var start=r.indexOf('://')>-1?r.indexOf('://')"
+"+3:0;return r.substring(start,end);}else{return nr;}};ob.clear=func"
+"tion(ar){var x=0;for(x in ar){this[ar[x]]='';}this.referringDomain="
+"this.getReferringDomain();};ob.referringDomain=ob.getReferringDomai"
+"n();ob.campaignId=''; ob.isComplete=function(){var ar=['channel','k"
+"eyword','partner','referrer','campaignId'];for(var i=0;i<ar.length;"
+"i++){if(!ob[ar[i]]){return 0;}}if(p&&s.c_r('cmm')==ob.toString(ar))"
+"{this.debug('Duplicate');this.clear(ar);return 1;}else if(p){s.c_w("
+"'cmm',ob.toString(ar));return 1;}return 1;};ob.matcher=function(u,x"
+"){if(!u){return false;}if(typeof s.__se[u].i!='undefined'&&(s.campa"
+"ign||s.getQueryParam&&s.getQueryParam(ids[x]))){ob.campaignId=s.get"
+"QueryParam(ids[x]);return true;}else if(typeof s.__se[u].p!='undefi"
+"ned' &&(s.campaign||s.getQueryParam&&s.getQueryParam&&s.getQueryPar"
+"am(ids[x].substring(0,ids[x].indexOf('='))))){var _ii=ids[x].substr"
+"ing(ids[x].indexOf('=') +1,ids[x].length);var _id=s.campaign||s.get"
+"QueryParam(ids[x].substring(0,ids[x].indexOf('=')));if (_ii==_id.su"
+"bstring(0,_ii.length)){ob.campaignId=_id;return true;}}else{return "
+"false;}};var ids='';var _p='';for(var i in s.__se){if(_p){break;}fo"
+"r(var j in s.__se[i]){if(!(j=='p' ||j=='i')){_p=i;}}}for(var u in s"
+".__se[_p]){if(u!='i' &&u!='p'){for(var h=0;h<s.__se[_p][u].tl.lengt"
+"h;h++){if(s.__se[_p][u].tl[h]&&typeof s.__se[_p][u].tl[h]=='string'"
+"){if(r.indexOf(s.__se[_p][u].tl[h])!=-1){ob.partner=u;br=1;break;}}"
+"if(br){break;}}}else {ids=s.__se[_p][u];}if(br){for(var i=0;i<s.__s"
+"e[_p][ob.partner].kw.length;i++){if(s.__se[_p][u].kw[i]&&typeof s._"
+"_se[_p][u].kw[i]=='string') {var kwd=s.__se[_p][u].kw[i].substring("
+"0,s.__se[_p][u].kw[i].length-1);ob.keyword=s.getQueryParam?s.getQue"
+"ryParam(kwd,'', r):''; if(ob.keyword){break;}}}for(var x=0;x<ids.le"
+"ngth;x++){if(ob.matcher(_p,x)){ob.channel=_p;if(!ob.keyword){ob.key"
+"word='n/a'; }break;}};if(!ob.channel){ob.channel='Natural'; ob.camp"
+"aignId='n/a'; }break;}}if(ob.isComplete()){return ob;}for(var _u in"
+" s.__se){if(_u==_p){continue;}for(var u in s.__se[_u]){ids=s.__se[_"
+"u][u];for(var x=0;x<ids.length;x++){if(ob.matcher(_u,x)){ob.channel"
+"=_u;ob.partner=_u;ob.keyword='n/a'; break;}}if(ob.isComplete()){ret"
+"urn ob;}}}if(ob.isComplete()){return ob;}if(ob.referrer&&(ob.referr"
+"er!=nr)){ob.channel=ow;ob.partner=ow;ob.keyword='n/a'; ob.campaignI"
+"d='n/a'; }if(ob.isComplete()){return ob;}ob.channel=dl;ob.partner=d"
+"l;ob.keyword='n/a'; ob.campaignId='n/a';return ob;");


/*
 * Plugin: TimeParting 3.0 - Set timeparting values based on time zone - valid through 2014 
 */
s.TimeParting=new Function("t","z",""
+"var s=this,d,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;d = new Date()"
+";A=d.getFullYear();if(A=='2009'){B='08';C='01'}if(A=='2010'){B='14'"
+";C='07'}if(A=='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if("
+"A=='2013'){B='10';C='03'}if(A=='2014'){B='09';C='02'}if(!B||!C){B='"
+"08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000');i"
+"f(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z"
+"=parseFloat(z);E=new Date(B);F=new Date(C);G=F;H=new Date();if(H>E&"
+"&H<G){z=z+1}else{z=z};I=H.getTime()+(H.getTimezoneOffset()*60000);J"
+"=new Date(I + (3600000*z));K=['Sunday','Monday','Tuesday','Wednesda"
+"y','Thursday','Friday','Saturday'];L=J.getHours();M=J.getMinutes();"
+"N=J.getDay();O=K[N];P='AM';Q='Weekday';R='00';if(M>30){R='30'}if(L>"
+"=12){P='PM';L=L-12};if (L==0){L=12};if(N==6||N==0){Q='Weekend'}T=L+"
+"':'+R+P;if(t=='h'){return T}if(t=='d'){return O}if(t=='w'){return Q"
+"}}");

/****Plugin Code ******/
/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/* Configure Modules and Plugins */

s.loadModule("Media")
s.Media.autoTrack=false
//s.Media.trackWhilePlaying=true //COMMENTED BY ADOBE 10/01/2010
s.Media.trackVars="None"
s.Media.trackEvents="None"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="directv"
s.trackingServer="metrics.directv.com"
s.trackingServerSecure="smetrics.directv.com"
s.dc=122

/****************************** MODULES *****************************/
/* Module: Media */
s.m_i("Media");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,r"
+"s);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(windo"
+"w.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im"
+".s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;i"
+"m.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\""
+"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s"
+"=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y="
+"y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('goo"
+"gle')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+="
+"(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe."
+"substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt"
+"(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=="
+"'visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'"
+"){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=="
+"'AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider"
+"')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';e"
+"lse if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q"
+"='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if"
+"(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.subst"
+"ring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.l"
+"inkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this"
+",\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e."
+"srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h"
+"=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathn"
+"ame.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCas"
+"e?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot"
+"(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r"
+"\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE"
+"')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').in"
+"dexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.p"
+"t(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs"
+"=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';"
+"for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]"
+"&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.lin"
+"ks.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
+"){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh("
+"s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if"
+"(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='"
+"):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynami"
+"cAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s."
+"fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\""
+"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;"
+"if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m["
+"t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<"
+"g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.subst"
+"ring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n"
+"+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;"
+"if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"s"
+"cript\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e"
+"){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}ret"
+"urn m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)"
+"for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s."
+"dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDel"
+"ay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10"
+"+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta="
+"-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if"
+"(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;t"
+"cf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.jav"
+"aEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5"
+"){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y"
+"\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)w"
+"hile(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.b"
+"rowserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.w"
+"d.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return"
+" '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s"
+"_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i"
+"<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk="
+"0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s."
+"fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta"
+");qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t"
+"(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.lo"
+"cation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns"
+"6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=pa"
+"rseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUp"
+"perCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorName"
+"space,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,s"
+"tate,zip,events,products,linkName,linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,"
+"cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDom"
+"ainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,"
+"linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s."
+"wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
return s;
}


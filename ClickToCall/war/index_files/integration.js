/**
 * Usage:
 *    This file contains the configuration logic used for third party integrations.
 *    At a minimum, this file will provide the CSS and JS files required to properly
 *    display an integrated page.  This will help third parties maintain a basic 
 *    directv.com look and feel during directv.com production downtime.
 *
 *    By default, this file will configure the CDN as 'cdn.directv.com' and the host
 *    as 'www.directv.com'.  To alter these values, append any of the following parameters 
 *    to the JS import statement:
 *    - cdnUrl: The URL of the target CDN server(s)
 *    - hostUrl: The target host from which to load the integration API.
 *    
 *    Example usage (useful for local testing):
 *
 *    <script type="text/javascript" src="//local.directv.com:7001/resources/js/integration/integration.js?cdnUrl=local.directv.com:7001&useGeneric=true&hostUrl=local.directv.com:7001"></script> 
 *
 *    Notes:
 *    1) The path to the file is /resources/js/integration/integration.js
 *    2) Parameter values: 
 *      - The cdn URL was set to the local installation: cdnUrl=local.directv.com:7001
 *      - The generic, non-prototype API was requested: useGeneric=true
 *      - The host was changed to the local installation: hostUrl=local.directv.com:7001
 * 
 **/

var DIRECTV = DIRECTV ? DIRECTV : new Object();
DIRECTV.SiteIntegration = DIRECTV.SiteIntegration ? DIRECTV.SiteIntegration : new Object();
DIRECTV.SiteIntegration.Client = DIRECTV.SiteIntegration.Client ? DIRECTV.SiteIntegration.Client : new Object();
DIRECTV.SiteIntegration.Bridge = DIRECTV.SiteIntegration.Bridge ? DIRECTV.SiteIntegration.Bridge : new Object();
DIRECTV.SiteIntegration.Bridge.options = new Object();

if (document.domain != "directv.com") {
    document.domain = "directv.com";
}

DIRECTV.SiteIntegration.Client.initialize = function() {
    var dtvDataDiv = document.getElementById('dtv_tup');
    
    var webkitFix = document.createElement('iFrame');
    webkitFix.height = 0;
    webkitFix.width = 0;
    webkitFix.border = 0;
    webkitFix.style.display = 'none';
    webkitFix.src = 'about:blank';
    dtvDataDiv.insertBefore(webkitFix, dtvDataDiv.firstChild);

    var iframe = document.createElement('iFrame');
    iframe.src = '//' + DIRECTV.SiteIntegration.Bridge.options.hostUrl + '/DTVAPP/integration/siteIntegrationComm.jsp';
    iframe.height = 0;
    iframe.width = 0;
    iframe.border = 0;
    iframe.style.display = 'none';
    dtvDataDiv.insertBefore(iframe, webkitFix);
    
    var spacerDiv = document.createElement('div');
    spacerDiv.id = 'dtv-topnav-temp';
    spacerDiv.style.height = '107px';
    dtvDataDiv.insertBefore(spacerDiv, iframe);
    
    DIRECTV.SiteIntegration.Client.commFrame = iframe;
    DIRECTV.SiteIntegration.Client.reportPageData();
    
    if (window.attachEvent) {
        document.body.attachEvent('onclick', DIRECTV.SiteIntegration.Client._reformatDtvUrl);
    } else {
        document.body.addEventListener('click', DIRECTV.SiteIntegration.Client._reformatDtvUrl, false);
    }  
}

DIRECTV.SiteIntegration.Client.addHeader = function() {
    var loaded = false;
    
    try {
        if (DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV) {
            DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV.SiteIntegration.Comm.getData(
                "/DTVAPP/layout/component/topnav.jsp?includeTimeout=false", DIRECTV.SiteIntegration.Client._writeHeader);
            loaded = true;
        }
    } catch(e) {}
    
    if (!loaded) {
        setTimeout(DIRECTV.SiteIntegration.Client.addHeader,10);
    }
}

DIRECTV.SiteIntegration.Client._writeHeader = function(headerData) {
    var topNavTemp = document.getElementById('dtv-topnav-temp');

    if ('outerHTML' in document.documentElement) {
        topNavTemp.outerHTML = headerData;
    } else {
        var range = document.createRange();
        range.selectNode(topNavTemp);
        var documentFragment = range.createContextualFragment(headerData);    
        topNavTemp.parentNode.replaceChild(documentFragment, topNavTemp);
    }
    
    if (window.location.host.indexOf('nfl.directv.com') > -1) {
        DIRECTV.SiteIntegration.Client.invalidateSession();
    }
}

DIRECTV.SiteIntegration.Client.addFooter = function() {
    var loaded = false;
    try {
        if (DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV) {
            DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV.SiteIntegration.Comm.getData(
                "/DTVAPP/layout/component/footer.jsp", DIRECTV.SiteIntegration.Client._writeFooter);
            loaded = true;
        }
    } catch(e) {}
    
    if (!loaded) {
        setTimeout(DIRECTV.SiteIntegration.Client.addFooter,50);
    }
}

DIRECTV.SiteIntegration.Client._writeFooter = function(footerData) {
    var dtvDataDiv = document.getElementById('dtv_tup');
    var nextSibling = dtvDataDiv.nextSibling;
    var footerDataDiv = null;
    
    if (!document.createRange) {
        footerDataDiv = document.createElement('div');
        footerDataDiv.innerHTML = footerData;
        var childNodes = footerDataDiv.childNodes;
        for (var i=0,j=childNodes.length; i< j; i++) {
            var current = childNodes[i];
            if (current) { 
                document.body.appendChild(current);
            }            
        } 
    } else {
        var range = document.createRange();
        range.selectNode(dtvDataDiv);

        if (range.createContextualFragment) {
            footerDataDiv = range.createContextualFragment(footerData);
            if (nextSibling) {
                dtvDataDiv.parentNode.insertBefore(footerDataDiv, nextSibling);
            } else {
                dtvDataDiv.parentNode.appendChild(footerDataDiv);
            }
        } else { // IE 9 fix
            range.selectNode(dtvDataDiv.nextSibling);
            var divIE9 = document.createElement("div");
            divIE9.innerHTML = footerData;
            var node = document.createDocumentFragment();
            var child = null;
            while ((child = divIE9.firstChild)) {
                node.appendChild(child);
            }
            range.insertNode(node);
        }
    }
}

DIRECTV.SiteIntegration.Client.invalidateSession = function() {
    var loaded = false;
    try {
        if (DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV) {
            setTimeout(DIRECTV.SiteIntegration.Client._sendSessionInvalidationRequest, 5000);
            loaded = true;
        }
    } catch(e) {}
    
    if (!loaded) {
        setTimeout(DIRECTV.SiteIntegration.Client.invalidateSession,50);
    }
}

DIRECTV.SiteIntegration.Client._sendSessionInvalidationRequest = function() {
    DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV.SiteIntegration.Comm.getData(
        "/DTVAPP/integration/expireSession.jsp", function(data) {});
}

DIRECTV.SiteIntegration.Client._reformatDtvUrl = function(event) { 
    var event = event || window.event;
    var srcEl = event.target || event.srcElement;

    if (srcEl) {
        if (srcEl.tagName.toLowerCase() != 'a') {
            var parent = srcEl.parentNode;
            if (parent) {
                if (parent.tagName) {
                    if (parent.tagName.toLowerCase() == 'a') {
                        srcEl = parent;
                    } else {
                        var grandParent = parent.parentNode;
                        if (grandParent) {
                            if (grandParent.tagName) {
                                if (grandParent.tagName.toLowerCase() == 'a') {
                                    srcEl = grandParent;
                                } else {
                                    var greatGrandParent = grandParent.parentNode;
                                    if (greatGrandParent) {
                                        if (greatGrandParent.tagName) {
                                            if (greatGrandParent.tagName.toLowerCase() == 'a') {
                                                srcEl = greatGrandParent;
                                            }
                                        }
                                    }
                                }
                            }
                        }   
                    }
                }
            }
        }

        if (srcEl.tagName.toLowerCase() == 'a') {
            var clickHref = srcEl.href;
            var root = null;
            
            if (/^(http(s)?:\/\/)?([^\/]+)?\/DTVAPP\//.test(clickHref)) {
                root = '/DTVAPP/';
            } else if (/^(http(s)?:\/\/)?([^\/]+)?\/entertainment(\/)?/.test(clickHref)) {
                root = '/entertainment';
            } else if (/^(http(s)?:\/\/)?([^\/]+)?\/m\//.test(clickHref)) {
                root = '/m/';
            }
            
            if (!!root) {
                var urlParts = clickHref.split(root);
                if (!/www.directv.com/.test(urlParts[0]) && !/news.directv.com/.test(urlParts[0])
					&& !/www.news.directv.com/.test(urlParts[0])) {
                    urlParts[0] ='//' + DIRECTV.SiteIntegration.Bridge.options.hostUrl;
                    var newUrl = urlParts.join(root);
                    
                    if (newUrl.indexOf('/logoutTimeout.jsp?') > -1) {
                        var urlParts = newUrl.split('?');
                        var baseUrl = urlParts[0];
                        var queryString = urlParts[1];                    
                        var params = DIRECTV.SiteIntegration.Client._getQueryParams(queryString);
                        
                        if (params.logoutNextUrl) {
                            params.logoutNextUrl = '/DTVAPP/index.jsp';
                            params.clear = 'true';
                        }
                                            
                        newUrl = baseUrl + '?' + DIRECTV.SiteIntegration.Client._toParamString(params);
                    }
    
                    if (newUrl.indexOf('?') > -1) {
                        newUrl += '&';
                    } else {
                        newUrl += '?';
                    }
                    
                    // test both just in case AS combines the invalid keywords
                    if (/\/session\//.test(newUrl)) {
                        newUrl = newUrl.split('/session/')[0];
                    }

                    if (/\/kw\//.test(newUrl)) {
                        newUrl = newUrl.split('/kw/')[0];
                    }
                    
                    srcEl.href = newUrl;
                }
            }        
        }    
    }
}

DIRECTV.SiteIntegration.Client._getQueryParams = function(queryString) {
    var queryItems = {};
    
    if (queryString) {
        var pairs = queryString.split('&');
        for (var i=0,j=pairs.length; i < j; i++) {
            var current = pairs[i];
            if (current) {
               var items = current.split('=');
               if (items && items.length > 0) {
                   queryItems[items[0]] = (items.length == 2) ? items[1] : '';                    
               }
            }
        }
    }
    
    return queryItems;
}

DIRECTV.SiteIntegration.Client._toParamString = function(params) {
    var queryItems = [];
    
    for (var key in params) {
        if (typeof params[key] === "string") {
            queryItems[queryItems.length] = key + '=' + encodeURIComponent(params[key]);
        }
    }    
    
    return queryItems.join('&');
}

DIRECTV.SiteIntegration.Client.sendReportingData = function(config) {
    try {
        var s = Reporting.getReportingObject(config.accountId);
        s.pageName=document.title;
        s.prop7 = config.userType;

        if (!!window.location.href.match(/^http:\/\/support.directv.com\/app\/tips_tricks/)) {
            // Add Answer Station config
        	s.pageName='Help:Support:Tips and Tricks';
        	s.prop1='Help';
        	s.prop2='Help:Support';
        	s.prop3='Help:Support:Tips and Tricks';
        }else if (!!window.location.host.match(/^support.directv.com/)) {
            // Add Answer Station config
        	s.pageName='Help:Support:Answer Center:'+document.title;
        	s.prop1='Help';
        	s.prop2='Help:Support';
        	s.prop3='Help:Support:Answer Center';
        } else if (!!window.location.host.match(/^forums.directv.com/)) {
            // Add Tech Forum config
        	s.pageName='Help:Support:Technical Forums';
        	s.prop1='Help';
        	s.prop2='Help:Support';
        	s.prop3='Help:Support:Technical Forums';
        }
        var s_code=s.t();if(s_code)document.write(s_code);
    } catch(e) {
    } 
}

DIRECTV.SiteIntegration.Client.reportPageData = function() {    
    var loaded = false;
    try {
        if (DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV) {
            DIRECTV.SiteIntegration.Client.sendReportingData(DIRECTV.SiteIntegration.Client.commFrame.contentWindow.DIRECTV.SiteIntegration.getReportingConfig(document.location.host));
            loaded = true;
        }
    } catch(e) {}
    
    if (!loaded) {
        setTimeout(DIRECTV.SiteIntegration.Client.reportPageData,50);
    }
}

new function() {

    var scripts = document.getElementsByTagName("script");
    for (var i=0,j=scripts.length; i<j; i++) {
        var currentScript = scripts[i];
        if (/\/resources\/js\/integration\/integration.js/.test(currentScript.src)) {
            var items = currentScript.src.split('?');
            if (items.length > 1) {
                var queryString = items[1];
                var queryItems = queryString.split('&');
                for (var x=0,y=queryItems.length; x<y; x++) {
                    var params = queryItems[x].split('=');
                    if (params) {
                        DIRECTV.SiteIntegration.Bridge.options[params[0]] = params[1]; 
                    }
                }
            }            
            break;
        }
    }

    if (!!!DIRECTV.SiteIntegration.Bridge.options.cdnUrl) {
        DIRECTV.SiteIntegration.Bridge.options.cdnUrl = (window.location.protocol.toLowerCase().indexOf("https")!==0) ? 
            "cdn.directv.com" : "cdns.directv.com";
    }

    if (!!!DIRECTV.SiteIntegration.Bridge.options.hostUrl) {
        DIRECTV.SiteIntegration.Bridge.options.hostUrl = "www.directv.com";
    }
        
    document.write('<link rel="icon" href="//%s/images/common/favicon.ico" type="image/x-icon" />'.replace('%s', DIRECTV.SiteIntegration.Bridge.options.cdnUrl));
    document.write('<link rel="apple-touch-icon" href="//%s/images/common/icons/apple-touch-icon.png" type="image/png" />'.replace('%s', DIRECTV.SiteIntegration.Bridge.options.cdnUrl));
    document.write('<link rel="stylesheet" type="text/css" href="//%s/resources/css/compressed/global.css" media="all" />'.replace('%s', DIRECTV.SiteIntegration.Bridge.options.cdnUrl));
    document.write('<script type="text/javascript" src="//%s/resources/js/omniture/omniture.js"></script>'.replace('%s', DIRECTV.SiteIntegration.Bridge.options.cdnUrl));
}();


var headerInterval = setInterval(function(){
	if (typeof document.getElementById('dtv_topnav_sections_nav') == 'object'){
		var iMaxWidth = 980;
		var oNavSection = document.getElementById('dtv_topnav_sections_nav');
		var oNavCustomer = document.getElementById('dtv_topnav_util_nav');
		// Co-branded sites - top nav not always present		
		if (oNavSection != undefined && oNavCustomer != undefined) {
			clearInterval(headerInterval);
			var iDelta = iMaxWidth - oNavCustomer.offsetWidth - oNavSection.offsetWidth;
			if (Math.abs(iDelta) < 140) {
				var oNavSectionListEls = oNavSection.getElementsByTagName('ul')[0].childNodes;
				var aNavSectionLIs = [];
				for (var i=0; i<oNavSectionListEls.length; i++){
					if (oNavSectionListEls[i].nodeName.toUpperCase()=='LI'){
						aNavSectionLIs.push(oNavSectionListEls[i]);
					}
				}
				var iPolarity = (iDelta > 0) ? -1 : 1;
				var iLeftOrRight = -1;
				var iNavIndex = 0;
				var aNavSectionLiPaddingLeft = [];
				var aNavSectionLiPaddingRight = [];

				for (var i=0; i<aNavSectionLIs.length; i++){
					if (aNavSectionLIs[i].currentStyle) {
						aNavSectionLiPaddingLeft[i] = parseInt(aNavSectionLIs[i].getElementsByTagName('div')[0].currentStyle['paddingLeft']);
						aNavSectionLiPaddingRight[i] = parseInt(aNavSectionLIs[i].getElementsByTagName('div')[0].currentStyle['paddingRight']);
					} else if (window.getComputedStyle){
						aNavSectionLiPaddingLeft[i] = parseInt(document.defaultView.getComputedStyle(aNavSectionLIs[i].getElementsByTagName('div')[0], null).getPropertyValue('padding-left'));
						aNavSectionLiPaddingRight[i] = parseInt(document.defaultView.getComputedStyle(aNavSectionLIs[i].getElementsByTagName('div')[0], null).getPropertyValue('padding-right'));
					} else{
						aNavSectionLiPaddingLeft[i] = 0;
						aNavSectionLiPaddingRight[i] = 0;
					}
				}
				
				for (var i=Math.abs(iDelta); i>0; i--){
					if (i % aNavSectionLIs.length == 0){
						iLeftOrRight = iLeftOrRight * -1;
					}
					iNavIndex = i % aNavSectionLIs.length;
					if (iLeftOrRight < 0){
						aNavSectionLiPaddingLeft[iNavIndex] = aNavSectionLiPaddingLeft[iNavIndex]-iPolarity;
					} else {
						aNavSectionLiPaddingRight[iNavIndex] = aNavSectionLiPaddingRight[iNavIndex]-iPolarity;
					}
				}
				
				for (var i=0; i<aNavSectionLIs.length; i++){
					aNavSectionLIs[i].getElementsByTagName('div')[0].style.paddingLeft = aNavSectionLiPaddingLeft[i] + 'px';
					aNavSectionLIs[i].getElementsByTagName('div')[0].style.paddingRight = aNavSectionLiPaddingRight[i] + 'px';
				}
			}
		} 
	} else if (headerInterval > 50){
		clearInterval(headerInterval);	
	}
}, 100);

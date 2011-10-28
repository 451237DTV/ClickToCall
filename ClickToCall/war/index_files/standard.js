
RightNow.Widget.YUI=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;if(YAHOO.env.ua.ie&&document.domain.search("directv.com")!=-1){}else{this._IAmReady();}
YAHOO.util.Event.onAvailable("yui-history-iframe-sub",this._IAmReady);};RightNow.Widget.YUI.prototype={_IAmReady:function(parameter)
{}};
RightNow.Widget.CustomKeywordText2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._textElement=document.getElementById("rn_"+this.instanceID+"_Text");if(this._textElement)
{this._searchedOn=this._textElement.value;this.data.initialValue=this._textElement.value;this._setFilter();YAHOO.util.Event.addListener(this._textElement,"change",this._onChange,null,this);RightNow.Event.subscribe("evt_keywordChangedResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_getFiltersRequest",this._onGetFiltersRequest,this);RightNow.Event.subscribe("evt_resetFilterRequest",this._onResetRequest,this);if(this.data.attrs.initial_focus)
this._textElement.focus();}
YAHOO.util.Event.addListener(this._textElement,'blur',this.hideSearchInfo,null,this);YAHOO.util.Event.addListener(this._textElement,'focus',this.showSearchInfo,null,this);RightNow.Event.subscribe("evt_goToSearch",this._onClick,this);};RightNow.Widget.CustomKeywordText2.prototype={hideSearchInfo:function(type,args)
{if(this._textElement.value==""){this._textElement.value=this.data.attrs.initial_value;}},showSearchInfo:function(type,args)
{if(this._textElement.value==this.data.attrs.initial_value){this._textElement.value="";}},_onClick:function(type,args)
{var textValue;if(this._textElement.value==""||this._textElement.value==this.data.attrs.initial_value){textValue="emptysearchstring";}else{textValue=this._textElement.value;}
if(this.data.js.cur_page!="answers/list"){window.location="/app/answers/list/kw/"+textValue;return;}},_onChange:function(evt)
{var textValue;if(this._textElement.value==""||this._textElement.value==this.data.attrs.initial_value){textValue="emptysearchstring";}else{textValue=this._textElement.value;}
this._eo.data=YAHOO.lang.trim(textValue);this._eo.filters.data=YAHOO.lang.trim(textValue);RightNow.Event.fire("evt_keywordChangedRequest",this._eo);},_onGetFiltersRequest:function(type,args)
{var textValue;if((this._textElement.value==""||this._textElement.value==this.data.attrs.initial_value)&&this.data.js.cur_page.search("questions_answers")==-1){textValue="emptysearchstring";}else{textValue=this._textElement.value;}
this._eo.filters.data=YAHOO.lang.trim(textValue);this._searchedOn=this._eo.filters.data;RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"searchName":this.data.js.searchName,"data":this.data.initialValue,"rnSearchType":this.data.js.rnSearchType,"report_id":this.data.attrs.report_id};},_onChangedResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id))
{var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id),newValue=(data===null)?this.data.initialValue:data;if(this._textElement.value!==newValue&&this._textElement.value!="emptysearchstring"&&this._textElement.value!="")
this._textElement.value=newValue;}},_onResetRequest:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id)&&(args[0].data.name===this.data.js.searchName||args[0].data.name==="all"))
{if(this._textElement.value!=this._textElement.value!="")
this._textElement.value=this._searchedOn;}}};
RightNow.Widget.CustomSearchButton2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;YAHOO.util.Event.addListener("rn_"+this.instanceID,"click",this._startSearch,null,this);};RightNow.Widget.CustomSearchButton2.prototype={_startSearch:function(evt)
{if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=YAHOO.util.Dom.getAncestorByTagName("rn_"+this.instanceID,"FORM");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
if(this.data.js.cur_page!="answers/list"){RightNow.Event.fire("evt_goToSearch",eo);return;}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.filters={report_id:this.data.attrs.report_id,reportPage:this.data.attrs.report_page_url,target:this.data.attrs.target};RightNow.Event.fire("evt_searchRequest",eo);}};
function LeftNav(dat)
{var data=dat;this.init=function()
{}}
RightNow.Widget.ChatLink=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;};RightNow.Widget.ChatLink.prototype={popupWindow:function()
{popup=window.open(data.js.url,"ChatWindow","width=640,height=570,scrollbars=auto");}};
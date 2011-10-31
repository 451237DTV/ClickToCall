<%@ tag import="java.util.Date" 
  import="java.text.DateFormat"%>
<% 
  DateFormat dateFormat = 
    DateFormat.getDateInstance(DateFormat.LONG);
  Date now = new Date(System.currentTimeMillis());
  out.println(dateFormat.format(now));
%>
<input type="image" src="/customer-service_files/btn_clicktocall.gif" onclick="showDlg('hi')">
<!-- <img src="/btn_clicktocall.gif" /> -->

<script type="text/javascript">
function showDlg(msg) {
	
	var x = window.innerWidth/4, y = window.innerHeight/2;
	var pos = "dialogtop:"+x+"px;dialogleft:"+y+"px;";

   window.showModalDialog("/customer-service.jsp","Suresh",pos+"dialogWidth:600px;dialogHeight:660px")
}
</script>

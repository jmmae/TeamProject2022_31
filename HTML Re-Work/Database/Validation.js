function checkData(){
  if (document.login.username.value=="")
	{
		alert("Please fill in your E-Mail")
		document.login.username.focus()
		return false;
	}
  if (document.login.password.value=="")
	{
		alert("Please fill in your E-Mail")
		document.login.password.focus()
		return false;
	}
}
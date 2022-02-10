function checkData(){
  if (document.login.username.value=="")
	{
		alert("Please fill in your Username")
		document.login.username.focus()
		return false;
	}
  if (document.login.password.value=="")
	{
		alert("Please fill in your Password")
		document.login.password.focus()
		return false;
	}
  else{
    return true;
  }
}
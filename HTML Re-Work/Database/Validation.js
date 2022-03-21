
function checkData(){
  if (document.addItem.foodtest.value=="")
	{
		alert("Please fill in the food")
		document.addItem.foodtest.focus()
		return false;
	}
  if (document.addItem.pricetest.value=="")
	{
		alert("Please fill in the price")
		document.addItem.pricetest.focus()
		return false;
	}
	if (document.addItem.Available.value=="")
	{
		alert("Please fill in availability")
		document.addItem.Available.focus()
		return false;
	}
  else{
    return true;
  }
}

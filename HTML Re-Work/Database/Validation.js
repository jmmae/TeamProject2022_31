
function checkData(){
  if (document.addItem.DishID.value=="")
	{
		alert("Please fill in the DishID")
		document.addItem.DishID.focus()
		return false;
	}
  if (document.addItem.DishName.value=="")
	{
		alert("Please fill in the DishName")
		document.addItem.DishName.focus()
		return false;
	}
	if (document.addItem.GroupTags.value=="")
	{
		alert("Please fill in availability")
		document.addItem.GroupTags.focus()
		return false;
	}
	if (document.addItem.Description.value=="")
	{
		alert("Please fill in Description")
		document.addItem.Description.focus()
		return false;
	}
	if (document.addItem.Calories.value=="")
	{
		alert("Please fill in Calories")
		document.addItem.Calories.focus()
		return false;
	}
	if (document.addItem.DietaryRequirements.value=="")
	{
		alert("Please fill in DietryRequirement")
		document.addItem.DietaryRequirements.focus()
		return false;
	}
	if (document.addItem.Allergens.value=="")
	{
		alert("Please fill in Allergies")
		document.addItem.Allergens.focus()
		return false;
	}
	if (document.addItem.Price.value=="")
	{
		alert("Please fill in Price")
		document.addItem.Price.focus()
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

public class Food{


  private String item;
  private String description;
  private String price;

  public Food(String item, String desc, String price){
    this.item = item;
    this.description = desc;
    this.price = price;
  }

public String getItem(){
  return item;
}

public String getDescription(){
  return description;
}

public String getPrice(){
  return price;
}


}
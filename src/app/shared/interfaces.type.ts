export interface UserData{
    id : number,
    username : string,
    email : string,
    firstName : string,
    lastName : string,
    gender : string,
    image : string
}

export interface Product{
  thumbnail : string,
  title : string,
  description : string,
  price : number,
  rating : number,
  stock : number
}

interface User{
    fname: string;
    username:string
    role:boolean
    phone:number
    created_at:string
    address:string
    updated_at:string
    lname: string;
    id:number;
    email: string;
    password:string;
    status:boolean;
    cart:[];
    image:""
}

export default User


export interface Product{
    id:number ,
      name: string,
      category: string,
      description: string,
      price: number,
      quantity: number,
      created_at: string,
      updated_at: string,
      image:string
}


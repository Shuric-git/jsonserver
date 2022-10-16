import React from "react";

interface IUser {
  id: number,
  name: string,
  username: string,
  email: string,
  city: string,
  phone: string,
  website: string,
  company: string,
}

interface IOrder {
  "name": string,
  "username": string,
  "city": string,
  "email": string,
  "company": string,
  "phone": string,
  "website": string,
}

interface ISort {
  order: IOrder,
  option: string
}

export type { IUser, ISort, IOrder}
export class db {

  private static _baseUrl: string = 'https://json-kg.herokuapp.com/api/'
  // private static _baseUrl: string = isDev() ? 'http://localhost:3001/' : 'https://json-kg.herokuapp.com/api/'

  static async getUsers(start: number, end: number, sort: any, searchValue: string) {
    let res = await fetch(`${this._baseUrl}users?_start=${start}&_end=${end}&_order=${sort['order'][sort['option']]}&_sort=${sort['option']}&q=${searchValue}`)
    if (!res.ok) {
      throw new Error(`could not fetch ${this._baseUrl}users, received ${res.status}`);
    }
    return await res.json();
  }

  static async getAllUsers() {
    let res = await fetch(`${this._baseUrl}users`)
    if (!res.ok) {
      throw new Error(`could not fetch ${this._baseUrl}users, received ${res.status}`);
    }
    return await res.json();
  }

  static async sortBy(sort: string, order: string, page: number) {
    let res = await fetch(`${this._baseUrl}users?_sort=${sort}&_order=${order}&_limit=5&_page=${page}`)
    if (!res.ok) {
      throw new Error(`could not fetch, received ${res.status}`);
    }
    return await res.json();
  }

  static async search(query: string) {
    let res = await fetch(`${this._baseUrl}users?q=${query}&_limit=5`)
    if (!res.ok) {
      throw new Error(`could not fetch ${this._baseUrl}users, received ${res.status}`);
    }
    return await res.json();
  }
}
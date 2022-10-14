

export class db {

  private static _baseUrl: string = 'https://jsonserver-shuric-git.vercel.app/'

  static async getUsers(page: number) {
    let res = await fetch(`${this._baseUrl}users?_limit=5&_page=${page}`)
    if (!res.ok) {
      throw new Error(`could not fetch ${this._baseUrl}users, received ${res.status}`);
    }
    return await res.json();
  }

  static async sortBy(param: string, order: string, page: number) {
    let res = await fetch(`${this._baseUrl}users?_sort=${param}&_order=${order}&_limit=5&_page=${page}`)
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
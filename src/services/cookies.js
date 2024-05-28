export class AppCookie {
    static getDate(days) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + days);
        return dateObj;
    }
    static async getCookie(key) {
        const cookieObj = await cookieStore.get(key)
        return cookieObj?.value;
    }

    static async getAllCookies() {
        const cookiesArr = await cookieStore.getAll();
        return cookiesArr;
    }

    static async setCookies(name, value, days) {
        const cookieObj = { name, value }
        if (days) {
            cookieObj.expires = AppCookie.getDate(days)
        }
        await cookieStore.set(cookieObj)
    }


    static async deleteCookie(key) {
        await cookieStore.delete(key)
    }

    static async hasToken() {
        const cookieObj = await cookieStore.get("token")
        return cookieObj ? true : false
    }
}
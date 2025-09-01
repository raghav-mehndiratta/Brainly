// this is the worst file, all the random stuff is put here

export function random(len : number) {
    let options = "qwertyuioplkjhgfdsazxcvbnm12345678"
    let length = options.length
    let ans = ""
    for(let i = 0; i<len; i++) {
        ans += options[Math.floor(Math.random() * length)]
    }
    return ans
}
const user1 = {
    name: "a", 
    age: 18
}

const user2 = {
    ...user1, 
    age: 20
}

console.log(user1);
console.log(user2);



const map1 = {
    name: "a",
    age: 18
}

for (const [key, value] of Object.entries(map1)) {
    console.log(key, value);
}
console.log(map1)

type SysUser = {
    id: number,
    name: string,
    age: number,
}


const sysUser1: SysUser = {
    id: 1,
    name: "a",
    age: 18
}
const sysUser2 = {
    name: "a",
    age: 18
}

function decorateSysUser(sysUser: Omit<SysUser, "id">) {
    
    const { id, ...userWithoutId } = sysUser;
    console.log(`id: ${id}`);
    return {
        ...userWithoutId,
    }
}
/* 
function decorateSysUser2(sysUser: Omit<SysUser, "id">) {
    const { id, ...userWithoutId } = sysUser as SysUser;
    const finalUser = id !== undefined ? userWithoutId : sysUser;
    return {
        ...sysUser,
    }
} */

console.log(`---${JSON.stringify(decorateSysUser(sysUser1))}---`);
console.log(`---${JSON.stringify(decorateSysUser(sysUser2))}---`);


class A {
    id?: number;
    name?: string;
    
    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }
}

const req = {
    name: "a", 
    age: 18
}

const a1 = new A(undefined, req.name);

const a2 = {
    id: undefined,
    name: req.name
}


console.log(a1);


const x = undefined;
if (!x) {
    console.log("x is false");
}

function sayHello(){
    return "Hello";
}
// 
function delaySayHello() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Delay Hello");
        }, 1000);
    });
}
// 
async function longTimeHello(){
    await setTimeout(()=>{}, 1000); // เพื่อทำการ delay การทำงาน
    return "Long Time Hello";
 }
// 
async function parallelRun(){
    let a = await Promise.all([delaySayHello(), longTimeHello()]);
    console.log(a);
}
parallelRun();

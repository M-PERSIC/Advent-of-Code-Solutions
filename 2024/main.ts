console.log("Hello World!");

function fibonacci(n: number): number {
    if (n <= 1) return 1;
    return fibonacci(n - 2) + fibonacci(n - 1);
}

console.log(fibonacci(9));

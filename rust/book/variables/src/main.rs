fn main() {
    let x: u8 = 255;
    println!("The value of x is: {x}");

    // println!("The value of x is: {}", x + 1);

    let y = 7;

    let y = y + 1;

    {
        let y = y * 2;
        println!("Inner scope {y}");
    }
        
    println!("Outer scope {y}");
    
    println!("Test {}", 5.0 / 3.0);

    let tuple = (1, -1, 0.5);
    let (x, y, z) = tuple;

    println!("x {x}, y {y},  {z}");
    println!("x {}, y {},  {}", tuple.0, tuple.1, tuple.2);


    // let array = [1, 2, 3, 4, 5];
    let array = [4; 6];

    println!("Gibt es {}", array[1]);
    // println!("Gibt es {}", array[10]);
}

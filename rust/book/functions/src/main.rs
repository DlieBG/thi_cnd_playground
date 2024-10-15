fn main() {
    println!("Hello, world!");

    another_function(five());

    print_labled_measurement(10, 'm');
}

fn another_function(x: i32) {
    println!("Test {x}");
}

fn print_labled_measurement(value: i32, unit: char) {
    println!("Labled measurement: {value}{unit}");
}

fn five() -> i32 {
    5
}

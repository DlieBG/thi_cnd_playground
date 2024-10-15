fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {result}");


    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");

            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }

            remaining -= 1;
        }
        
        count += 1;
    }

    println!("End count = {count}");


    let array = [10, 20, 30, 40, 50];
    let mut index = 0;

    while index < array.len() {
        println!("array[{index}] = {}", array[index]);

        index += 1;
    }

    for element in array {
        println!("value = {element}");
    }

    for x in (1..4).rev() {
        println!("{x}!");
    }
    println!("liftoff!");
}

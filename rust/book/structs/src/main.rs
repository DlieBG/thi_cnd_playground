#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // fn area(&self) -> u32 {
    //     self.width * self.height
    // }

    fn can_hold(&self, second: &Rectangle) -> bool {
        self.width >= second.width && self.height >= second.height
    }

    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    let rect2 = Rectangle {
        width: 10,
        height: 20,
    };

    println!("rect1 can hold rect2 = {}", rect1.can_hold(&rect2));

    let square = Rectangle::square(10);
    dbg!(square);
}
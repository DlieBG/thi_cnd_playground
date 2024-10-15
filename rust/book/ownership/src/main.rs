fn main() {
    let s1 = String::from("hello");
    let i1 = 5;

    take_ownership(s1);
    make_copy(i1);
}

fn take_ownership(string: String) {
    println!("{string}");
}

fn make_copy(integer: i32) {
    println!("{integer}");
}

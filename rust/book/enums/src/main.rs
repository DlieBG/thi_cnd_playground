use std::net::Ipv4Addr;

#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

impl IpAddr {
    fn print(&self) {
        match self {
            Self::V4(n1, n2, n3, n4) => println!("Its an IPv4! {n1}.{n2}.{n3}.{n4}"),
            Self::V6(string) => println!("Its an IPv6! {string}"),
        }
    }
}

fn main() {
    let loopback_ipv4 = IpAddr::V4(127, 0, 0, 1);

    let loopback_ipv6 = IpAddr::V6(String::from("::0"));

    loopback_ipv4.print();
    loopback_ipv6.print();


    let value: Option<i32> = None;

    // let value_or_fallback = value.unwrap_or(1);

    let value_or_fallback: i32 = match value {
        Some(value) => value,
        _ => 1,
    };

    println!("{value:#?} becomes to {value_or_fallback}");


    if let IpAddr::V6(address) = loopback_ipv4 {
        println!("This is a IPv6! {address}");
    } else {
        println!("This is not a IPv6!");
    }
}

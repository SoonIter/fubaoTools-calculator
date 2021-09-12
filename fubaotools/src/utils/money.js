import fx from 'money';
fx.base = "人民币";
fx.rates = {
    "美元": 0.1552, // eg. 1 USD === 0.745101 EUR
    "日元": 17.0593, // etc...
    "欧元": 0.1314,
    "韩元": 181.5999, // always include the base rate (1:1)
    "澳元": 0.2110,
    "港元": 1.207,
    "英镑": 0.1121,
    "人民币": 1,
}
export default fx;

/*
how to use ?
example:
fx(1000).from("USD").to("GBP");
*/
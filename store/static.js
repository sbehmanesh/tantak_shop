export const state = () => ({
    basket_status,
    status_pay,
    seller_types
})

let basket_status = [
    { text: 'در انتظار تائید پرداخت بانک', value: 'waiting' },
    { text: 'پرداخت شده', value: 'payed' },
    { text: 'ارسال شده', value: 'completed' },
    { text: 'لغو شده', value: 'canceled' },
    { text: 'باز', value: 'open' },
]

let seller_types = [
    { text: 'فروش حضوری', value: 'real_shop' },
    { text: 'فروش آنلاین', value: 'virtual_shop' },
    { text: 'هر دو', value: 'both' },
]
let status_pay = [
    {text:"منتظر پرداخت" , value:"wait"},
    {text:"پرداخت شده" , value:"payed"},
    {text:"پرداخت نشده" , value:"unpayed"},
    {text:"برگشت داده شده" , value:"reject"},
    {text:"کنسل شده" , value:"cancled"},
    {text:"عودت وجه" , value:"owdat"},
]
export const state = () => ({
    basket_status,
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
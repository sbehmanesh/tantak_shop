let jmoment = require('jalali-moment')

export default ({ redirect, store, $toast }, inject) => {
  inject('reloadPage', () => {
    window.location.reload()
  })
  inject('reloadLogin', () => {
    window.location.href = '/'
  })

  inject('scrollToTop', () => {
    window.scrollTo(0, 0);

  })

  inject('scrollTo', (x,y) => {
    window.scrollTo(x, y);

  })
  inject('FarsiToEnglishNumber', (stringNumber) => {
    return String(
      stringNumber
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
          return d.charCodeAt(0) - 1632 // Convert Arabic numbers
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
          return d.charCodeAt(0) - 1776 // Convert Persian numbers
        })
    )
  })
  inject('inpRules', () => {
    return {
      require: (v) =>
        (typeof v != 'undefined' && v !== '' && v != null && v.toString().replace(/\s/g, '') != '') || 'کامل نشده',
      max_200: (v) => !v || v.length <= 200 || 'حداکثر 200 حرف',
      fa_chart: (v) => !v || /^[\u0600-\u06FF ]+$/.test(v) || 'فقط حروف فارسی',
      en_chart: (v) => !v || /^[a-z A-Z 0-9 \- _ \.]+$/.test(v) || 'عدد و حروف انگلیسی',
      number: (v) => !v || /^[0-9][0-9]*$/.test(v) || 'فقط اعداد صحیح',
      number_float: (v) => !v || /^[1-9][0-9 .]*$/.test(v) || 'فقط اعداد صحیح و اعشاری',
      min_6: (v) => !v || v.length >= 6 || 'حداقل 6 حرف',
      min_1: (v) => !v || v.length >= 1 || 'حداقل یک مورد انتخاب بشود',
      weekday: (v) => !v || (1 <= v && v <= 7) || 'عدد بین 1 تا 7',
      hoursTime: (v) => !v || (0 <= v && v <= 24) || 'عدد بین 0 تا 24',
      percent: (v) => !v || (0 <= v && v <= 100) || 'عدد بین 0 تا 100',
      phone: (v) => !v || v.length == 11 || 'شماره تلفن درست وارد نشده',
      phone_no_city: (v) => !v || (v.length >= 4 && v.length < 16) || 'شماره تلفن درست وارد نشده',
      mobile: (v) =>
        !v ||
        (/^(9|٩|۹)/.test(v) && v.length == 10) ||
        (/^(0|0|0)/.test(v) && v.length == 11) ||
        'شماره وارد شده صحیح نیست',
      nationalCode: (v) => !v || v.length == 10 || 'کد ملی اشتباه است',
      postCode: (v) => !v || v.length == 10 || 'کدپستی درست وارد نشده',
      cityCode: (v) => !v || v.length == 3 || 'کدشهر نامعتبر',
      email: (v) =>
        !v ||
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) ||
        'پست الکترونیکی نامعتبر',
      plate: (v) =>
        !v ||
        (/\d{2}-[\u0600-\u06FF]{1,3}-\d{3}-\d{2}/.test(v) && (v.length == 11 || v.length == 13)) ||
        'پلاک وارد شده نامعتبر',
      password: [
        (v) => !v || /[a-zA-Z0-9._!@#$%^&*\(\)]+$/.test(v) || 'حروف نامعتبر',
        (v) => !v || /.*[A-Z a-z].*/.test(v) || 'حداقل یک حرف انگلیسی',
        (v) => !v || /.*\d.*/.test(v) || 'حداقل یک عدد',
        (v) => !v || /.*[_!@#$%^&*\(\)].*/.test(v) || 'حداقل یک حرف خاص _!@#$%^&*',
        (v) => !v || v.length >= 6 || 'حداقل طول 6 حرف',
      ],
    }
  })
  inject('copyForm', (form) => {
    let new_form = {}
    for (const key in form) {
      if (typeof form[key] != 'undefined' && form[key] !== '' && form[key] != null) {
        new_form[key] = form[key]
      }
    }
    return new_form
  })
  inject('checkNotNull', (...item) => {
    for (let index = 0; index < item.length; index++) {
      const element = item[index]
      if (typeof element == 'undefined' || element === '' || element === '' || element === null) {
        return false
      }
    }
    return true
  })
  inject('stringToRegex', (str) => {
    const main = str.match(/\/(.+)\/.*/)[1]
    const options = str.match(/\/.+\/(.*)/)[1]
    return new RegExp(main, options)
  })
  inject('jmoment', jmoment)
  inject('toJalali', (date, format_in = 'YYYY-MM-DDTHH:mm:ss.SSSZ', format_out = 'HH:mm jYYYY/jMM/jDD') => {
    try {
      return jmoment(date, format_in).format(format_out)
    } catch (error) {
      return date
    }
  })
  inject('getItemEnum', (items, key) => {
    try {
      let item = items.filter(
        (x) => x.value.toString().toLowerCase() == key.toString().toLowerCase()
      )
      if (item.length > 0) {
        return item.map((x) => x.text).join(' , ')
      }
    } catch (error) { }
    return '-'
  })
  inject('priceRial', (money) => {
    try {
      return Number(money / 10).toLocaleString()
    } catch (error) {
      return money
    }
  })
  inject('price', (money) => {
    try {
      return Number(money).toLocaleString()
    } catch (error) {
      return money
    }
  })
  inject('getImage', (url, blog = false) => {
    if (typeof url != 'string' || !url) {
      if (blog) {
          return '/image/default.png'
      }
      return '/no_image.png'
    }
    if (url.indexOf('http') == 0) {
      return url
    }
    if (url.indexOf('/') == 0) {
      url = url.replace('/', '')
    }
    return store.state.file_url + url
  })
  inject('resizeImage', (src) => {
    if (!src) return null
    if (!src.includes("resize")) {
      src = src.replace("upload/", "upload/resize/")
    }
    return src
  })
  inject('getPrice', (service) => {
    service['discount_price'] = 0
    service['discount_type_text'] = ''
    // service['price'] = service.price / 10
    if (service && service.price) {
      if (service.discount_type == 'count') {
        service['discount_price'] = service.price - service.discount
        let discount_percent = 100 - (service['discount_price'] * 100) / service.price

        service['discount_type_text'] = `%${discount_percent.toFixed()}`
      } else {
        service['discount_price'] = parseFloat(service.price - (service.price * service.discount) / 100)
        service['discount_type_text'] = `%${service.discount}`
      }
    }
    return service
  })
  inject('parseCookie', (cookie) => {
    try {
      return cookie
        .split(';')
        .map((x) => x.split('='))
        .reduce((pre, cur) => {
          let value = decodeURIComponent(cur[1].trim())
          if (typeof value == 'string' && value.length > 0 && ['[', '{'].indexOf(value[0]) > -1) {
            try {
              value = JSON.parse(value)
            } catch (error) { }
          }
          pre[decodeURIComponent(cur[0].trim())] = value
          return pre
        }, {})
    } catch (error) {
      return {}
    }
  })
}

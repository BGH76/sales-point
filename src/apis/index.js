import axios from 'axios'

export default axios.create({
    baseURL: 'https://my-point-of-sale.herokuapp.com'
})
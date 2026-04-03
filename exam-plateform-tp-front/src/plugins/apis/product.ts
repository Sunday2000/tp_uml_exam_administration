import camera from '@/assets/product/camera.png'
import grinder from '@/assets/product/grinder.png'
import headphone from '@/assets/product/headphone.png'
import iphone from '@/assets/product/iphone.png'
import laptop from '@/assets/product/laptop.png'
import monitor from '@/assets/product/monitor.png'
import printer from '@/assets/product/printer.png'
import smartWatch from '@/assets/product/smart-watch.png'
import mock from './mock'
import type { Product } from './types'

const products: Product[] = [
  {
    id: 1,
    image: iphone,
    name: 'iPhone 14',
    rating: 4,
    totalRating: 10,
    totalReview: 9,
    price: 432,
    discount: 10,
    details: [
      '3 GB RAM | 32 GB ROM | Expandable Upto 512 GB',
      '13MP Rear Camera | 5MP Front Camera',
      '5000 mAh Li-Polymer Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 2,
    image: camera,
    name: 'Nick Camera',
    rating: 4.2,
    totalRating: 25,
    totalReview: 22,
    price: 99,
    discount: 15,
    details: [
      '3 GB RAM | 32 GB ROM | Expandable Upto 256 GB',
      '13MP + 2MP + 2MP Rear Camera | 5MP Front Camera',
      '5000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 3,
    image: laptop,
    name: 'Laptop',
    rating: 4.1,
    totalRating: 15,
    totalReview: 13,
    price: 69,
    discount: 12,
    details: [
      '2 GB RAM | 32 GB ROM | Expandable Upto 256 GB',
      '8MP + AI Lens Dual Rear Camera | 8MP Front Camera',
      '5000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 4,
    image: smartWatch,
    name: 'SmartWatch',
    rating: 4.3,
    totalRating: 45,
    totalReview: 40,
    price: 99,
    discount: 18,
    details: [
      '4 GB RAM | 64 GB ROM | Expandable Upto 256 GB',
      '13MP + 2MP Dual Rear Camera | 8MP Front Camera',
      '6000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 5,
    image: monitor,
    name: 'Monitor',
    rating: 4.2,
    totalRating: 50,
    totalReview: 50,
    price: 199,
    discount: 15,
    details: [
      '4 GB RAM | 64 GB ROM | Expandable Upto 1 TB',
      '48MP + 5MP + 2MP + 2MP Quad Rear Camera | 8MP Front Camera',
      '6000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 5,
    image: headphone,
    name: 'Beat Headphone',
    rating: 4.5,
    totalRating: 5,
    totalReview: 4,
    price: 84,
    discount: 15,
    details: [
      'Intel Core i7-10750H Processor',
      'NVIDIA GeForce GTX 1650 Graphics',
      '16 GB RAM | 512 GB SSD',
      '15.6-inch FHD IPS Display',
      'Windows 10 Home | Backlit Keyboard | B&O Play Audio',
      '1 Year Warranty',
    ],
  },
  {
    id: 6,
    image: printer,
    name: 'Laser Printer',
    rating: 4.2,
    totalRating: 12,
    totalReview: 20,
    price: 40,
    discount: 10,
    details: [
      'AMD Ryzen 5 Quad Core 3500U Processor',
      '8 GB DDR4 RAM | 1 TB HDD',
      '15.6 inch HD LED Backlit BrightView Display',
      'Windows 10 Home | MS Office',
      '1 Year Onsite Warranty',
    ],
  },
  {
    id: 7,
    image: grinder,
    name: 'Grinder 25 W',
    rating: 4.1,
    totalRating: 10,
    totalReview: 9,
    price: 39,
    discount: 20,
    details: [
      '750 W Power Consumption',
      '3 Stainless Steel Jars',
      '3 Speed Control with Incher',
      'Overload Protection',
      '2 Years Warranty on Product and 5 Years on Motor',
    ],
  },
  {
    id: 8,
    image: iphone,
    name: 'iPhone 14',
    rating: 4,
    totalRating: 10,
    totalReview: 9,
    price: 432,
    discount: 10,
    details: [
      '3 GB RAM | 32 GB ROM | Expandable Upto 512 GB',
      '13MP Rear Camera | 5MP Front Camera',
      '5000 mAh Li-Polymer Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 9,
    image: camera,
    name: 'Nick Camera',
    rating: 4.2,
    totalRating: 25,
    totalReview: 22,
    price: 99,
    discount: 15,
    details: [
      '3 GB RAM | 32 GB ROM | Expandable Upto 256 GB',
      '13MP + 2MP + 2MP Rear Camera | 5MP Front Camera',
      '5000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 10,
    image: laptop,
    name: 'Laptop',
    rating: 4.1,
    totalRating: 15,
    totalReview: 13,
    price: 69,
    discount: 12,
    details: [
      '2 GB RAM | 32 GB ROM | Expandable Upto 256 GB',
      '8MP + AI Lens Dual Rear Camera | 8MP Front Camera',
      '5000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 11,
    image: smartWatch,
    name: 'SmartWatch',
    rating: 4.3,
    totalRating: 45,
    totalReview: 40,
    price: 99,
    discount: 18,
    details: [
      '4 GB RAM | 64 GB ROM | Expandable Upto 256 GB',
      '13MP + 2MP Dual Rear Camera | 8MP Front Camera',
      '6000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 12,
    image: monitor,
    name: 'Monitor',
    rating: 4.2,
    totalRating: 50,
    totalReview: 50,
    price: 199,
    discount: 15,
    details: [
      '4 GB RAM | 64 GB ROM | Expandable Upto 1 TB',
      '48MP + 5MP + 2MP + 2MP Quad Rear Camera | 8MP Front Camera',
      '6000 mAh Battery',
      '1 Year Warranty for Mobile and 6 Months for Accessories',
    ],
  },
  {
    id: 13,
    image: headphone,
    name: 'Beat Headphone',
    rating: 4.5,
    totalRating: 5,
    totalReview: 4,
    price: 84,
    discount: 15,
    details: [
      'Intel Core i7-10750H Processor',
      'NVIDIA GeForce GTX 1650 Graphics',
      '16 GB RAM | 512 GB SSD',
      '15.6-inch FHD IPS Display',
      'Windows 10 Home | Backlit Keyboard | B&O Play Audio',
      '1 Year Warranty',
    ],
  },
  {
    id: 14,
    image: printer,
    name: 'Laser Printer',
    rating: 4.2,
    totalRating: 12,
    totalReview: 20,
    price: 40,
    discount: 10,
    details: [
      'AMD Ryzen 5 Quad Core 3500U Processor',
      '8 GB DDR4 RAM | 1 TB HDD',
      '15.6 inch HD LED Backlit BrightView Display',
      'Windows 10 Home | MS Office',
      '1 Year Onsite Warranty',
    ],
  },
  {
    id: 15,
    image: grinder,
    name: 'Grinder 25 W',
    rating: 4.1,
    totalRating: 10,
    totalReview: 9,
    price: 39,
    discount: 20,
    details: [
      '750 W Power Consumption',
      '3 Stainless Steel Jars',
      '3 Speed Control with Incher',
      'Overload Protection',
      '2 Years Warranty on Product and 5 Years on Motor',
    ],
  },
]

mock.onGet('/products').reply(() => {
  // const { q = '' } = request.params || { q: '' }
  // const queryLower = q.toLowerCase()

  // const filterDb = products.filter(product => {
  //   return product.name.toLowerCase().includes(queryLower)
  // })

  return [200, { products }]
})

mock.onGet('/product/delete').reply(request => {
  const { productId } = request.params

  const index = products.findIndex(i => i.id === productId)

  products.splice(index, 1)

  return [200, products]
})

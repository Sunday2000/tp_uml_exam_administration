import mock from './mock'
import type { Invoice } from './types'

const invoices: Invoice[] = [
  {
    invoiceNumber: 'INV0001',
    customerName: 'John Smith',
    invoiceDate: '2022-01-01',
    dueDate: '2022-02-01',
    totalAmount: 1000.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'John Smith',
      address: '2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827',
      phone: '955-439-2578',
    },
    products: [
      {
        name: 'Leather Journal',
        description: 'Premium quality leather journal for writing and note-taking',
        quantity: 1,
        price: 250.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0002',
    customerName: 'Samantha Kim',
    invoiceDate: '2022-02-05',
    dueDate: '2022-03-05',
    totalAmount: 250.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Samantha Kim',
      address: '1207 Main Street Apt. 36 - Miami, FL / 33130',
      phone: '305-578-1234',
    },
    products: [
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Reusable water bottle made from high-quality stainless steel',
        quantity: 2,
        price: 250.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
      {
        name: 'Body Health Tracker',
        description: 'A smart scale that measures weight, body fat percentage, and BMI. It connects to your phone or tablet via Bluetooth and tracks your progress over time.',
        quantity: 1,
        price: 200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0003',
    customerName: 'Emily Thompson',
    invoiceDate: '2022-03-15',
    dueDate: '2022-04-15',
    totalAmount: 500.00,
    status: 'unpaid',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Emily Thompson',
      address: '9083 West Street - San Francisco, CA / 94103',
      phone: '415-555-1234',
    },
    products: [
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Reusable water bottle made from high-quality stainless steel',
        quantity: 2,
        price: 250.0,
      },
      {
        name: 'Leather Journal',
        description: 'Premium quality leather journal for writing and note-taking',
        quantity: 1,
        price: 250.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0004',
    customerName: 'Robert Johnson',
    invoiceDate: '2022-04-10',
    dueDate: '2022-05-10',
    totalAmount: 750.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Robert Johnson',
      address: '4494 Prospect Street - Seattle, WA / 98109',
      phone: '206-555-5678',
    },
    products: [
      {
        name: 'Wireless Headphones',
        description: 'Bluetooth headphones with noise-cancellation feature',
        quantity: 3,
        price: 250.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
      {
        name: 'Body Health Tracker',
        description: 'A smart scale that measures weight, body fat percentage, and BMI. It connects to your phone or tablet via Bluetooth and tracks your progress over time.',
        quantity: 1,
        price: 200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0005',
    customerName: 'John Smith',
    invoiceDate: '2022-01-01',
    dueDate: '2022-02-01',
    totalAmount: 1000.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'John Smith',
      address: '2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827',
      phone: '955-439-2578',
    },
    products: [
      {
        name: 'Ergonomic Rubber Chair',
        description: 'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestia',
        quantity: 1,
        price: 1000.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
      {
        name: 'Body Health Tracker',
        description: 'A smart scale that measures weight, body fat percentage, and BMI. It connects to your phone or tablet via Bluetooth and tracks your progress over time.',
        quantity: 1,
        price: 200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0006',
    customerName: 'Jane Doe',
    invoiceDate: '2022-01-05',
    dueDate: '2022-02-05',
    totalAmount: 750.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Jane Doe',
      address: '776 Main Street - Houston, TX / 77002',
      phone: '713-555-5678',
    },
    products: [
      {
        name: 'Smart Watch',
        description: 'A sleek and modern watch with fitness tracking and phone connectivity',
        quantity: 1,
        price: 750.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0007',
    customerName: 'Robert Lee',
    invoiceDate: '2022-01-10',
    dueDate: '2022-02-10',
    totalAmount: 2000.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Robert Lee',
      address: '1296 Eglinton Avenue East - Toronto, ON / M4P 1E4',
      phone: '416-555-2468',
    },
    products: [
      {
        name: 'Gaming Laptop',
        description: 'High-performance laptop with advanced graphics and processing power',
        quantity: 1,
        price: 2000.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0008',
    customerName: 'Alexandre Dubois',
    invoiceDate: '2022-01-20',
    dueDate: '2022-02-20',
    totalAmount: 1200.00,
    status: 'unpaid',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Alexandre Dubois',
      address: '4095 Rue Saint-Denis - Montreal, QC / H2W 2M7',
      phone: '514-555-5678',
    },
    products: [
      {
        name: 'Ultra HD Smart TV',
        description: 'A top-of-the-line television with stunning 4K resolution and smart features',
        quantity: 1,
        price: 1200.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'Body Health Tracker',
        description: 'A smart scale that measures weight, body fat percentage, and BMI. It connects to your phone or tablet via Bluetooth and tracks your progress over time.',
        quantity: 1,
        price: 200.0,
      },
      {
        name: 'Active Bracelet',
        description: 'A fitness tracker bracelet that helps you stay active by monitoring your daily activity, including steps taken, calories burned, and distance traveled. It also reminds you to move if you\'ve been sitting for too long.',
        quantity: 1,
        price: 100.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0009',
    customerName: 'Emily Rodriguez',
    invoiceDate: '2022-01-25',
    dueDate: '2022-02-25',
    totalAmount: 650.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Emily Rodriguez',
      address: '456 Second Street - Tampa, FL / 33602',
      phone: '813-555-5678',
    },
    products: [
      {
        name: 'Wireless Earbuds',
        description: 'High-quality earbuds with noise-cancelling and long battery life',
        quantity: 1,
        price: 650.0,
      },
      {
        name: 'Health Watch',
        description: 'A smartwatch that tracks fitness and health metrics, including heart rate, sleep quality, steps taken, and calories burned.',
        quantity: 1,
        price: 600.0,
      },
      {
        name: 'FitBand',
        description: 'A fitness tracker band that monitors your workouts, tracks your sleep, and counts your steps. It has a long battery life and is compatible with both iOS and Android devices.',
        quantity: 1,
        price: 150.0,
      },
      {
        name: 'Wellness Monitor',
        description: 'A wearable device that measures your daily activity, including steps taken, calories burned, and distance traveled. It also tracks your heart rate and sleep patterns to give you a comprehensive overview of your overall health.',
        quantity: 1,
        price: 400.0,
      },
      {
        name: 'Body Health Tracker',
        description: 'A smart scale that measures weight, body fat percentage, and BMI. It connects to your phone or tablet via Bluetooth and tracks your progress over time.',
        quantity: 1,
        price: 200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0010',
    customerName: 'Tom Brown',
    invoiceDate: '2022-02-01',
    dueDate: '2022-03-01',
    totalAmount: 1500.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Tom Brown',
      address: '234 Elm Street - New York, NY / 10001',
      phone: '212-555-5678',
    },
    products: [
      {
        name: 'Smartphone',
        description: 'The latest and greatest smartphone with advanced features and performance',
        quantity: 1,
        price: 1500.0,
      },
      {
        name: 'Ultra HD Smart TV',
        description: 'A top-of-the-line television with stunning 4K resolution and smart features',
        quantity: 1,
        price: 1200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0011',
    customerName: 'Tom Brown',
    invoiceDate: '2022-02-01',
    dueDate: '2022-03-01',
    totalAmount: 1500.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Tom Brown',
      address: '234 Elm Street - New York, NY / 10001',
      phone: '212-555-5678',
    },
    products: [
      {
        name: 'Smartphone',
        description: 'The latest and greatest smartphone with advanced features and performance',
        quantity: 1,
        price: 1500.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0012',
    customerName: 'Emma Wilson',
    invoiceDate: '2022-02-05',
    dueDate: '2022-03-05',
    totalAmount: 850.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Emma Wilson',
      address: '890 Tenth Street - Washington, DC / 20005',
      phone: '202-555-5678',
    },
    products: [
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones with long battery life and excellent sound quality',
        quantity: 1,
        price: 850.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0013',
    customerName: 'Jessica Lee',
    invoiceDate: '2022-02-10',
    dueDate: '2022-03-10',
    totalAmount: 2000.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Jessica Lee',
      address: '567 Fifth Avenue - Los Angeles, CA / 90001',
      phone: '213-555-5678',
    },
    products: [
      {
        name: 'Gaming Laptop',
        description: 'A high-performance laptop designed for gaming and heavy-duty workloads',
        quantity: 1,
        price: 2000.0,
      },
      {
        name: 'Fitness Tracker',
        description: 'A smart wearable device for tracking fitness and health metrics',
        quantity: 1,
        price: 750.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0014',
    customerName: 'Sophia Hernandez',
    invoiceDate: '2022-02-20',
    dueDate: '2022-03-20',
    totalAmount: 750.00,
    status: 'unpaid',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Sophia Hernandez',
      address: '234 Elm Street - Portland, OR / 97201',
      phone: '503-555-5678',
    },
    products: [
      {
        name: 'Fitness Tracker',
        description: 'A smart wearable device for tracking fitness and health metrics',
        quantity: 1,
        price: 750.0,
      },
      {
        name: 'Gaming Laptop',
        description: 'A high-performance laptop designed for gaming and heavy-duty workloads',
        quantity: 1,
        price: 2000.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0015',
    customerName: 'Daniel Kim',
    invoiceDate: '2022-02-25',
    dueDate: '2022-03-25',
    totalAmount: 1200.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Daniel Kim',
      address: '567 Fifth Avenue - San Francisco, CA / 94101',
      phone: '415-555-5678',
    },
    products: [
      {
        name: 'Smart Watch',
        description: 'A versatile smartwatch with a variety of features and functions',
        quantity: 1,
        price: 1200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0016',
    customerName: 'William Davis',
    invoiceDate: '2022-03-01',
    dueDate: '2022-04-01',
    totalAmount: 2500.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'William Davis',
      address: '456 Second Street - Los Angeles, CA / 90001',
      phone: '213-555-5678',
    },
    products: [
      {
        name: '4K TV',
        description: 'A high-quality 4K TV with excellent picture and sound',
        quantity: 1,
        price: 2500.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0017',
    customerName: 'William Davis',
    invoiceDate: '2022-03-01',
    dueDate: '2022-04-01',
    totalAmount: 2500.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'William Davis',
      address: '456 Second Street - Los Angeles, CA / 90001',
      phone: '213-555-5678',
    },
    products: [
      {
        name: '4K TV',
        description: 'A high-quality 4K TV with excellent picture and sound',
        quantity: 1,
        price: 2500.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0018',
    customerName: 'Ethan Brown',
    invoiceDate: '2022-03-05',
    dueDate: '2022-04-05',
    totalAmount: 350.00,
    status: 'unpaid',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Ethan Brown',
      address: '234 Elm Street - Seattle, WA / 98101',
      phone: '206-555-5678',
    },
    products: [
      {
        name: 'Bluetooth Speaker',
        description: 'A portable speaker with great sound quality and long battery life',
        quantity: 1,
        price: 350.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0019',
    customerName: 'Hannah Lee',
    invoiceDate: '2022-03-10',
    dueDate: '2022-04-10',
    totalAmount: 1200.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Hannah Lee',
      address: '123 Fourth Street - San Francisco, CA / 94101',
      phone: '415-555-5678',
    },
    products: [
      {
        name: 'Smartphone',
        description: 'A high-end smartphone with a large screen and fast processor',
        quantity: 1,
        price: 1200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0020',
    customerName: 'Isabella Scott',
    invoiceDate: '2022-03-15',
    dueDate: '2022-04-15',
    totalAmount: 420.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Isabella Scott',
      address: '234 Elm Street - Seattle, WA / 98101',
      phone: '206-555-5678',
    },
    products: [
      {
        name: 'Wireless Earbuds',
        description: 'Comfortable and high-quality earbuds with noise cancellation',
        quantity: 1,
        price: 420.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0021',
    customerName: 'Liam Turner',
    invoiceDate: '2022-03-20',
    dueDate: '2022-04-20',
    totalAmount: 750.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Liam Turner',
      address: '123 Fourth Street - San Francisco, CA / 94101',
      phone: '415-555-5678',
    },
    products: [
      {
        name: 'Smart Watch',
        description: 'A high-tech smartwatch with a variety of features and a long battery life',
        quantity: 1,
        price: 750.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0022',
    customerName: 'Evelyn Adams',
    invoiceDate: '2022-03-22',
    dueDate: '2022-04-22',
    totalAmount: 800.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Evelyn Adams',
      address: '123 Fourth Street - San Francisco, CA / 94101',
      phone: '415-555-5678',
    },
    products: [
      {
        name: 'Laptop',
        description: 'A high-performance laptop with a large display and fast processor',
        quantity: 1,
        price: 800.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0023',
    customerName: 'Daniel Turner',
    invoiceDate: '2022-03-25',
    dueDate: '2022-04-25',
    totalAmount: 250.00,
    status: 'EMI',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Daniel Turner',
      address: '234 Elm Street - Seattle, WA / 98101',
      phone: '206-555-5678',
    },
    products: [
      {
        name: 'Smart Watch',
        description: 'A sleek and stylish smartwatch with fitness tracking capabilities',
        quantity: 1,
        price: 250.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0024',
    customerName: 'Michael Baker',
    invoiceDate: '2022-03-28',
    dueDate: '2022-04-28',
    totalAmount: 1200.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Michael Baker',
      address: '456 Second Street - Los Angeles, CA / 90001',
      phone: '213-555-5678',
    },
    products: [
      {
        name: 'Desktop Computer',
        description: 'A powerful desktop computer with a large monitor and fast processor',
        quantity: 1,
        price: 1200.0,
      },
    ],
  },
  {
    invoiceNumber: 'INV0024',
    customerName: 'Aiden Wright',
    invoiceDate: '2022-03-28',
    dueDate: '2022-04-28',
    totalAmount: 3000.00,
    status: 'full',
    from: {
      name: 'Xyz Pvt Ltd',
      address: '754 Broadway Avenue - New York, NY / 10013',
      phone: '990-588-5716',
    },
    to: {
      name: 'Aiden Wright',
      address: '123 Fourth Street - San Francisco, CA / 94101',
      phone: '415-555-5678',
    },
    products: [
      {
        name: 'Smartphone',
        description: 'A high-end smartphone with a large display and advanced camera system',
        quantity: 1,
        price: 1000.0,
      },
      {
        name: 'Wireless Earbuds',
        description: 'Premium wireless earbuds with noise-cancellation and long battery life',
        quantity: 1,
        price: 200.0,
      },
      {
        name: 'Smartwatch',
        description: 'A sleek and stylish smartwatch with fitness tracking capabilities',
        quantity: 1,
        price: 800.0,
      },
      {
        name: 'Laptop',
        description: 'A high-performance laptop with a large display and fast processor',
        quantity: 1,
        price: 1000.0,
      },
    ],
  },
]

mock.onGet('/invoices').reply(() => {
  return [200, invoices]
})

mock.onGet('/invoice').reply(config => {
  const { invoiceId } = config.params

  if (invoiceId) {
    const invoice = invoices.map(item => {
      if (item.invoiceNumber.toLowerCase() === invoiceId.toLowerCase())
        return item

      return false
    })

    if (invoice.filter(Boolean).length)
      return [200, invoice.filter(Boolean)]
  }

  return [200, { msg: 'No invoice found' }]
})

mock.onGet('/invoice/delete').reply(request => {
  const { invoiceId } = request.params

  const invoiceIndex = invoices.findIndex(i => i.invoiceNumber === invoiceId)

  invoices.splice(invoiceIndex, 1)

  return [200, invoices]
})

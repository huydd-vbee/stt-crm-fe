import customerIcon from '@src/assets/icons/customer-circle.png';
import requestIcon from '@src/assets/icons/detail-invoice.png';
import successIcon from '@src/assets/icons/success-icon.png';
import failedIcon from '@src/assets/icons/failed-icon.png';
import configIcon from '@src/assets/icons/config-icon.png';
import shoppingIcon from '@src/assets/icons/shopping-circle.png';
import freeIcon from '@src/assets/icons/no-shopping-circle.png';
import totalRevenueIcon from '@src/assets/icons/icon-total-revenue.png';

export const numberOfPaidUsers = 10000;

export const fakePartnerAppInformation = {
  "partner": "AICC"
}

export const fakeUsers =  [
  {
    "id": "AICC92a74d95-f9ca-4859-a322-ffc71c42b18f",
    "request_counts": [
      {
        "count": 21
      },
      {
        "count": 356,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "92a74d95-f9ca-4859-a322-ffc71c42b18f",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC336e62de-9413-4c65-bd34-e2d6dbf274f5",
    "request_counts": [
      {
        "count": 2
      },
      {
        "count": 413,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "336e62de-9413-4c65-bd34-e2d6dbf274f5",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICCc27115ef-8255-483b-a2dc-c812084dd9f1",
    "request_counts": [
      {
        "count": 14,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "c27115ef-8255-483b-a2dc-c812084dd9f1",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICCc2164eb8-725b-473e-a07c-3b4a3efb4301",
    "request_counts": [
      {
        "count": 4,
        "status": "Failed"
      },
      {
        "count": 1438,
        "status": "Succeeded"
      },
      {
        "count": 7
      }
    ],
    "sender": {
      "sender_app_id": "c2164eb8-725b-473e-a07c-3b4a3efb4301",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC9988cbf3-c1ba-4b41-9d36-9ddd08660899",
    "request_counts": [
      {
        "count": 10
      },
      {
        "count": 6,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "9988cbf3-c1ba-4b41-9d36-9ddd08660899",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC",
    "request_counts": [
      {
        "count": 387
      },
      {
        "count": 20040,
        "status": "Succeeded"
      },
      {
        "count": 12,
        "status": "Failed"
      }
    ],
    "sender": {
      "sender_app_id": "",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICCdd7d0b6b-ea00-43c0-99af-8ae27253cef6",
    "request_counts": [
      {
        "count": 4,
        "status": "Failed"
      },
      {
        "count": 107,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "dd7d0b6b-ea00-43c0-99af-8ae27253cef6",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC8b7a6c19-bfbb-4502-b1e0-9a581b7ddee2",
    "request_counts": [
      {
        "count": 8,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "8b7a6c19-bfbb-4502-b1e0-9a581b7ddee2",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC26f90cba-712a-4276-9227-26f3d755c217",
    "request_counts": [
      {
        "count": 4,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "26f90cba-712a-4276-9227-26f3d755c217",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC19f7d33b-66dc-4f96-aec1-6c38f4179c97",
    "request_counts": [
      {
        "count": 1,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "19f7d33b-66dc-4f96-aec1-6c38f4179c97",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICC89eeedc6-f105-4fee-a1dd-ecf383b46e36",
    "request_counts": [
      {
        "count": 61619,
        "status": "Succeeded"
      },
      {
        "count": 3145
      }
    ],
    "sender": {
      "sender_app_id": "89eeedc6-f105-4fee-a1dd-ecf383b46e36",
      "sender_name": "AICC"
    }
  },
  {
    "id": "AICCrandom_app_id",
    "request_counts": [
      {
        "count": 4,
        "status": "Succeeded"
      }
    ],
    "sender": {
      "sender_app_id": "random_app_id",
      "sender_name": "AICC"
    }
  },
];

export const fakeStats = [
  {
    title: 'totalCustomerTitle',
    number: 1000,
    icon: customerIcon,
  },
  {
    title: 'totalRequest',
    number: 1000,
    icon: requestIcon,
  },
  {
    title: 'totalSuccessRequest',
    number: 0,
    icon: successIcon,
  },
  {
    title: 'totalFailedRequest',
    number: 0,
    icon: failedIcon,
  },
  {
    title: 'totalRunningRequest',
    number: 0,
    icon: configIcon,
  },
  {
    title: 'paidDuration',
    number: 0,
    icon: shoppingIcon,
  },
  {
    title: 'freeDuration',
    number: 0,
    icon: freeIcon,
  },
  {
    title: 'totalRevenue',
    number: 0,
    icon: totalRevenueIcon,
  },
];

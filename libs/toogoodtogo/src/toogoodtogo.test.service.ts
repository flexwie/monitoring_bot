import { ITooGoodToGoService } from '@app/toogoodtogo/type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TooGoodToGoTestService implements ITooGoodToGoService {
  async login(email: string, chat_id: number) {}

  async getFavorites(chat_id: number) {
    return [data];
  }

  async refresh() {}
}

const data: any = {
  item: {
    item_id: '512843',
    sales_taxes: [
      {
        tax_description: 'VAT',
        tax_percentage: 7,
      },
    ],
    tax_amount: {
      code: 'EUR',
      minor_units: 26,
      decimals: 2,
    },
    price_excluding_taxes: {
      code: 'EUR',
      minor_units: 374,
      decimals: 2,
    },
    price_including_taxes: {
      code: 'EUR',
      minor_units: 400,
      decimals: 2,
    },
    value_excluding_taxes: {
      code: 'EUR',
      minor_units: 1121,
      decimals: 2,
    },
    value_including_taxes: {
      code: 'EUR',
      minor_units: 1200,
      decimals: 2,
    },
    taxation_policy: 'PRICE_INCLUDES_TAXES',
    show_sales_taxes: false,
    cover_picture: {
      picture_id: '322225',
      current_url:
        'https://images.tgtg.ninja/item/cover/efb3475a-b722-4a4b-a3cb-86d287895f2f.jpg',
      is_automatically_created: false,
    },
    logo_picture: {
      picture_id: '563967',
      current_url:
        'https://images.tgtg.ninja/storebulkimport/logo/32750/26b884e2-3194-4287-9272-dde89ed82b5d.jpg',
      is_automatically_created: false,
    },
    name: '',
    description:
      'Bei Royal Donuts können Donuts, Balls und Crossnuts für dich übrigbleiben, ob mit oder ohne Füllung, auf jeden Fall handgemacht!',
    food_handling_instructions: '',
    can_user_supply_packaging: false,
    packaging_option: 'MUST_BRING_BAG',
    collection_info: '',
    diet_categories: ['VEGETARIAN'],
    item_category: 'BAKED_GOODS',
    buffet: false,
    badges: [
      {
        badge_type: 'OVERALL_RATING_TRUST_SCORE',
        rating_group: 'LOVED',
        percentage: 90,
        user_count: 40,
        month_count: 5,
      },
      {
        badge_type: 'SERVICE_RATING_SCORE',
        rating_group: 'LOVED',
        percentage: 95,
        user_count: 40,
        month_count: 5,
      },
    ],
    positive_rating_reasons: [
      'POSITIVE_FEEDBACK_DELICIOUS_FOOD',
      'POSITIVE_FEEDBACK_QUICK_COLLECTION',
      'POSITIVE_FEEDBACK_FRIENDLY_STAFF',
      'POSITIVE_FEEDBACK_GREAT_QUANTITY',
      'POSITIVE_FEEDBACK_GREAT_VALUE',
      'POSITIVE_FEEDBACK_GREAT_VARIETY',
    ],
    average_overall_rating: {
      average_overall_rating: 4.6,
      rating_count: 40,
      month_count: 6,
    },
    favorite_count: 0,
  },
  store: {
    store_id: '535171',
    store_name: 'Royal Donuts',
    branch: 'Würzburg',
    description: '',
    tax_identifier: '',
    website: 'https://royal-donuts.de/',
    store_location: {
      address: {
        country: {
          iso_code: 'DE',
          name: 'Germany',
        },
        address_line: 'Kaiserstraße 9, 97070 Würzburg, Deutschland',
        city: '',
        postal_code: '',
      },
      location: {
        longitude: 9.9336573,
        latitude: 49.7985164,
      },
    },
    logo_picture: {
      picture_id: '563967',
      current_url:
        'https://images.tgtg.ninja/storebulkimport/logo/32750/26b884e2-3194-4287-9272-dde89ed82b5d.jpg',
      is_automatically_created: false,
    },
    store_time_zone: 'Europe/Berlin',
    hidden: false,
    favorite_count: 0,
    we_care: false,
    distance: 5617.643638935479,
    cover_picture: {
      picture_id: '322225',
      current_url:
        'https://images.tgtg.ninja/item/cover/efb3475a-b722-4a4b-a3cb-86d287895f2f.jpg',
      is_automatically_created: false,
    },
    is_manufacturer: false,
  },
  display_name: 'Royal Donuts - Würzburg',
  pickup_location: {
    address: {
      country: {
        iso_code: 'DE',
        name: 'Germany',
      },
      address_line: 'Kaiserstraße 9, 97070 Würzburg, Deutschland',
      city: '',
      postal_code: '',
    },
    location: {
      longitude: 9.9336573,
      latitude: 49.7985164,
    },
  },
  items_available: 0,
  distance: 5617.643638935479,
  favorite: true,
  in_sales_window: false,
  new_item: false,
};

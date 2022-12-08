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
    item_id: '682717',
    tax_amount: { code: 'EUR', minor_units: 20, decimals: 2 },
    price_excluding_taxes: { code: 'EUR', minor_units: 280, decimals: 2 },
    price_including_taxes: { code: 'EUR', minor_units: 300, decimals: 2 },
    value_excluding_taxes: { code: 'EUR', minor_units: 841, decimals: 2 },
    value_including_taxes: { code: 'EUR', minor_units: 900, decimals: 2 },
    taxation_policy: 'PRICE_INCLUDES_TAXES',
    show_sales_taxes: false,
    cover_picture: {
      picture_id: '680244',
      current_url:
        'https://images.tgtg.ninja/item/cover/80d227bb-eae9-4d90-b32c-d605ba453105.jpg',
      is_automatically_created: false,
    },
    logo_picture: {
      picture_id: '680225',
      current_url:
        'https://images.tgtg.ninja/store/dafd3d07-ed73-4fe8-9125-096b27583a90.jpg',
      is_automatically_created: false,
    },
    name: 'Überraschungstüte',
    description:
      'Rette eine Magic Bag mit leckeren Backwaren. Darin findest du nicht nur Backwaren oder süßes Gebäck, sondern auch belegte Brötchen und andere herzhafte Schmankerl. ',
    food_handling_instructions: '',
    can_user_supply_packaging: false,
    packaging_option: 'BAG_ALLOWED',
    collection_info: '',
    diet_categories: [],
    item_category: 'BAKED_GOODS',
    buffet: false,
    positive_rating_reasons: [
      'POSITIVE_FEEDBACK_FRIENDLY_STAFF',
      'POSITIVE_FEEDBACK_QUICK_COLLECTION',
      'POSITIVE_FEEDBACK_GREAT_QUANTITY',
      'POSITIVE_FEEDBACK_GREAT_VALUE',
      'POSITIVE_FEEDBACK_DELICIOUS_FOOD',
      'POSITIVE_FEEDBACK_GREAT_VARIETY',
    ],
    average_overall_rating: {
      average_overall_rating: 4.585365853658536,
      rating_count: 205,
      month_count: 6,
    },
    favorite_count: 0,
  },
  store: {
    store_id: '679173',
    store_name: 'Café bonjour TotalEnergies Station',
    branch: 'Kantstraße Würzburg',
    description: '',
    tax_identifier: '',
    website: '',
    logo_picture: {
      picture_id: '680225',
      current_url:
        'https://images.tgtg.ninja/store/dafd3d07-ed73-4fe8-9125-096b27583a90.jpg',
      is_automatically_created: false,
    },
    store_time_zone: 'Europe/Berlin',
    hidden: false,
    favorite_count: 0,
    we_care: false,
    distance: 5615.583680095475,
    cover_picture: {
      picture_id: '680244',
      current_url:
        'https://images.tgtg.ninja/item/cover/80d227bb-eae9-4d90-b32c-d605ba453105.jpg',
      is_automatically_created: false,
    },
    is_manufacturer: false,
  },
  display_name:
    'Café bonjour TotalEnergies Station - Kantstraße Würzburg (Überraschungstüte)',
  pickup_interval: {
    start: '2022-12-08T20:00:00Z',
    end: '2022-12-08T20:30:00Z',
  },
  pickup_location: {
    address: {
      address_line: 'Kantstraße 25, 97074 Würzburg, Deutschland',
      city: '',
      postal_code: '',
    },
    location: { longitude: 9.9430111, latitude: 49.7781238 },
  },
  purchase_end: '2022-12-08T20:30:00Z',
  items_available: 2,
  distance: 5615.583680095475,
  favorite: true,
  in_sales_window: true,
  new_item: false,
  item_type: 'MAGIC_BAG',
};

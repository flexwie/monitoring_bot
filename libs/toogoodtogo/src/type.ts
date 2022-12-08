export interface ITooGoodToGoService {
  login: (email: string, chat_id: number) => Promise<void>;
  getFavorites: (chat_id: number) => Promise<Item[]>;
  refresh: (chat_id: number) => Promise<any>;
}

export const ITooGoodToGoService = Symbol('ICacheService');

export enum State {
  WAIT = 'WAIT',
  TERMS = 'TERMS',
}

export interface EmailAuthResponse {
  state: State;
  polling_id: string;
}

export interface PollingAuthResponse {
  access_token: string;
  access_token_ttl_seconds: number;
  refresh_token: string;
  startup_data: StartupData;
}

export interface StartupData {
  user: User;
  app_settings: AppSettings;
  user_settings: UserSettings;
  orders: Orders;
}

export interface User {
  user_id: string;
  name: string;
  country_id: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  is_partner: boolean;
  newsletter_opt_in: boolean;
  push_notifications_opt_in: boolean;
}

export interface AppSettings {
  countries: Country[];
  purchase_rating_start: string;
  purchase_rating_end: string;
  purchase_rating_delay: number;
}

export interface Country {
  country_iso_code: string;
  terms_url: string;
  terms_version: number;
  manufacturer_terms_url: string;
  manufacturer_terms_version: number;
  privacy_url: string;
  prompt_for_newsletter_opt_in: boolean;
}

export interface UserSettings {
  country_iso_code: string;
  phone_country_code_suggestion: string;
  is_user_email_verified: boolean;
  terms_url: string;
  terms_version: number;
  manufacturer_terms_url: string;
  manufacturer_terms_version: number;
  privacy_url: string;
  contact_form_url: string;
  blog_url: string;
  careers_url: string;
  education_url: string;
  instagram_url: string;
  store_signup_url: string;
  store_contact_url: string;
  bound_sw: BoundSw;
  bound_ne: BoundNe;
  meals_saved: MealsSaved;
  has_any_vouchers: boolean;
  can_show_best_before_explainer: boolean;
  has_expired_payment_methods: boolean;
  show_manufacturer_items: boolean;
  show_payment_card_issue_message: boolean;
  braze_external_id: string;
  has_active_email_change_request: boolean;
  approved_terms_and_conditions: any[];
  feature_experiments: any[];
}

export interface BoundSw {
  longitude: number;
  latitude: number;
}

export interface BoundNe {
  longitude: number;
  latitude: number;
}

export interface MealsSaved {
  country_iso_code: string;
  share_url: string;
  image_url: string;
  meals_saved_last_month: number;
  month: number;
  year: number;
}

export interface Orders {
  current_time: string;
  has_more: boolean;
  orders: any[];
}

export interface BucketResponse {
  mobile_bucket: MobileBucket;
}

export interface MobileBucket {
  filler_type: string;
  title: string;
  description: string;
  items: Item[];
  bucket_type: string;
  display_type: string;
}

export interface Item {
  item: Item2;
  store: Store;
  display_name: string;
  pickup_interval?: PickupInterval;
  pickup_location: PickupLocation;
  purchase_end?: string;
  items_available: number;
  sold_out_at?: string;
  distance: number;
  favorite: boolean;
  in_sales_window: boolean;
  new_item: boolean;
}

export interface Item2 {
  item_id: string;
  sales_taxes: SalesTax[];
  tax_amount: TaxAmount;
  price_excluding_taxes: PriceExcludingTaxes;
  price_including_taxes: PriceIncludingTaxes;
  value_excluding_taxes: ValueExcludingTaxes;
  value_including_taxes: ValueIncludingTaxes;
  taxation_policy: string;
  show_sales_taxes: boolean;
  cover_picture: CoverPicture;
  logo_picture: LogoPicture;
  name: string;
  description: string;
  can_user_supply_packaging: boolean;
  packaging_option: string;
  collection_info?: string;
  diet_categories: any[];
  item_category: string;
  buffet: boolean;
  badges: Badge[];
  positive_rating_reasons: string[];
  average_overall_rating: AverageOverallRating;
  favorite_count: number;
  food_handling_instructions?: string;
}

export interface SalesTax {
  tax_description: string;
  tax_percentage: number;
}

export interface TaxAmount {
  code: unknown;
  minor_units: number;
  decimals: number;
}

export interface PriceExcludingTaxes {
  code: unknown;
  minor_units: number;
  decimals: number;
}

export interface PriceIncludingTaxes {
  code: unknown;
  minor_units: number;
  decimals: number;
}

export interface ValueExcludingTaxes {
  code: unknown;
  minor_units: number;
  decimals: number;
}

export interface ValueIncludingTaxes {
  code: unknown;
  minor_units: number;
  decimals: number;
}

export interface CoverPicture {
  picture_id: string;
  current_url: string;
  is_automatically_created: boolean;
}

export interface LogoPicture {
  picture_id: string;
  current_url: string;
  is_automatically_created: boolean;
}

export interface Badge {
  badge_type: string;
  rating_group: string;
  percentage: number;
  user_count: number;
  month_count: number;
}

export interface AverageOverallRating {
  average_overall_rating: number;
  rating_count: number;
  month_count: number;
}

export interface Store {
  store_id: string;
  store_name: string;
  branch?: string;
  description: string;
  tax_identifier: string;
  website: string;
  store_location: StoreLocation;
  logo_picture: LogoPicture;
  store_time_zone: string;
  hidden: boolean;
  favorite_count: number;
  we_care: boolean;
  distance: number;
  cover_picture: CoverPicture;
  is_manufacturer: boolean;
}

export interface StoreLocation {
  address: Address;
  location: Location;
}

export interface Address {
  country: Country;
  address_line: string;
  city: string;
  postal_code: string;
}

export interface Country {
  iso_code: string;
  name: string;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface PickupInterval {
  start: string;
  end: string;
}

export interface PickupLocation {
  address: Address;
  location: Location;
}

export interface RefreshResponse {
  access_token: string;
  access_token_ttl_seconds: number;
  refresh_token: string;
}

export enum Status {
  RESTOCKED = 'RESTOCKED',
  SOLD_OUT = 'SOLD OUT',
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
}

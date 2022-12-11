export interface AzureWebhookData {
  data: Data;
}
export interface Data {
  SubscriptionId: string;
  AlertRuleName: string;
  SearchQuery: string;
  SearchIntervalStartTimeUtc: string;
  SearchIntervalEndtimeUtc: string;
  AlertThresholdOperator: string;
  AlertThresholdValue: number;
  ResultCount: number;
  SearchIntervalInSeconds: number;
  LinkToSearchResults: string;
  LinkToFilteredSearchResultsUI: string;
  LinkToSearchResultsAPI: string;
  LinkToFilteredSearchResultsAPI: string;
  Description?: null;
  Severity: string;
  Dimensions?: DimensionsEntity[] | null;
  SearchResult: SearchResult;
  ApplicationId: string;
  AlertType: string;
}
export interface DimensionsEntity {
  name: string;
  value: string;
}
export interface SearchResult {
  tables?: TablesEntity[] | null;
}
export interface TablesEntity {
  name: string;
  columns?: ColumnsEntity[] | null;
  rows?: (string[] | null)[] | null;
}
export interface ColumnsEntity {
  name: string;
  type: string;
}

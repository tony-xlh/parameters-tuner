export interface LocalizationMode {
  Mode:"LM_SKIP"|"LM_CONNECTED_BLOCKS"|"LM_STATISTICS"|"LM_LINES"|"LM_SCAN_DIRECTLY"|"LM_STATISTICS_MARKS"|"LM_STATISTICS_POSTAL_CODE"|"LM_CENTRE"|"LM_ONED_FAST_SCAN";
  ScanStride?:number;
  ScanDirection?:0|1|2;
  IsOneDStacked?:0|1;
  ConfidenceThreshold?:number;
  LibraryFileName?:string;
  LibraryParameters?:string;
}

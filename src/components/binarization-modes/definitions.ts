export interface BinarizationMode {
  BlockSizeX?: number,
  BlockSizeY?: number,
  EnableFillBinaryVacancy?: 0|1,
  ThresholdCompensation?: number,
  BinarizationThreshold?: number,
  ImagePreprocessingModesIndex?: number,
  LibraryFileName?: string,
  LibraryParameters?: string,
  Mode: 'BM_LOCAL_BLOCK' | 'BM_THRESHOLD' | 'BM_SKIP',
}

export interface BinarizationMode {
  BlockSizeX?: number,
  BlockSizeY?: number,
  EnableFillBinaryVacancy?: number,
  ThresholdCompensation?: number,
  BinarizationThreshold?: number,
  ImagePreprocessingModesIndex?: number,
  LibraryFileName?: string,
  LibraryParameters?: string,
  Mode: 'BM_LOCAL_BLOCK' | 'BM_THRESHOLD' | 'BM_SKIP',
}

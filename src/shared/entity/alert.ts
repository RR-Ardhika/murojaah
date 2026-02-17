export enum AlertColor {
  Uninitialized = -1,
  Green = 0,
  Red = 1,
  Yellow = 2,
}

export enum AlertText {
  SuccessCreatedActivity = 'Successfully created new murojaah',
  SuccessUpdatedActivity = 'Successfully updated new murojaah',
  SuccessDeletedActivity = 'Murojaah deleted',
  FailedCreatedActivity = 'Failed created new murojaah',
  FailedDeletedActivity = 'Failed deleted murojaah',
  SuccessExportedDB = 'Successfully exported database',
  FailedExportedDB = 'Failed to export database',
  ImportingDB = 'Importing data...',
  SuccessImportedDB = 'Successfully imported database',
  FailedImportedDB = 'Failed to import database',
  SuccessDeletedDB = 'Successfully deleted database',
}

export enum AlertConfig {
  Timeout = 3000,
}

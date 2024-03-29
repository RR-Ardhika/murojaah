import { Option } from '@/api/shared/entity';

export type History = {
  id?: number;
  historyType: number;
  juz?: number;
  surah?: number;
  surahName?: string;
  startAyah?: number;
  endAyah?: number;
  markSurahDone?: boolean;
  markJuzDone?: boolean;
  approachId: number;
  repeat: number;
  occuredAt: Date;
};

export type Payload = {
  historyType: number | undefined;
  juz?: number | undefined;
  surah?: number | undefined;
  surahName?: string | undefined;
  startAyah?: number | undefined;
  endAyah?: number | undefined;
  markSurahDone?: boolean | undefined;
  markJuzDone?: boolean | undefined;
  approachId: number | undefined;
  repeat: number | undefined;
};

export enum HistoryType {
  Juz = 0,
  Surah = 1,
  Ayah = 2,
}

export const JuzOptions: Option[] = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
];

export const SurahOptions: Option[] = [
  { value: 1, label: '1 Al-Fatihah' },
  { value: 2, label: '2 Al-Baqarah' },
  { value: 3, label: '3 Ali Imran' },
  { value: 4, label: '4 An-Nisa' },
  { value: 5, label: '5 Al-Maidah' },
  { value: 6, label: "6 Al-An'am" },
  { value: 7, label: "7 Al-A'raf" },
  { value: 8, label: '8 Al-Anfal' },
  { value: 9, label: '9 At-Taubah' },
  { value: 10, label: '10 Yunus' },
  { value: 11, label: '11 Hud' },
  { value: 12, label: '12 Yusuf' },
  { value: 13, label: "13 Ar-Ra'd" },
  { value: 14, label: '14 Ibrahim' },
  { value: 15, label: '15 Al-Hijr' },
  { value: 16, label: '16 An-Nahl' },
  { value: 17, label: '17 Al-Isra' },
  { value: 18, label: '18 Al-Kahf' },
  { value: 19, label: '19 Maryam' },
  { value: 20, label: '20 Taha' },
  { value: 21, label: '21 Al-Anbiya' },
  { value: 22, label: '22 Al-Hajj' },
  { value: 23, label: "23 Al-Mu'minun" },
  { value: 24, label: '24 An-Nur' },
  { value: 25, label: '25 Al-Furqan' },
  { value: 26, label: "26 Asy-Syu'ara" },
  { value: 27, label: '27 An-Naml' },
  { value: 28, label: '28 Al-Qasas' },
  { value: 29, label: '29 Al-Ankabut' },
  { value: 30, label: '30 Ar-Rum' },
  { value: 31, label: '31 Luqman' },
  { value: 32, label: '32 As-Sajdah' },
  { value: 33, label: '33 Al-Ahzab' },
  { value: 34, label: "34 Saba'" },
  { value: 35, label: '35 Fatir' },
  { value: 36, label: '36 Ya-Sin' },
  { value: 37, label: '37 As-Saffat' },
  { value: 38, label: '38 Sad' },
  { value: 39, label: '39 Az-Zumar' },
  { value: 40, label: '40 Gafir' },
  { value: 41, label: '41 Fussilat' },
  { value: 42, label: '42 Asy-Syura' },
  { value: 43, label: '43 Az-Zukhruf' },
  { value: 44, label: '44 Ad-Dukhan' },
  { value: 45, label: '45 Al-Jasiyah' },
  { value: 46, label: '46 Al-Ahqaf' },
  { value: 47, label: '47 Muhammad' },
  { value: 48, label: '48 Al-Fah' },
  { value: 49, label: '49 Al-Hujurat' },
  { value: 50, label: '50 Qaf' },
  { value: 51, label: '51 Az-Zariyat' },
  { value: 52, label: '52 At-Tur' },
  { value: 53, label: '53 An-Najm' },
  { value: 54, label: '54 Al-Qamar' },
  { value: 55, label: '55 Ar-Rahman' },
  { value: 56, label: "56 Al-Waqi'ah" },
  { value: 57, label: '57 Al-Hadid' },
  { value: 58, label: '58 Al-Mujadalah' },
  { value: 59, label: '59 Al-Hasyr' },
  { value: 60, label: '60 Al-Mumtahanah' },
  { value: 61, label: '61 As-Saffat' },
  { value: 62, label: "62 Al-Jumu'ah" },
  { value: 63, label: '63 Al-Munafiqun' },
  { value: 64, label: '64 At-Tagabun' },
  { value: 65, label: '65 At-Talaq' },
  { value: 66, label: '66 At-Tahrim' },
  { value: 67, label: '67 Al-Mulk' },
  { value: 68, label: '68 Al-Qalam' },
  { value: 69, label: '69 Al-Haqqah' },
  { value: 70, label: "70 Al-Ma'arij" },
  { value: 71, label: '71 Nuh' },
  { value: 72, label: '72 Al-Jinn' },
  { value: 73, label: '73 Al-Muzzammil' },
  { value: 74, label: '74 Al-Muddassir' },
  { value: 75, label: '75 Al-Qiyamah' },
  { value: 76, label: '76 Al-Insan' },
  { value: 77, label: '77 Al-Mursalat' },
  { value: 78, label: "78 An-Naba'" },
  { value: 79, label: "79 An-Nazi'at" },
  { value: 80, label: '80 Abasa' },
  { value: 81, label: '81 At-Takwir' },
  { value: 82, label: '82 Al-Infitar' },
  { value: 83, label: '83 Al-Mutaffifin' },
  { value: 84, label: '84 Al-Insyiqaq' },
  { value: 85, label: '85 Al-Buruj' },
  { value: 86, label: '86 At-Tariq' },
  { value: 87, label: "87 Al-A'la" },
  { value: 88, label: '88 Al-Gasiyah' },
  { value: 89, label: '89 Al-Fajr' },
  { value: 90, label: '90 Al-Balad' },
  { value: 91, label: '91 Asy-Syams' },
  { value: 92, label: '92 Al-Lail' },
  { value: 93, label: '93 Ad-Duha' },
  { value: 94, label: '94 Asy-syarh' },
  { value: 95, label: '95 At-Tin' },
  { value: 96, label: "96 Al-'Alaq" },
  { value: 97, label: '97 Al-Qadar' },
  { value: 98, label: '98 Al-Bayyinah' },
  { value: 99, label: '99 Az-Zalzalah' },
  { value: 100, label: "100 Al-'Adiyat" },
  { value: 101, label: "101 Al-Qari'ah" },
  { value: 102, label: '102 At-Takasur' },
  { value: 103, label: '103 Al-Asr' },
  { value: 104, label: '104 Al-Humazah' },
  { value: 105, label: '105 Al-Fil' },
  { value: 106, label: '106 Quraisy' },
  { value: 107, label: "107 Al-Ma'un" },
  { value: 108, label: '108 Al-Kautsar' },
  { value: 109, label: '109 Al-Kafirun' },
  { value: 110, label: '110 An-Nasr' },
  { value: 111, label: '111 Al-Lahab' },
  { value: 112, label: '112 Al-Ikhlas' },
  { value: 113, label: '113 Al-Falaq' },
  { value: 114, label: '114 An-Nas' },
];

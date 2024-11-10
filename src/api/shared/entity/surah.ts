import { Option } from '@/api/shared/entity';

export type SurahJuz = {
  id: number;
  startAyah: number;
  endAyah: number;
};

export type SurahType = {
  id: number;
  name: string;
  juz: number[];
  juzDetail?: SurahJuz[];
  totalLines: number;
  totalAyah: number;
};

// TD-4 Fill the rest total lines and ayah
const Surah: SurahType[] = [
  { id: 1, name: '1 Al-Fatihah', juz: [1], totalLines: 0, totalAyah: 0 },
  { id: 2, name: '2 Al-Baqarah', juz: [1, 2, 3], totalLines: 0, totalAyah: 0 },
  { id: 3, name: '3 Ali Imran', juz: [3, 4], totalLines: 0, totalAyah: 0 },
  { id: 4, name: '4 An-Nisa', juz: [4, 6], totalLines: 0, totalAyah: 0 },
  { id: 5, name: '5 Al-Maidah', juz: [6, 7], totalLines: 0, totalAyah: 0 },
  { id: 6, name: "6 Al-An'am", juz: [7, 8], totalLines: 0, totalAyah: 0 },
  { id: 7, name: "7 Al-A'raf", juz: [8, 9], totalLines: 0, totalAyah: 0 },
  { id: 8, name: '8 Al-Anfal', juz: [9, 10], totalLines: 0, totalAyah: 0 },
  { id: 9, name: '9 At-Taubah', juz: [10, 11], totalLines: 0, totalAyah: 0 },
  { id: 10, name: '10 Yunus', juz: [11], totalLines: 0, totalAyah: 0 },
  { id: 11, name: '11 Hud', juz: [11, 12], totalLines: 0, totalAyah: 0 },
  { id: 12, name: '12 Yusuf', juz: [12, 13], totalLines: 0, totalAyah: 0 },
  { id: 13, name: "13 Ar-Ra'd", juz: [13], totalLines: 0, totalAyah: 0 },
  { id: 14, name: '14 Ibrahim', juz: [13], totalLines: 0, totalAyah: 0 },
  { id: 15, name: '15 Al-Hijr', juz: [14], totalLines: 0, totalAyah: 0 },
  { id: 16, name: '16 An-Nahl', juz: [14], totalLines: 0, totalAyah: 0 },
  { id: 17, name: '17 Al-Isra', juz: [15], totalLines: 0, totalAyah: 0 },
  { id: 18, name: '18 Al-Kahf', juz: [15, 16], totalLines: 0, totalAyah: 0 },
  { id: 19, name: '19 Maryam', juz: [16], totalLines: 0, totalAyah: 0 },
  { id: 20, name: '20 Taha', juz: [16], totalLines: 0, totalAyah: 0 },
  { id: 21, name: '21 Al-Anbiya', juz: [17], totalLines: 0, totalAyah: 0 },
  { id: 22, name: '22 Al-Hajj', juz: [17], totalLines: 0, totalAyah: 0 },
  { id: 23, name: "23 Al-Mu'minun", juz: [18], totalLines: 0, totalAyah: 0 },
  { id: 24, name: '24 An-Nur', juz: [18], totalLines: 0, totalAyah: 0 },
  { id: 25, name: '25 Al-Furqan', juz: [18, 19], totalLines: 0, totalAyah: 0 },
  { id: 26, name: "26 Asy-Syu'ara", juz: [19], totalLines: 0, totalAyah: 0 },
  { id: 27, name: '27 An-Naml', juz: [19, 20], totalLines: 0, totalAyah: 0 },
  { id: 28, name: '28 Al-Qasas', juz: [20], totalLines: 0, totalAyah: 0 },
  { id: 29, name: '29 Al-Ankabut', juz: [20, 21], totalLines: 0, totalAyah: 0 },
  { id: 30, name: '30 Ar-Rum', juz: [21], totalLines: 0, totalAyah: 0 },
  { id: 31, name: '31 Luqman', juz: [21], totalLines: 0, totalAyah: 0 },
  { id: 32, name: '32 As-Sajdah', juz: [21], totalLines: 0, totalAyah: 0 },
  { id: 33, name: '33 Al-Ahzab', juz: [21, 22], totalLines: 0, totalAyah: 0 },
  { id: 34, name: "34 Saba'", juz: [22], totalLines: 0, totalAyah: 0 },
  { id: 35, name: '35 Fatir', juz: [22], totalLines: 0, totalAyah: 0 },
  { id: 36, name: '36 Ya-Sin', juz: [22, 23], totalLines: 0, totalAyah: 0 },
  { id: 37, name: '37 As-Saffat', juz: [23], totalLines: 0, totalAyah: 0 },
  { id: 38, name: '38 Sad', juz: [23], totalLines: 0, totalAyah: 0 },
  { id: 39, name: '39 Az-Zumar', juz: [23, 24], totalLines: 0, totalAyah: 0 },
  { id: 40, name: '40 Gafir', juz: [24], totalLines: 0, totalAyah: 0 },
  { id: 41, name: '41 Fussilat', juz: [24, 25], totalLines: 0, totalAyah: 0 },
  { id: 42, name: '42 Asy-Syura', juz: [25], totalLines: 0, totalAyah: 0 },
  { id: 43, name: '43 Az-Zukhruf', juz: [25], totalLines: 0, totalAyah: 0 },
  { id: 44, name: '44 Ad-Dukhan', juz: [25], totalLines: 0, totalAyah: 0 },
  { id: 45, name: '45 Al-Jasiyah', juz: [25], totalLines: 0, totalAyah: 0 },
  { id: 46, name: '46 Al-Ahqaf', juz: [26], totalLines: 0, totalAyah: 0 },
  { id: 47, name: '47 Muhammad', juz: [26], totalLines: 0, totalAyah: 0 },
  { id: 48, name: '48 Al-Fah', juz: [26], totalLines: 0, totalAyah: 0 },
  { id: 49, name: '49 Al-Hujurat', juz: [26], totalLines: 0, totalAyah: 0 },
  { id: 50, name: '50 Qaf', juz: [26], totalLines: 0, totalAyah: 0 },
  {
    id: 51,
    name: '51 Adz-Dzariyat',
    juz: [26, 27],
    juzDetail: [
      { id: 26, startAyah: 1, endAyah: 30 },
      { id: 27, startAyah: 31, endAyah: 60 },
    ],
    totalLines: 41,
    totalAyah: 60,
  },
  { id: 52, name: '52 At-Tur', juz: [27], totalLines: 37, totalAyah: 49 },
  { id: 53, name: '53 An-Najm', juz: [27], totalLines: 39, totalAyah: 62 },
  { id: 54, name: '54 Al-Qamar', juz: [27], totalLines: 41, totalAyah: 55 },
  { id: 55, name: '55 Ar-Rahman', juz: [27], totalLines: 47, totalAyah: 78 },
  { id: 56, name: "56 Al-Waqi'ah", juz: [27], totalLines: 49, totalAyah: 96 },
  { id: 57, name: '57 Al-Hadid', juz: [27], totalLines: 65, totalAyah: 29 },
  { id: 58, name: '58 Al-Mujadalah', juz: [28], totalLines: 51, totalAyah: 22 },
  { id: 59, name: '59 Al-Hasyr', juz: [28], totalLines: 53, totalAyah: 24 },
  { id: 60, name: '60 Al-Mumtahanah', juz: [28], totalLines: 37, totalAyah: 13 },
  { id: 61, name: '61 As-Saffat', juz: [28], totalLines: 24, totalAyah: 14 },
  { id: 62, name: "62 Al-Jumu'ah", juz: [28], totalLines: 21, totalAyah: 11 },
  { id: 63, name: '63 Al-Munafiqun', juz: [28], totalLines: 23, totalAyah: 11 },
  { id: 64, name: '64 At-Tagabun', juz: [28], totalLines: 30, totalAyah: 18 },
  { id: 65, name: '65 At-Talaq', juz: [28], totalLines: 31, totalAyah: 12 },
  { id: 66, name: '66 At-Tahrim', juz: [28], totalLines: 30, totalAyah: 12 },
  { id: 67, name: '67 Al-Mulk', juz: [29], totalLines: 35, totalAyah: 30 },
  { id: 68, name: '68 Al-Qalam', juz: [29], totalLines: 33, totalAyah: 52 },
  { id: 69, name: '69 Al-Haqqah', juz: [29], totalLines: 30, totalAyah: 52 },
  { id: 70, name: "70 Al-Ma'arij", juz: [29], totalLines: 26, totalAyah: 44 },
  { id: 71, name: '71 Nuh', juz: [29], totalLines: 26, totalAyah: 28 },
  { id: 72, name: '72 Al-Jinn', juz: [29], totalLines: 30, totalAyah: 28 },
  { id: 73, name: '73 Al-Muzzammil', juz: [29], totalLines: 22, totalAyah: 20 },
  { id: 74, name: '74 Al-Muddassir', juz: [29], totalLines: 28, totalAyah: 56 },
  { id: 75, name: '75 Al-Qiyamah', juz: [29], totalLines: 18, totalAyah: 40 },
  { id: 76, name: '76 Al-Insan', juz: [29], totalLines: 28, totalAyah: 31 },
  { id: 77, name: '77 Al-Mursalat', juz: [29], totalLines: 24, totalAyah: 50 },
  { id: 78, name: "78 An-Naba'", juz: [30], totalLines: 22, totalAyah: 40 },
  { id: 79, name: "79 An-Nazi'at", juz: [30], totalLines: 22, totalAyah: 46 },
  { id: 80, name: '80 Abasa', juz: [30], totalLines: 16, totalAyah: 42 },
  { id: 81, name: '81 At-Takwir', juz: [30], totalLines: 14, totalAyah: 29 },
  { id: 82, name: '82 Al-Infitar', juz: [30], totalLines: 11, totalAyah: 19 },
  { id: 83, name: '83 Al-Mutaffifin', juz: [30], totalLines: 21, totalAyah: 36 },
  { id: 84, name: '84 Al-Insyiqaq', juz: [30], totalLines: 14, totalAyah: 25 },
  { id: 85, name: '85 Al-Buruj', juz: [30], totalLines: 14, totalAyah: 22 },
  { id: 86, name: '86 At-Tariq', juz: [30], totalLines: 8, totalAyah: 17 },
  { id: 87, name: "87 Al-A'la", juz: [30], totalLines: 10, totalAyah: 19 },
  { id: 88, name: '88 Al-Gasiyah', juz: [30], totalLines: 13, totalAyah: 26 },
  { id: 89, name: '89 Al-Fajr', juz: [30], totalLines: 18, totalAyah: 30 },
  { id: 90, name: '90 Al-Balad', juz: [30], totalLines: 11, totalAyah: 20 },
  { id: 91, name: '91 Asy-Syams', juz: [30], totalLines: 9, totalAyah: 15 },
  { id: 92, name: '92 Al-Lail', juz: [30], totalLines: 9, totalAyah: 21 },
  { id: 93, name: '93 Ad-Duha', juz: [30], totalLines: 5, totalAyah: 11 },
  { id: 94, name: '94 Asy-syarh', juz: [30], totalLines: 3, totalAyah: 8 },
  { id: 95, name: '95 At-Tin', juz: [30], totalLines: 4, totalAyah: 8 },
  { id: 96, name: "96 Al-'Alaq", juz: [30], totalLines: 7, totalAyah: 19 },
  { id: 97, name: '97 Al-Qadar', juz: [30], totalLines: 3, totalAyah: 5 },
  { id: 98, name: '98 Al-Bayyinah', juz: [30], totalLines: 10, totalAyah: 8 },
  { id: 99, name: '99 Az-Zalzalah', juz: [30], totalLines: 5, totalAyah: 8 },
  { id: 100, name: "100 Al-'Adiyat", juz: [30], totalLines: 5, totalAyah: 11 },
  { id: 101, name: "101 Al-Qari'ah", juz: [30], totalLines: 6, totalAyah: 11 },
  { id: 102, name: '102 At-Takasur', juz: [30], totalLines: 4, totalAyah: 8 },
  { id: 103, name: '103 Al-Asr', juz: [30], totalLines: 2, totalAyah: 3 },
  { id: 104, name: '104 Al-Humazah', juz: [30], totalLines: 4, totalAyah: 9 },
  { id: 105, name: '105 Al-Fil', juz: [30], totalLines: 3, totalAyah: 5 },
  { id: 106, name: '106 Quraisy', juz: [30], totalLines: 3, totalAyah: 4 },
  { id: 107, name: "107 Al-Ma'un", juz: [30], totalLines: 4, totalAyah: 7 },
  { id: 108, name: '108 Al-Kausar', juz: [30], totalLines: 2, totalAyah: 3 },
  { id: 109, name: '109 Al-Kafirun', juz: [30], totalLines: 3, totalAyah: 6 },
  { id: 110, name: '110 An-Nasr', juz: [30], totalLines: 3, totalAyah: 3 },
  { id: 111, name: '111 Al-Lahab', juz: [30], totalLines: 3, totalAyah: 5 },
  { id: 112, name: '112 Al-Ikhlas', juz: [30], totalLines: 2, totalAyah: 4 },
  { id: 113, name: '113 Al-Falaq', juz: [30], totalLines: 3, totalAyah: 5 },
  { id: 114, name: '114 An-Nas', juz: [30], totalLines: 4, totalAyah: 6 },
];

export function GetSurahById(id: number): SurahType | undefined {
  return Surah.find((obj: SurahType) => obj.id === id);
}

export function GetJuzBySurahId(id: number): number[] | SurahJuz[] {
  const surah: SurahType | undefined = GetSurahById(id);
  if (!surah) return [];
  return surah.juz;
}

export function GetOptionsFromSurahId(id: number): Option[] {
  const options: Option[] = [];
  const surah: SurahType | undefined = GetSurahById(id);
  // @ts-expect-error expected undefined
  const option: Option = { value: id, label: surah.name };
  options.push(option);
  return options;
}

export function SurahOptions(): Option[] {
  const options: Option[] = [];

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let i = 0; i < Surah.length; i++) {
    const option: Option = { value: i + 1, label: Surah[i].name };
    options.push(option);
  }

  return options;
}

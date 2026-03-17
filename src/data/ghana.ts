export interface Region {
  name: string;
  districts: string[];
}

export const ghanaRegions: Region[] = [
  {
    name: 'Greater Accra',
    districts: [
      'Accra Metropolitan', 'Tema Metropolitan', 'Ga East', 'Ga West', 'Ga Central',
      'Ga South', 'Adentan', 'Ledzokuku', 'Ayawaso Central', 'Ayawaso East',
      'Ayawaso North', 'Ayawaso West', 'La Dadekotopon', 'La Nkwantanang-Madina',
      'Korle Klottey', 'Okaikwei North', 'Ablekuma Central', 'Ablekuma North',
      'Ablekuma West', 'Ningo Prampram', 'Shai Osudoku', 'Ashaiman',
    ],
  },
  {
    name: 'Ashanti',
    districts: [
      'Kumasi Metropolitan', 'Oforikrom', 'Asokwa', 'Kwadaso', 'Suame',
      'Manhyia North', 'Manhyia South', 'Asante Akim Central', 'Asante Akim North',
      'Asante Akim South', 'Bekwai', 'Bosomtwe', 'Ejisu', 'Ejura-Sekyedumase',
      'Juaben', 'Kwabre East', 'Mampong', 'Offinso', 'Offinso North',
      'Sekyere Central', 'Sekyere East', 'Sekyere South', 'Bosome Freho',
    ],
  },
  {
    name: 'Western',
    districts: [
      'Sekondi-Takoradi Metropolitan', 'Ahanta West', 'Effia-Kwesimintsim', 'Shama',
      'Wassa Amenfi Central', 'Wassa Amenfi East', 'Wassa Amenfi West', 'Wassa East',
      'Nzema East', 'Ellembelle', 'Jomoro', 'Prestea Huni Valley', 'Tarkwa-Nsuaem',
    ],
  },
  {
    name: 'Eastern',
    districts: [
      'New Juaben North', 'New Juaben South', 'Kwahu East', 'Kwahu South', 'Kwahu West',
      'Atiwa East', 'Atiwa West', 'Abuakwa North', 'Abuakwa South', 'Akuapem North',
      'Akuapem South', 'Birim Central', 'Birim North', 'Birim South', 'Denkyembour',
      'Fanteakwa North', 'Fanteakwa South', 'Lower Manya Krobo', 'Upper Manya Krobo',
      'Suhum', 'Yilo Krobo', 'Nsawam-Adoagyiri', 'Akyemansa',
    ],
  },
  {
    name: 'Central',
    districts: [
      'Cape Coast Metropolitan', 'Komenda-Edina-Eguafo-Abirem', 'Mfantsiman',
      'Abura-Asebu-Kwamankese', 'Asikuma-Odoben-Brakwa', 'Assin Central',
      'Assin North', 'Assin South', 'Effutu', 'Ekumfi', 'Gomoa Central',
      'Gomoa East', 'Gomoa West', 'Hemang-Lower Denkyira', 'Upper Denkyira East',
      'Upper Denkyira West', 'Twifo-Atti-Morkwa', 'Ajumako-Enyan-Essiam',
      'Agona East', 'Agona West', 'Kasoa South',
    ],
  },
  {
    name: 'Volta',
    districts: [
      'Ho Municipal', 'Hohoe Municipal', 'Keta Municipal', 'Kpando Municipal',
      'Agotime-Ziope', 'Afadjato South', 'Biakoye', 'Central Tongu',
      'North Tongu', 'South Tongu', 'Adaklu', 'Akatsi North', 'Akatsi South',
      'Ave Avenor', 'Ketu North', 'Ketu South', 'Nkwanta North',
    ],
  },
  {
    name: 'Northern',
    districts: [
      'Tamale Metropolitan', 'Sagnarigu', 'Tolon', 'Kumbungu', 'Nanton', 'Mion',
      'Nanumba North', 'Nanumba South', 'Gushegu', 'Karaga', 'Zabzugu',
      'Tatale-Sangule', 'Yendi Municipal',
    ],
  },
  {
    name: 'Upper East',
    districts: [
      'Bolgatanga Municipal', 'Bawku Municipal', 'Kassena-Nankana Municipal',
      'Kassena-Nankana West', 'Bawku West', 'Binduri', 'Bolgatanga East',
      'Bongo', 'Builsa North', 'Builsa South', 'Garu', 'Pusiga', 'Talensi', 'Tempane',
    ],
  },
  {
    name: 'Upper West',
    districts: [
      'Wa Municipal', 'Jirapa', 'Lambussie-Karni', 'Lawra', 'Nadowli-Kaleo',
      'Nandom', 'Sissala East', 'Sissala West', 'Daffiama-Bussie-Issa', 'Wa East', 'Wa West',
    ],
  },
  {
    name: 'Bono',
    districts: [
      'Sunyani Municipal', 'Berekum East', 'Dormaa Central', 'Dormaa East',
      'Dormaa West', 'Jaman North', 'Jaman South', 'Wenchi', 'Tano North',
      'Tano South', 'Banda',
    ],
  },
  {
    name: 'Bono East',
    districts: [
      'Techiman Municipal', 'Atebubu-Amantin', 'Kintampo North', 'Kintampo South',
      'Nkoranza North', 'Nkoranza South', 'Pru East', 'Pru West', 'Sene East', 'Sene West',
    ],
  },
  {
    name: 'Ahafo',
    districts: [
      'Goaso', 'Asutifi North', 'Asutifi South', 'Asunafo North', 'Asunafo South',
    ],
  },
  {
    name: 'Western North',
    districts: [
      'Sefwi Wiawso', 'Bibiani-Anhwiaso-Bekwai', 'Bodi', 'Bia East', 'Bia West',
      'Amenfi East', 'Amenfi Central', 'Suaman',
    ],
  },
  {
    name: 'Oti',
    districts: [
      'Dambai', 'Buem', 'Jasikan', 'Kadjebi', 'Krachi East', 'Krachi Nchumuru',
      'Krachi West', 'Nkwanta South',
    ],
  },
  {
    name: 'Savannah',
    districts: [
      'Damongo', 'Bole', 'Central Gonja', 'East Gonja', 'North Gonja',
      'North East Gonja', 'West Gonja',
    ],
  },
  {
    name: 'North East',
    districts: [
      'Nalerigu-Gambaga', 'East Mamprusi', 'West Mamprusi', 'Bunkpurugu-Nyankpayili',
      'Chereponi', 'Mamprugu-Moagduri',
    ],
  },
];

export const allRegionNames = ghanaRegions.map((r) => r.name);

export function getDistrictsForRegions(selectedRegions: string[]): string[] {
  const source =
    selectedRegions.length === 0
      ? ghanaRegions
      : ghanaRegions.filter((r) => selectedRegions.includes(r.name));
  return [...new Set(source.flatMap((r) => r.districts))];
}

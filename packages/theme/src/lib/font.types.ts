export interface FontResource {
  subset: string;
  format: string;
  file: string;
}

export interface FontDefinition {
  local: string[];
  weight: number;
  style: string;
  resources: FontResource[];
}

export interface FontSubsetDefinition {
  name: string;
  unicodeRange: string;
}

export interface FontFamilyDefinition {
  name: string;
  url: string;
  subsets: FontSubsetDefinition[];
  fonts: FontDefinition[];
}

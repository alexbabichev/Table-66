export interface Doc {
  title: string;
  date: number;
  proof: boolean;
  fullImage?: any;
  croppedImage?: any;
  hash?: string;
  proofBy?: any[]
}
export interface Season {
  id: number;
  season: number;
  name: string;
  group: 'YB' | 'OB';
  applicationStart: string;
  applicationEnd: string;
  interviewStart: string;
  interviewEnd: string;
  applicationResultStart: string;
  applicationResultEnd: string;
  finalResultStart: string;
  finalResultEnd: string;
}

export interface GetGenerationResponse {
  err: boolean;
  seasons: Season[];
}

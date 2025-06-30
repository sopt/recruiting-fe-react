export interface Season {
  id: number;
  season: number;
  name: string;
  type: 'YB' | 'OB';
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

export interface PostGenerationRequest extends Omit<Season, 'id'> {}

export interface PostGenerationResponse {
  err: boolean;
  seasons: Omit<Season, 'id'>[];
}

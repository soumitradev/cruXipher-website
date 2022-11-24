export default interface Question {
  slug: string;
  title: string;
  body: string;
  links: string[];
  category: string;
  locked: boolean;
  points: number;
}

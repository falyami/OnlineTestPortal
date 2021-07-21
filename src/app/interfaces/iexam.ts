import { IQuestion } from "./iquestion";

export interface IExam {
    $key?: string,
    id: number,
    title: string,
    grade: number,
    questions: IQuestion[]
}

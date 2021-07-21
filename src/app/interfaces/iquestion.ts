export interface IQuestion {
    $key?: string,
    id: number,
    body: string,
    answer: boolean,
    grade: number,
    examid: number
}

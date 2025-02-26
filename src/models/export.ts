
export interface Exports{
    ID: number,
    Title: string,
    CreatedAt: Date,
    File_size: number
}


export interface ExportDTO {
    file: any,
    title: string,
    font_size: number,
    padding: number
}
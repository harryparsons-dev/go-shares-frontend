
export interface Exports{
    id: number,
    title: string,
    created_at: Date,
    file_size: number
    source_file_path:string
    export_file_path: string
    pie_chart_file_path: string
    status: string
    font_size: string
    padding: string
    meta: string,
}


export interface ExportDTO {
    file: any,
    title: string,
    font_size: number | null,
    padding: number | null
}
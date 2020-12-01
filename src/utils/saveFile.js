import _ from "lodash"
import XLSX from "xlsx"

export const saveFile = (file, type) => {
    if(type === 'csv') {
        saveAsCsv(file)
    } else if(type === 'xls' || type === 'xlsx') {
        saveAsExcel(file, type)
    }
}


const saveAsExcel = (doc, type) => {
    const staticData = {
        fieldSeparator: '|',
        rowSeparator: '\n',
    }

    const data = doc.document
        .split(staticData.rowSeparator)
        .map(x =>
            x.split(staticData.fieldSeparator)
                .map(y => _.isString(y) && y.length === 0 ? null : y)
        )

    const sheet = XLSX.utils.aoa_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheet, doc.documentName.substr(0, 31))
    saveWorkbook(workbook, doc.documentName, type)
}

const saveAsCsv = (doc) => {
    const textFile = _makeTextFile(doc.document)
    const link = document.createElement('a')
    link.download = `${doc.documentName}.csv`
    link.href = textFile
    const el = document.querySelector('body')
    el.appendChild(link)
    link.click()
    el.removeChild(link)
}

const _makeTextFile = (text) => {
    const data = new Blob([text], {type: 'text/plain'})
    const textFile = window.URL.createObjectURL(data)
    return textFile
}

const saveWorkbook = (workbook, name, extension) => {
    XLSX.writeFile(workbook, `${name}.${extension}`)
}

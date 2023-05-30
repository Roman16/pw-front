import _ from "lodash"
import XLSX from "xlsx"

export const saveFile = (file, type) => {
    if (type === 'csv') {
        saveAsCsv(file)
    } else if (type === 'xls' || type === 'xlsx') {
        saveAsExcel(file, type)
    }
}

export const saveInputParameters = (objs, name='input-parameters') => {
    const textFile = _makeTextFile(JSON.stringify(objs, null, 2))
    const link = document.createElement('a')
    link.download = `${name}.json`
    link.href = textFile
    const el = document.querySelector('body')
    el.appendChild(link)
    link.click()
    el.removeChild(link)
}

export const saveGoogleSpreadsheet = (apiResponse) => {
// generate XLSX workbook
    const workbook = XLSX.utils.book_new()
    apiResponse.xlsxWorkBook.sheets.forEach(x => {
        const sheet = XLSX.utils.json_to_sheet(x.jsonData, {skipHeader: true})
        XLSX.utils.book_append_sheet(workbook, sheet, x.name)
    })

// save workbook to user file system
    const workbookFilename = `${apiResponse.xlsxWorkBook.name}.xlsx`
    XLSX.writeFile(workbook, workbookFilename)
}

export const saveSpreadsheet = (res) => {
    // generate XLSX workbook
    const workbook = XLSX.utils.book_new()
    res.sheets.forEach(x => {
        const sheet = XLSX.utils.json_to_sheet(x.jsonData, {skipHeader: true})
        XLSX.utils.book_append_sheet(workbook, sheet, x.name)
    })

// save workbook to user file system
    const workbookFilename = `${res.name}.xlsx`
    XLSX.writeFile(workbook, workbookFilename)
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
